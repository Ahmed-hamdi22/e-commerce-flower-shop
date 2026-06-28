"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import QuestionMarkRight from "@/components/common/question-mark-right";
import { useRegister } from "@/hooks/auth/use-register";
import FeedbackMessage from "@/components/common/feedback-message";
import { Lock, Mail, Phone, User } from "lucide-react";
import AuthInput from "./auth-input";

type RegisterFormProps = {
  onStateChange: (state: AuthFormState) => void;
};

export default function RegisterForm({ onStateChange }: RegisterFormProps) {
  // Translation
  const t = useTranslations();

  // Mutation
  const { error, isPending, register } = useRegister();

  // Form & Validation
  const Schema = z
    .object({
      firstName: z
        .string({ required_error: t("firstname-required") })
        .min(2, t("first-name-must-be-at-least-2-characters")),
      lastName: z
        .string({ required_error: t("lastname-required") })
        .min(2, t("last-name-must-be-at-least-2-characters")),
      phone: z
        .string({ required_error: t("phone-number-required") })
        .regex(
          /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
          t("invalid-phone-number-format-must-start-with-a-country-code"),
        ),
      email: z.string({ required_error: t("email-required") }).email(t("invalid-email-format")),
      gender: z.enum(["male", "female"], {
        required_error: t("gender-must-be-male-or-female"),
      }),
      password: z
        .string({ required_error: t("password-required") })
        .min(8, t("password-must-be-at-least-8-characters"))
        .regex(/[A-Z]/, t("password-must-contain-at-least-one-uppercase-letter"))
        .regex(/[a-z]/, t("password-must-contain-at-least-one-lowercase-letter"))
        .regex(/[0-9]/, t("password-must-contain-at-least-one-number")),
      rePassword: z
        .string({ required_error: t("password-confirm-required") })
        .min(1, t("password-confirm-required")),
    })
    .refine((values) => values.password === values.rePassword, {
      message: t("password-confirm-mismatch"),
      path: ["rePassword"],
    });
  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = (values) => {
    register(values, {
      onSuccess: () => {
        onStateChange("login");
      },
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* First name */}
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t("first-name")}</FormLabel>
                  <FormControl>
                    <AuthInput icon={User} type="text" placeholder={t("first-name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last name */}
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t("last-name")}</FormLabel>
                  <FormControl>
                    <AuthInput icon={User} type="text" placeholder={t("last-name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone number */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t("phone-number")}</FormLabel>
                  <FormControl>
                    <AuthInput icon={Phone} type="tel" placeholder={t("phone-number")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              name="gender"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t("gender")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <div className="relative">
                        <User className="pointer-events-none absolute start-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-custom-rose-800/70" />
                        <SelectTrigger className="h-12 rounded-xl border-custom-rose-100 bg-white ps-11 shadow-[0px_8px_24px_rgba(122,30,34,0.08)] focus:ring-2 focus:ring-custom-rose-100">
                          <SelectValue placeholder={t("gender")} />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">{t("male")}</SelectItem>
                      <SelectItem value="female">{t("female")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="sr-only">{t("email")}</FormLabel>
                  <FormControl>
                    <AuthInput icon={Mail} type="email" placeholder={t("email")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="password"
              control={form.control}
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

            {/* Confirm password */}
            <FormField
              name="rePassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t("confirm-password")}</FormLabel>
                  <FormControl>
                    <AuthInput
                      icon={Lock}
                      isPassword
                      placeholder={t("confirm-password")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Content */}
          <p className="text-center text-sm py-4 flex items-center justify-center">
            {/* Text */}
            {t("already-have-an-account")}

            {/* Icon */}
            <QuestionMarkRight />

            {/* Button */}
            <button
              type="button"
              onClick={() => onStateChange("login")}
              className="text-custom-rose-900"
            >
              {t("login")}
            </button>
          </p>

          {/* Feedback */}
          <FeedbackMessage message={error?.message} />

          {/* Submit */}
          <button
            disabled={isPending}
            type="submit"
            className="h-12 w-full rounded-xl bg-custom-rose-900 text-white hover:bg-custom-rose-800 disabled:opacity-70"
          >
            {t("create-account-button")}
          </button>
        </form>
      </Form>
    </div>
  );
}
