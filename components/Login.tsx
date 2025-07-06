"use client"
import { useForm } from "react-hook-form";
import Image from "next/image";
import Input from "./Input";
import Picture from "@/public/Images/image1.png";
import Button from "./Button";
import Link from "next/link";

type FormTypes = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>();

  const onSubmit = (data: FormTypes) => {
    console.log("Form submitted:", data);
    // FIXME: Add your login logic here
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
        {/* Form & Texts */}
        <div className="flex justify-center items-center flex-1">
          <div className="flex flex-col xl:gap-7">
            <h1 className="xl:text-4xl font-semibold">خوش اومدید 👋</h1>
            <p className="text-lg">
              به پنل مدیریت خوش آمدید. امروز روز شماست—پروژه‌هایتان را با قدرت
              مدیریت کنید.
            </p>
            {/*  Form */}
            <div className="mt-5">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <Input
                errors={errors}
                  type="email"
                  title="ایمیل"
                  placeholder="ایمیل خود را وارد کنید"
                  register={register}
                />
                <Input
                  errors={errors}
                  register={register}
                  type="password"
                  title="رمز عبور"
                  placeholder="رمز عبور خود را وارد کنید"
                />
                <Link href="/" className="text-blue-600 text-bold">
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
