import { NextResponse } from "next/server";

import { getCart } from "@/app/api/get-cart";

export async function GET() {
  try {
    const payload = await getCart();

    return NextResponse.json(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch cart";

    return NextResponse.json({ error: message }, { status: 401 });
  }
}
