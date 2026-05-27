import { NextResponse } from "next/server";
import countries from "@/data/countries.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "por";
  const type = searchParams.get("type") || "common";
  const codes = (searchParams.get("codes") || "").split(",");

  const translated = codes.map((code) => {
    const country = countries.find((c) => c.cca2 === code);
    const translations = country?.translations as
      | Record<string, { common?: string; official?: string }>
      | undefined;
    const translationType = type as "common" | "official";

    return {
      code,
      name: translations?.[lang]?.[translationType] || country?.name,
    };
  });

  return NextResponse.json(translated);
}
