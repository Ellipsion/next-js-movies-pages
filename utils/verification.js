import prisma from "@/libs/prismadb";
import { randomUUID } from "crypto";

export async function createVerificationToken(userId) {
  try {
    const token = `${randomUUID()}-${randomUUID()}`.replace(/-/g, "");
    const verificationToken = await prisma.VerificationToken.create({
      data: {
        token,
        userId,
        verifiedAt: null,
      },
    });
    console.log(token);
    return verificationToken;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error creating verification token (utils/verification.js)"
    );
  }
}
