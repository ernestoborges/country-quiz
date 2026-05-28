import { Suspense } from "react";
import Content from "./content";
import { SkeletonQuiz } from "@/components/SkeletonLoader";

export default function Home() {
  return (
    <Suspense fallback={<SkeletonQuiz />}>
      <Content />
    </Suspense>
  );
}
