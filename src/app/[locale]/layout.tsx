import Providers from "@/components/provider";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Roboto } from "next/font/google";
import { cn } from "@/lib/utils/cn";
import { Toaster } from "@/components/ui/sonner";
import NextAuthProvider from "@/components/provider/components/next-auth-provider";
import { Check, Info, X } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});

export default function LocaleLayout({ params: { locale }, children }: LayoutProps) {
  // Check if the provided locale is valid by verifying it against the allowed locales.
  if (!routing.locales.includes(locale)) notFound();

  // Setting the request's locale with `setRequestLocale(locale)` ensures localized static content during rendering.
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={cn(inter.variable, roboto.variable, inter.className, "antialiased")}>
        <Providers>
          <NextAuthProvider>
            {/* Main */}
            {children}

            {/* Toaster */}
            <Toaster
              position="top-center"
              icons={{
                info: <Info size={16} className="text-inherit" />,
                success: <Check size={16} className="text-inherit" />,
                error: <X size={16} className="text-inherit" />,
              }}
            />
          </NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
