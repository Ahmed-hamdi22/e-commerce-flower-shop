"use client";

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
import { Link } from "@/i18n/routing";
import { Lock, Mail } from "lucide-react";
import AuthInput from "./auth-input";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Filed */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">{t("email")}</FormLabel>
              <FormControl>
                <AuthInput icon={Mail} type="email" placeholder={t("email")} {...field} />
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
              <FormControl>
                <AuthInput icon={Lock} isPassword placeholder={t("password")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forget Button */}
        <div className="flex">
          <Link
            href="#"
            className="bg-transparent border-none text-custom-rose-900 p-0 underline ml-auto"
            onClick={() => onStateChange("forgot-password")}
          >
            {t("forgot-password")}
          </Link>
        </div>

        {/* Register link */}
        <div className="flex flex-col gap-2 text-sm text-center mb-5">
          <div className="text-gray-600">
            {t("dont-have-account")}{" "}
            <Link
              href="#"
              className="bg-transparent text-custom-rose-900 p-0 underline  border-none "
              onClick={() => onStateChange("register")}
            >
              {t("create-account")}
            </Link>
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
          className="w-full h-12 rounded-xl bg-custom-rose-900 hover:bg-custom-rose-800 mb-3"
        >
          {t("login")}
        </Button>
      </form>
    </Form>
  );
}
