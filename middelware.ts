import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/"];

export function middleware(request: any) {
  const { pathname } = new URL(request.url);

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const authToken = request.cookies.get("auth_token")?.value;

    if (!authToken) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    // شبیه‌سازی اعتبارسنجی (با توجه به API فیک)
    const userData = {
      login: {
        uuid: "76981c19-6598-46a0-b68c-13f474c6d9eb",
      },
    };
    if (!userData || userData.login.uuid !== authToken) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};

