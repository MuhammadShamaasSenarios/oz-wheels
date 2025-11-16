import { NextResponse } from "next/server";
import { verifyToken } from "../app/lib/auth";

export function middleware(req: any) {
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/signin", req.url));

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"]
};
