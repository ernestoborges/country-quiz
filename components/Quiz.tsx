"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SkeletonQuiz } from "./SkeletonLoader";

type Option = {
  code: string;
  name: string;
};

type QuizData = {
  country: string;
  options: Option[];
};

type QuizAnswer = {
  isCorrect: boolean;
  sentAnswer: string;
  correctAnswer: Option;
};

export default function Quiz() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [answer, setAnswer] = useState<QuizAnswer | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleAnswer(answer: string) {
    setIsSubmitting(true);
    fetch("/api/quiz?lang=por&nameType=common", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: quizData?.country,
        answer,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnswer(data);
      })
      .catch((err) => console.error("Error submitting answer:", err))
      .finally(() => setIsSubmitting(false));
  }

  function handleReset() {
    setQuizData(null);
    setAnswer(null);
    setIsSubmitting(false);
    fetchQuizData().then((data) => {
      if (data) setQuizData(data);
    });
  }

  async function fetchQuizData() {
    try {
      const res = await fetch("/api/quiz?lang=por&nameType=common");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error fetching quiz data:", err);
      return null;
    }
  }

  useEffect(() => {
    fetchQuizData().then((data) => {
      if (data) {
        setQuizData(data);
      }
    });
  }, []);

  if (!quizData) {
    return <SkeletonQuiz />;
  }

  return (
    <div className="flex h-[100vh] w-full max-w-[400px] flex-col items-center justify-center gap-4 rounded bg-gray-800 p-8 shadow md:h-full">
      <div>
        <button className="cursor-pointer rounded bg-blue-500 p-2 hover:bg-blue-600">
          settings
        </button>
      </div>
      <div>
        <h2 className="text-2xl text-white">
          Qual país corresponde a esta bandeira?
        </h2>
      </div>
      <div>
        <div className="rounded bg-white p-1">
          <Image
            src={`https://flagcdn.com/${quizData.country.toLowerCase()}.svg`}
            alt={`${quizData.country} Flag`}
            width={200}
            height={100}
          />
        </div>
      </div>
      {answer !== null && (
        <QuestionLabel
          isCorrectAnswer={answer.isCorrect}
          correctAnswer={answer.correctAnswer.name}
        />
      )}
      <div className="w-full">
        <ul
          className="flex flex-col gap-2"
          style={{ pointerEvents: isSubmitting ? "none" : "auto" }}
        >
          {quizData.options.map((option) => (
            <OptionItem
              key={option.code}
              option={option}
              answer={answer}
              onClick={handleAnswer}
            />
          ))}
        </ul>
      </div>
      <div className="flex h-10 w-full items-center justify-end">
        {answer !== null && (
          <button
            onClick={handleReset}
            className="m-2 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Jogar Novamente
          </button>
        )}
      </div>
    </div>
  );
}

function QuestionLabel({
  isCorrectAnswer,
  correctAnswer,
}: {
  isCorrectAnswer: boolean;
  correctAnswer: string;
}) {
  return (
    <div className="w-full">
      <div
        className={`flex flex-col rounded p-2 text-white ${isCorrectAnswer ? "bg-green-400" : "bg-red-400"}`}
      >
        {isCorrectAnswer ? (
          <p className="text-green-700">
            Correto! A resposta é <strong>{correctAnswer}</strong>.
          </p>
        ) : (
          <p className="text-red-700">
            Errado! A resposta correta é <strong>{correctAnswer}</strong>.
          </p>
        )}
      </div>
    </div>
  );
}

function OptionItem({
  option,
  answer,
  onClick,
}: {
  option: Option;
  answer: QuizAnswer | null;
  onClick: (answer: string) => void;
}) {
  const commonClasses = "text-white px-4 py-2 rounded";

  if (answer === null) {
    return (
      <li
        key={option.code}
        className={`${commonClasses} cursor-pointer bg-blue-500 hover:bg-blue-600`}
        onClick={() => onClick(option.name)}
      >
        {option.name}
      </li>
    );
  }

  return (
    <li
      key={option.code}
      className={`${commonClasses} ${answer.correctAnswer.code === option.code ? "bg-green-500" : answer.sentAnswer === option.name ? "bg-red-500" : "bg-gray-500"}`}
    >
      {option.name}
    </li>
  );
}
