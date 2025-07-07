"use client"; // این خط رو حتماً در بالای فایل نگه دارید
import { useForm } from "react-hook-form";
import Image from "next/image";
import Input from "./Input";
import Picture from "@/public/Images/image1.png";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type FormTypes = {
  text: string;
  email: string;
  password: string;
};

type DataTypes = {
  username: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>();

  const onSubmit = async () => {
    try {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      const user = data.results[0];

      // ذخیره توکن در کوکی
      const token = user.login.uuid;
      Cookies.set("token", token, { expires: 1 });

      // ذخیره اطلاعات در localStorage
      const userData = {
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        picture: user.picture.large,
        location: `${user.location.city}, ${user.location.country}`,
        phone: user.cell,
        age: user.dob.age
      };

      localStorage.setItem("userData", JSON.stringify(userData));

      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="py-8">
      <div className="xl:flex shadow-md container bg-white rounded-3xl">
        <div className="flex">
          <Image
            className="h-[800px] w-full object-contain"
            src={Picture}
            alt="picture"
          />
        </div>
        <div className="flex justify-center items-center flex-1">
          <div className="flex flex-col xl:gap-7">
            <h1 className="xl:text-4xl font-semibold">خوش اومدید 👋</h1>
            <p className="text-lg">
              به پنل مدیریت خوش آمدید. امروز روز شماست—پروژه‌هایتان را با قدرت
              مدیریت کنید.
            </p>
            <div className="mt-5">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <Input
                  errors={errors}
                  type="text"
                  title="نام کاربری"
                  placeholder="نام کاربری خود را وارد کنید"
                  register={register}
                />
                <Input
                  errors={errors}
                  type="password"
                  title="رمز عبور"
                  placeholder="رمز عبور خود را وارد کنید"
                  register={register}
                />
                <Link href="/" className="text-blue-500 text-bold">
                  رمز عبور خود را فراموش کرده اید؟
                </Link>
                <Button className="button-main" type="submit">
                  ورود
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
