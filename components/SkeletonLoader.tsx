export function SkeletonOptionItem() {
  return (
    <li className="h-12 animate-pulse rounded bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 px-4 py-2" />
  );
}

export function SkeletonImage() {
  return (
    <div className="rounded bg-white p-1">
      <div className="h-[100px] w-[200px] animate-pulse rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />
    </div>
  );
}

export function SkeletonTitle() {
  return (
    <div className="w-full space-y-3">
      <div className="mx-auto h-6 w-3/4 animate-pulse rounded bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600" />
      <div className="mx-auto h-4 w-2/3 animate-pulse rounded bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600" />
    </div>
  );
}

export function SkeletonQuiz() {
  return (
    <div className="flex h-[100vh] w-full max-w-[400px] flex-col items-center justify-center gap-4 rounded bg-gray-800 p-8 shadow md:h-full">
      <div>
        <SkeletonTitle />
      </div>
      <SkeletonImage />
      <div className="w-full">
        <ul className="flex flex-col gap-2">
          {[...Array(4)].map((_, i) => (
            <SkeletonOptionItem key={i} />
          ))}
        </ul>
      </div>
    </div>
  );
}
