import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "../constants/auth.constant";

export default async function getToken() {
  const cookieStore = cookies();
  const tokenCookies =
    cookieStore.get(AUTH_COOKIE)?.value || cookieStore.get(`__Secure-${AUTH_COOKIE}`)?.value;
  const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;

  if (!tokenCookies || !secret) return null;

  try {
    const token = await decode({ token: tokenCookies, secret });

    return token?.token;
  } catch {
    return null;
  }
}
