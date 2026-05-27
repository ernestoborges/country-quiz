import Quiz from "@/components/Quiz";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center bg-white md:px-16 md:py-32 dark:bg-black">
        <Quiz />
      </main>
    </div>
  );
}
