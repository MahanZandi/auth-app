import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const userData = {
      login: {
        username: "smallbutterfly278",
        password: "laser",
        uuid: "76981c19-6598-46a0-b68c-13f474c6d9eb",
      },
    };

    if (username === userData.login.username && password === userData.login.password) {
      return NextResponse.json({ success: true, user: userData });
    }

    return NextResponse.json(
      { success: false, message: "نام کاربری یا رمز عبور اشتباه است" },
      { status: 401 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
