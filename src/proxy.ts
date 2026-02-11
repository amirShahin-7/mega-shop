import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = [
  "/cart",
  "/profile",
  "/profile/settings",
  "/profile/orders",
  "/profile/favorites",
  "/profile/addresses",
  "/checkout",
  "/allorders"
];
const authPages = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-code",
  "/reset-password",
];
export default async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;
  if (protectedPages.includes(pathname)) {
    if (token) {
      return NextResponse.next();
    } else {
      const loginURL = new URL("/login", process.env.NEXT_URL);
      return NextResponse.redirect(loginURL);
    }
  }
  if (authPages.includes(pathname)) {
    if (!token) {
      return NextResponse.next();
    } else {
      const homeURL = new URL("/", process.env.NEXT_URL);
      return NextResponse.redirect(homeURL);
    }
  }
  return NextResponse.next();
}
