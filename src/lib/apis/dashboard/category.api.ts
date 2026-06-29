"use server";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { AUTH_COOKIE } from "@/lib/constants/auth.constant";
import { revalidatePath } from "next/cache";
import getToken from "@/lib/utils/get-token";

async function getAuthenticatedToken() {
  const tokenCookie = cookies().get(AUTH_COOKIE)?.value;
  if (!tokenCookie) {
    throw new Error("Authentication required");
  }

  const token = await decode({
    token: tokenCookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (!token?.token) {
    throw new Error("Invalid authentication token");
  }

  return token.token;
}

// addcategory

export async function addcategory(formData: FormData) {
  const token = await getAuthenticatedToken();

  const response = await fetch(`${process.env.API}/categories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const payload = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }
  revalidatePath("dashboard/categories");
}

// Update category

export async function updatecategory(id: string, formData: FormData) {
  const token = await getAuthenticatedToken();

  const response = await fetch(`${process.env.API}/categories/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const payload = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  revalidatePath("dashboard/categories");
}

// Get category by id

export async function getCategoryById(id: string): Promise<Category | null> {
  const token = await getToken();

  if (!token || !process.env.API) return null;

  try {
  const res = await fetch(`${process.env.API}/categories/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const payload: APIResponse<{ category: Category }> = await res.json();

    if (!res.ok || "error" in payload) return null;

    return payload.category || null;
  } catch {
    return null;
  }
}
