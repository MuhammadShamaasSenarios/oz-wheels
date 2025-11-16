import { prisma } from "@/app/lib/prisma";
const bcrypt = require("bcrypt");
import { NextResponse } from "next/server";
import { signToken } from "@/app/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken(user.id);

  const res = NextResponse.json({ message: "Login success!" });
  res.cookies.set("token", token, { httpOnly: true });

  return res;
}
