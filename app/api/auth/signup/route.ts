import { prisma } from "@/src/lib/prisma";
const bcrypt = require("bcrypt");
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed }
  });

  return NextResponse.json({ message: "User created!", user });
}
