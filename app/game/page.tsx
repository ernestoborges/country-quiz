"use client";

import Quiz from "@/components/Quiz";

import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const gameMode = (searchParams.get("gameMode") as "flag" | "map") || "flag";
  const answerMode =
    (searchParams.get("answerMode") as "multiple-choice" | "text") ||
    "multiple-choice";

  return (
    <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center bg-white md:px-16 md:py-32 dark:bg-black">
      <Quiz gameMode={gameMode} answerMode={answerMode} />
    </main>
  );
}
