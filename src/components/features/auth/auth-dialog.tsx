"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { ImSpinner3 } from "react-icons/im";

// Dynamically import form components
const LoginForm = dynamic(() => import("./components/login-form"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <ImSpinner3 />
    </div>
  ),
});

const RegisterForm = dynamic(() => import("./components/register-form"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <ImSpinner3 />
    </div>
  ),
});

// Forgot password state
const ForgotPasswordForm = dynamic(() => import("./components/forgot-password-form"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <ImSpinner3 />
    </div>
  ),
});

// Set password state
const SetPasswordForm = dynamic(() => import("./components/set-password-form"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <ImSpinner3 />
    </div>
  ),
});

const VerifyOTPForm = dynamic(() => import("./components/verify-otp-form"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <ImSpinner3 />
    </div>
  ),
});

export default function AuthDialog({ children }: { children: React.ReactNode }) {
  // Translations
  const t = useTranslations();

  // State
  const [authState, setAuthState] = useState<AuthFormState>("login");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  // Function
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(() => setAuthState("login"), 300);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      {/* DialogTrigger */}
      <DialogTrigger asChild>{children}</DialogTrigger>

      {/* Main dialog container */}
      <DialogContent className="w-[92vw] max-w-[92vw] gap-5 rounded-2xl border-custom-rose-100 bg-white p-6 shadow-2xl sm:max-w-[560px] md:p-8 max-h-[90vh] overflow-y-auto">
        {/* Dialog header*/}
        <DialogHeader className="space-y-2">
          {/* Dialog title*/}
          <DialogTitle className="text-left font-semibold text-2xl text-blue-gray-900 rtl:text-right">
            {/* Return title base on state*/}
            {authState === "login" && t("login-title")}
            {authState === "register" && t("register-title")}
            {authState === "forgot-password" && t("forgot-password-title")}
            {authState === "set-password" && t("set-password-title")}
            {authState === "verify-otp" && t("verify-code-title")}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {authState === "login" && t("login-title")}
            {authState === "register" && t("register-title")}
            {authState === "forgot-password" && t("forgot-password-title")}
            {authState === "set-password" && t("set-password-title")}
            {authState === "verify-otp" && t("verify-code-title")}
          </DialogDescription>
        </DialogHeader>

        {/* Login form */}
        {authState === "login" && <LoginForm onStateChange={setAuthState} />}

        {/* Register form */}
        {authState === "register" && <RegisterForm onStateChange={setAuthState} />}

        {/* Forgot password form */}
        {authState === "forgot-password" && (
          <ForgotPasswordForm onStateChange={setAuthState} setEmail={setEmail} />
        )}

        {/* Verify OTP form */}
        {authState === "verify-otp" && <VerifyOTPForm email={email} onStateChange={setAuthState} />}

        {/* Set password form */}
        {authState === "set-password" && (
          <SetPasswordForm email={email} onStateChange={setAuthState} />
        )}
      </DialogContent>
    </Dialog>
  );
}
