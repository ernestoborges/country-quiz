"use client";

import { useState } from "react";

const gameModes: { id: "flag" | "map"; name: string }[] = [
  { id: "flag", name: "Bandeira" },
  { id: "map", name: "Mapa" },
];

const answerModes: { id: "multiple-choice" | "text"; name: string }[] = [
  { id: "multiple-choice", name: "Multipla escolha" },
  { id: "text", name: "Escrita" },
];

export default function MainMenu() {
  const [selectedGameMode, setSelectedGameMode] = useState<"flag" | "map">(
    "flag",
  );
  const [selectedAnswerMode, setSelectedAnswerMode] = useState<
    "text" | "multiple-choice"
  >("multiple-choice");

  return (
    <div className="flex h-[100vh] w-full max-w-[400px] flex-col items-center justify-center gap-12 overflow-y-auto rounded bg-gray-800 p-8 shadow md:h-full">
      <div>
        <h1 className="text-4xl font-bold">Country Quiz</h1>
        <p className="text-muted-foreground text-lg">
          Teste seus conhecimentos sobre países do mundo!
        </p>
      </div>
      <div>
        <section className="flex w-full flex-col gap-4">
          <div>
            <h2>Modo de jogo</h2>
            <hr />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {gameModes.map((mode) => (
              <label htmlFor={mode.id} key={mode.id}>
                <input
                  type="radio"
                  id={mode.id}
                  name="gameMode"
                  value={mode.id}
                  checked={selectedGameMode === mode.id}
                  onChange={() => setSelectedGameMode(mode.id)}
                  className="hidden"
                />
                <OptionItem isSelected={selectedGameMode === mode.id}>
                  {mode.name}
                </OptionItem>
              </label>
            ))}
          </div>
        </section>
        <section className="flex w-full flex-col gap-4">
          <div>
            <h2>Escolha o modo de resposta</h2>
            <hr />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {answerModes.map((mode) => (
              <label htmlFor={mode.id} key={mode.id}>
                <input
                  type="radio"
                  id={mode.id}
                  name="answerMode"
                  value={mode.id}
                  checked={selectedAnswerMode === mode.id}
                  onChange={() => setSelectedAnswerMode(mode.id)}
                  className="hidden"
                  disabled={mode.id === "text"}
                />
                <OptionItem
                  isSelected={selectedAnswerMode === mode.id}
                  disabled={mode.id === "text"}
                >
                  {mode.name}
                </OptionItem>
              </label>
            ))}
          </div>
        </section>
      </div>
      <div className="w-full">
        <button
          className="h-16 w-full rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => {
            const params = new URLSearchParams({
              gameMode: selectedGameMode,
              answerMode: selectedAnswerMode,
            });
            window.location.href = `/game?${params.toString()}`;
          }}
        >
          Iniciar
        </button>
      </div>
    </div>
  );
}

function OptionItem({
  children,
  isSelected,
  disabled,
}: {
  children: React.ReactNode;
  isSelected: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className={`flex ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} aspect-square w-full items-center justify-center rounded px-4 py-2 text-white ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${isSelected ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"}`}
    >
      {children}
    </div>
  );
}
