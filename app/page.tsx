"use client";

import { useEffect, useState } from "react";
import { Greet } from "./components/greet";
import { Counter } from "@/app/components/counter";

export default function Home() {
  //xuat du lieu bang experts
  const [experts, setExperts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = fetch("/api/experts");
        const response = await data.json();
        setExperts(response.experts);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {experts.map((expert) => (
          <div>{expert.expert}</div>
        ))}
        <Counter />
        <Greet />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left">
          <li className="mb-2">
            Get started by editing{""}
            <code className="bg-black/[.05] px-1 py-0.5">src/app/page.tsx</code>
          </li>
        </ol>
      </main>
    </div>
  );
}
