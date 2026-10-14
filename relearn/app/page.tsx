import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
        ReLearn
      </h1>
      <p className="mt-2 text-lg text-zinc-700 dark:text-zinc-400">
        Restart from scratch and learn everything again.
      </p>
      <div className="mt-6 flex gap-4">
        <a
          href="/learn"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Start Learning
        </a>
        <a
          href="/about"
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          About
        </a>
      </div>
    </div>
  );
}
