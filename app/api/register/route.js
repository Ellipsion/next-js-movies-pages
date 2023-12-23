import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import sendVerificationMail from "./sendMail";

export async function POST(request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: { email },
  });

  if (exist) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const verificationToken = await prisma.VerificationToken.create({
      data: {
        token: `${randomUUID()}-${randomUUID()}`.replace(/-/g, ""),
        userId: user.id,
      },
    });

    await sendVerificationMail(name, email, verificationToken?.token);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
