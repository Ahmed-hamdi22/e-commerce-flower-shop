"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import useLogin from "@/hooks/auth/use-login";

export default function LoginForm({
  onStateChange,
}: {
  onStateChange: (state: AuthFormState) => void;
}) {
  // Translations
  const t = useTranslations();

  // Mutation
  const { error, login } = useLogin();

  // Login Schema
  const Schema = z.object({
    email: z
      .string({ required_error: t("email-reqired") })
      .min(1, t("email-reqired"))
      .email(t("email-invalid")),
    password: z.string({ required_error: t("password-required") }).min(1, t("password-required")),
  });
  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(Schema),
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = (values) => {
    login(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 min-w-96">
        {/* Email Filed */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">{t("email")}</FormLabel>
              <FormControl className="w-full border-none shadow-[0px_1px_10px_0px_rgba(0,0,0,0.1)]">
                <Input type="email" placeholder={t("email")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Password*/}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">{t("password")}</FormLabel>
              <FormControl className="w-full border-none  shadow-[0px_1px_10px_0px_rgba(0,0,0,0.1)]">
                <Input type="password" placeholder={t("password")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forget Button */}
        <div className="flex">
          <Button
            variant="secondary"
            className="text-custom-rose-900 p-0 underline ml-auto"
            onClick={() => onStateChange("forgot-password")}
          >
            {t("forgot-password")}
          </Button>
        </div>

        {/* Register link */}
        <div className="flex flex-col gap-2 text-sm text-center mb-5">
          <div className="text-gray-600">
            {t("dont-have-account")}{" "}
            <Button
              variant="secondary"
              className="text-custom-rose-900 p-0  underline"
              onClick={() => onStateChange("register")}
            >
              {t("create-account")}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm font-semibold text-center">{error.message}</p>
          )}
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full h-[50px]  rounded-3xl bg-custom-rose-900 hover:bg-custom-rose-800  mb-3"
        >
          {t("login")}
        </Button>
      </form>
    </Form>
  );
}
