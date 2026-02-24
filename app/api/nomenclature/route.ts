import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const token = process.env.TABLECRM_TOKEN;
    const baseUrl = process.env.TABLECRM_BASE_URL ?? "https://app.tablecrm.com";

    if (!token) {
      return NextResponse.json({ message: "Missing TABLECRM_TOKEN" }, { status: 500 });
    }

    const body = await req.json(); // ожидаем массив [{...}]
    const url = `${baseUrl}/api/v1/nomenclature/?token=${token}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await res.text();
    let data: any = text;
    try {
      data = JSON.parse(text);
    } catch {}

    if (!res.ok) {
      return NextResponse.json(
        { message: "TableCRM error", status: res.status, data },
        { status: res.status }
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch (e: any) {
    return NextResponse.json({ message: e?.message ?? "Unknown error" }, { status: 500 });
  }
}