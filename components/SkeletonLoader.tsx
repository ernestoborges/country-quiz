export function SkeletonOptionItem() {
  return (
    <li className="h-12 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded px-4 py-2 animate-pulse" />
  );
}

export function SkeletonImage() {
  return (
    <div className="bg-white p-1 rounded">
      <div className="w-[200px] h-[100px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded animate-pulse" />
    </div>
  );
}

export function SkeletonTitle() {
  return (
    <div className="space-y-3 w-full">
      <div className="h-6 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded animate-pulse w-3/4 mx-auto" />
      <div className="h-4 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded animate-pulse w-2/3 mx-auto" />
    </div>
  );
}

export function SkeletonQuiz() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-gray-800 p-8 rounded shadow w-full h-[100vh] md:h-full max-w-[400px]">
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
