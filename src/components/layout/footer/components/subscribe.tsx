"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import ArrowRight from "@/components/common/arrow-long-right";

export default function Subscribe() {
  // Translation
  const t = useTranslations();

  // Form & Validation
  const Schema = z.object({
    email: z
      .string({ required_error: t("please-enter-your-email") })
      .email(t("subscribe-email-invalid"))
      .nonempty(t("please-enter-your-email")),
  });

  type Inputs = z.infer<typeof Schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-xl flex-col items-center">
      <div className="flex w-full flex-col gap-3 text-sm font-semibold text-blue-gray-500 sm:relative sm:block">
        {/* Input */}
        <Input
          id="email"
          type="email"
          placeholder={t("enter-your-email")}
          className="h-12 w-full rounded-[30px] bg-white pe-4 ps-4 text-left shadow-sm ltr:placeholder:text-left rtl:text-right rtl:placeholder:text-right sm:pe-36"
          {...register("email")}
        />

        {/* Subscribe */}
        <Button
          type="submit"
          className="flex h-12 w-full items-center justify-center rounded-[30px] bg-custom-rose-900 text-base font-medium sm:absolute sm:top-1/2 sm:h-[90%] sm:w-[131px] sm:-translate-y-1/2 ltr:sm:right-1 rtl:sm:left-1"
        >
          {/* Text */}
          {t("Subscribe")}

          {/* Icon */}
          {/* Arrow right icon for ltr */}
          <span>
            <ArrowRight />
          </span>
        </Button>
      </div>

      {/* Feedback */}
      {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>}
    </form>
  );
}
