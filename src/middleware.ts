import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { LOCALES, routing } from "./i18n/routing";

// Private pages
const privatePages = ["/cart", "/checkout", "/allOrders", "/paymant", "/dashboard"];

// Create middleware for handling internationalization (i18n)
const handleI18nRouting = createMiddleware(routing);

// Authentication middleware using NextAuth
const authMiddleware = withAuth(
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      // Redirect to home page if not authenticated
      signIn: "/",
      error: "/",
    },
  },
);

export default async function middleware(req: NextRequest) {
  // Private pathname regex
  const privatePathnameRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${privatePages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  // Check if the requested page is private
  const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname);

  if (isPrivatePage) {
    // Apply NextAuth authentication for private pages

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  } else {
    // Apply internationalization middleware for public pages
    return handleI18nRouting(req);
  }
}

// Apply matchers
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
