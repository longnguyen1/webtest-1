"use client";

import { useRouter } from "next/navigation";

export default function Blog() {
  const router = useRouter();
  return (
    <div>
      <h1>My blog</h1>
      <button
        onClick={() => router.push("/")}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Go home
      </button>
    </div>
  );
}
