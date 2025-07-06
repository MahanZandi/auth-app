import { unstable_PasswordToggleField as PasswordToggleField } from "radix-ui";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RxEyeOpen } from "react-icons/rx";
import { PiEyeClosedThin } from "react-icons/pi";

type FormTypes = {
  email: string;
  password: string;
};

interface InputProps {
  placeholder: string;
  title: string;
  type: "email" | "password" | "text";
  register: UseFormRegister<FormTypes>;
  errors: FieldErrors<FormTypes>;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  title,
  type,
  register,
  errors,
}) => {
  return (
    <div>
      <p className="mb-2 text-lg">{title}</p>
      {type === "password" && (
        <PasswordToggleField.Root>
          <div className="relative">
            <PasswordToggleField.Input
              placeholder={placeholder}
              className={`${
                errors.password ? "border-red-500" : " border-gray-400"
              } all-[unset] box-border bg-gray-100 border p-4 pl-10 rounded-xl w-full placeholder:text-gray-400 text-sm`}
              {...register("password", {
                required: "وارد کردن رمز عبور الزامی است",
                minLength: {
                  value: 6,
                  message: "رمز عبور باید حداقل 6 کاراکتر باشد",
                },
              })}
            />
            <PasswordToggleField.Toggle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
              <PasswordToggleField.Icon
                className="xl:text-2xl cursor-pointer"
                visible={<RxEyeOpen />}
                hidden={<PiEyeClosedThin />}
              />
            </PasswordToggleField.Toggle>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </PasswordToggleField.Root>
      )}
      {type === "email" && (
        <>
          <input
            className={`${
              errors.email ? "border-red-500" : " border-gray-400"
            } bg-gray-100 border border-gray-400 p-4 rounded-xl w-full placeholder:text-gray-400 text-sm`}
            type={type}
            placeholder={placeholder}
            {...register("email", {
              required: "وارد کردن ایمیل الزامی است",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "ایمیل معتبر نیست",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Input;
