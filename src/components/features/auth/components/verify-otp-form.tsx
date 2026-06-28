"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useVerifyOtp } from "@/hooks/auth/use-verify-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useForgotPassword } from "@/hooks/auth/use-forgot-password";
import FeedbackMessage from "@/components/common/feedback-message";
import { KeyRound } from "lucide-react";
import AuthInput from "./auth-input";

type VerifyOtpFormProps = {
  email: string;
  onStateChange: (state: AuthFormState) => void;
};

export default function VerifyOtpForm({ email, onStateChange }: VerifyOtpFormProps) {
  // Translations
  const t = useTranslations();

  // Mutation
  const { verifyOTP, isPending, error } = useVerifyOtp();
  const { mutate: resendOTP, isPending: isResending } = useForgotPassword();

  // OTP validation schema
  const verifyCodeSchema = z.object({
    code: z.string({ required_error: t("code-reqired") }).regex(/^\d{6}$/, t("code-reqired")),
  });
  type VerifyCode = z.infer<typeof verifyCodeSchema>;

  const form = useForm<VerifyCode>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { code: "" },
  });

  // SubmitEvent
  const onSubmit: SubmitHandler<VerifyCode> = (values) => {
    verifyOTP(
      { resetCode: values.code },
      {
        onSuccess: () => {
          onStateChange("set-password");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* OTP Input Field */}
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AuthInput
                  icon={KeyRound}
                  {...field}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder={t("enter-code")}
                  className="text-xl tracking-[0.3em]"
                />
              </FormControl>

              {/* Message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error message */}
        <FeedbackMessage message={error?.message} />

        {/* Resend Code Section */}
        <div className="text-right text-sm">
          <span className="text-gray-600">{t("receive-code")} </span>
          <Button
            variant="outline"
            className="h-auto border-none bg-transparent p-0 text-custom-rose-900 underline shadow-none hover:bg-transparent hover:text-custom-rose-800"
            onClick={() => resendOTP(email)}
            type="button"
            disabled={isResending}
          >
            {isResending ? t("resending") : t("resend-code")}
          </Button>
        </div>

        {/* Submit button */}
        <Button
          className="h-12 w-full rounded-xl bg-custom-rose-900 hover:bg-custom-rose-800"
          type="submit"
          disabled={isPending}
        >
          {isPending ? t("verifying-otp") : t("verify-code")}
        </Button>
      </form>
    </Form>
  );
}
