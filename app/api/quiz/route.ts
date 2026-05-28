import { NextResponse } from "next/server";
import countries from "@/data/countries.json";
import territories from "@/data/territories.json";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = url.searchParams.get("lang") || "eng";
  const nameType = url.searchParams.get("nameType") || "official";
  const questionsParam = url.searchParams.get("questions");
  const questions = questionsParam ? questionsParam.split(",") : ["countries"];

  if (nameType !== "official" && nameType !== "common") {
    return NextResponse.json(
      { message: "Invalid nameType parameter" },
      { status: 400 },
    );
  }

  const dataToUse = [
    ...(questions.includes("countries") ? countries : []),
    ...(questions.includes("territories") ? territories : []),
  ];

  const randomCountry = dataToUse[Math.floor(Math.random() * dataToUse.length)];
  const correctOption = {
    code: randomCountry.cca2,
    name:
      randomCountry.translations[
        lang as keyof typeof randomCountry.translations
      ]?.[nameType] || randomCountry.name[nameType],
  };

  const wrongOptions = dataToUse
    .filter((c) => c.cca2 !== correctOption.code)
    .map((c) => ({
      code: c.cca2,
      name:
        c.translations[lang as keyof typeof c.translations]?.[nameType] ||
        c.name[nameType],
    }))
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const options = [...wrongOptions, correctOption].sort(
    () => 0.5 - Math.random(),
  );

  return NextResponse.json({
    country: correctOption.code,
    options,
  });
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const lang = url.searchParams.get("lang") || "eng";
  const nameType =
    url.searchParams.get("nameType") === "common" ? "common" : "official";

  if (nameType !== "official" && nameType !== "common") {
    return NextResponse.json(
      { message: "Invalid nameType parameter" },
      { status: 400 },
    );
  }

  const body = await req.json();

  const dataToUse = [...countries, ...territories];

  const country = dataToUse.find((c) => c.cca2 === body.country);

  if (!country) {
    return NextResponse.json({ message: "Country not found" }, { status: 404 });
  }

  const translation = country.translations[
    lang as keyof typeof country.translations
  ] as { common?: string; official?: string } | undefined;
  const isCorrect =
    translation?.[nameType] === body.answer ||
    country.name[nameType] === body.answer;
  const correctName =
    translation?.[nameType] ||
    country.name[nameType as keyof typeof country.name];

  return NextResponse.json({
    isCorrect,
    sentAnswer: body.answer,
    correctAnswer: {
      code: country.cca2,
      name: correctName,
    },
  });
}
