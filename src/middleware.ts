/* eslint-disable @typescript-eslint/no-unused-vars */
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {

    const token = request.cookies.get("next-auth.session-token"); 
    const currentUrl = request.nextUrl.pathname;
    if (!token) {
        const signInUrl = new URL("/auth/signin", request.url); 
        return NextResponse.rewrite(signInUrl);
    }
    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};