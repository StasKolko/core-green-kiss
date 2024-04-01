"use client";

import { Button } from "@/shared/ui/button";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((prev) => prev + 1);
  }

  function decrement() {
    setCount((prev) => prev - 1);
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      <h1>{count}</h1>
      <div className="flex gap-3">
        <Button onClick={decrement}>Меньше</Button>
        <Button onClick={increment}>Больше</Button>
      </div>
    </main>
  );
}
