"use client";

import * as React from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AuthInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: LucideIcon;
  isPassword?: boolean;
};

const authInputClassName =
  "h-12 rounded-xl border border-custom-rose-100 bg-white ps-11 pe-4 text-left shadow-[0px_8px_24px_rgba(122,30,34,0.08)] transition focus-visible:border-custom-rose-700 focus-visible:ring-2 focus-visible:ring-custom-rose-100";

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, icon: Icon, isPassword = false, type, dir = "ltr", ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="relative">
        <Icon className="pointer-events-none absolute start-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-custom-rose-800/70" />
        <Input
          ref={ref}
          type={inputType}
          dir={dir}
          className={cn(authInputClassName, isPassword && "pe-11", className)}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((value) => !value)}
            className="absolute end-4 top-1/2 z-10 -translate-y-1/2 text-custom-rose-800/70 transition hover:text-custom-rose-900 focus:outline-none focus:ring-2 focus:ring-custom-rose-200"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
