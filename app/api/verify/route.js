import { createVerificationToken } from "@/utils/verification";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ error: "MISSING_TOKEN" }, { status: 400 });
  }
  console.log({ token });
  const user = await prisma.user.findFirst({
    where: {
      verificationToken: {
        some: {
          AND: [
            {
              verifiedAt: null,
            },
            {
              createdAt: {
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
              },
            },
            {
              token,
            },
          ],
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "INVALID_TOKEN" }, { status: 400 });
  }

  if (user.verified) {
    return NextResponse.json(
      { error: "USER_ALREADY_VERIFIED" },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      verified: true,
    },
  });

  await prisma.verificationToken.update({
    where: {
      token,
    },
    data: {
      verifiedAt: new Date(),
    },
  });

  return NextResponse.json(user, { status: 200 });
}
