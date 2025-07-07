import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  // اگه کاربر لاگین کرده باشه (auth_token وجود داشته باشه)، به داشبورد ریدایرکت کن
  if (authToken) {
    redirect("/dashboard");
  }



  return (
    <div className="py-8 text-center">
      <h1 className="text-4xl font-semibold">خوش آمدید به سایت!</h1>
      <p className="mt-4 text-lg">
        تاریخ و زمان فعلی: {} (CEST)
      </p>
      <p className="mt-2">
        برای دسترسی به داشبورد، لطفاً{" "}
        <a href="/auth" className="text-blue-500 underline">
          وارد شوید
        </a>
        .
      </p>
    </div>
  );
}