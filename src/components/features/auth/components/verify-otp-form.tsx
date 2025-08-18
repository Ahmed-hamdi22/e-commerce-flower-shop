"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVerifyOtp } from "@/hooks/auth/use-verify-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useForgotPassword } from "@/hooks/auth/use-forgot-password";
import FeedbackMessage from "@/components/common/feedback-message";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 min-w-96">
        {/* OTP Input Field */}
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder={t("enter-code")}
                  className="w-full h-12 text-left rtl:text-right text-xl  shadow-[0px_1px_10px_0px_rgba(0,0,0,0.1)]"
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
            className="text-custom-rose-900 hover:text-custom-rose-800 p-0 underline"
            onClick={() => resendOTP(email)}
            type="button"
            disabled={isResending}
          >
            {isResending ? t("resending") : t("resend-code")}
          </Button>
        </div>

        {/* Submit button */}
        <Button
          className="w-full bg-custom-rose-900 rounded-2xl hover:bg-custom-rose-800"
          type="submit"
          disabled={isPending}
        >
          {isPending ? t("verifying-otp") : t("verify-code")}
        </Button>
      </form>
    </Form>
  );
}
