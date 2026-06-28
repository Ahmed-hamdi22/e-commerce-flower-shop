import getToken from "@/lib/utils/get-token";


export async function fetchUserData() {
  const token = await getToken();

  if (!token || !process.env.API) return null;

  const apiUrl = `${process.env.API}/auth/profile-data`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const payload: APIResponse<ProfileResponse> = await response.json();

    if (!response.ok || "error" in payload) {
      return null;
    }

    return payload.user;
  } catch {
    return null;
  }
}
