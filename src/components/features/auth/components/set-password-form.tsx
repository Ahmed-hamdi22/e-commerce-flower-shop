"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useSetNewPassword } from "@/hooks/auth/use-set-password";
import FeedbackMessage from "@/components/common/feedback-message";
import { Lock } from "lucide-react";
import AuthInput from "./auth-input";

type SetPasswordProps = {
  email: string;
  onStateChange: (state: AuthFormState) => void;
};

export default function SetPasswordForm({ email, onStateChange }: SetPasswordProps) {
  // Translation
  const t = useTranslations();

  // Mutation
  const { setPassword, isPending, error } = useSetNewPassword();

  // Form & Validation
  const Schema = z
    .object({
      newPassword: z
        .string({ required_error: t("password-required") })
        .min(8, t("password-min-length"))
        .regex(/[0-9]/, t("password-number-required"))
        .regex(/[a-z]/, t("password-lowercase-required"))
        .regex(/[A-Z]/, t("password-uppercase-required")),

      confirmPassword: z.string({ required_error: t("confirm-password-required") }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("passwords-must-match"),
      path: ["confirmPassword"],
    });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(Schema),
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = (values) => {
    setPassword(
      { email, newPassword: values.newPassword },
      {
        onSuccess: () => {
          onStateChange("login");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Password field */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AuthInput
                  icon={Lock}
                  isPassword
                  {...field}
                  placeholder={t("create-password")}
                />
              </FormControl>
              {/* Display validation errors */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm password field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AuthInput
                  icon={Lock}
                  isPassword
                  {...field}
                  placeholder={t("re-enter-password")}
                />
              </FormControl>
              {/* Display validation errors */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error message */}
        <FeedbackMessage message={error?.message} />

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isPending}
          className="h-12 w-full rounded-xl bg-custom-rose-900 px-[31px] font-medium text-base hover:bg-custom-rose-800"
        >
          {isPending ? t("setting-new-password") : t("set-password")}
        </Button>
      </form>
    </Form>
  );
}
