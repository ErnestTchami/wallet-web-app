import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: JWT_SECRET });
  const url = request.nextUrl.clone();

  console.log("Middleware Debug:", {
    pathname: url.pathname,
    tokenExists: !!token,
  });

  if (!token && !["/login", "/register"].includes(url.pathname)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token && ["/login", "/register"].includes(url.pathname)) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
