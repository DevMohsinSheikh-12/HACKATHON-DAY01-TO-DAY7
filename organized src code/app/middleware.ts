// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Apply Clerk middleware
export default clerkMiddleware();

// Optional: Configure which routes the middleware should apply to
export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"], // Matches all routes except special Next.js files
};
