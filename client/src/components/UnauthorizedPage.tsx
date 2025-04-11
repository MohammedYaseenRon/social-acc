"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">⛔ Access Denied</h1>
      <p className="text-lg text-gray-700 mb-6">
        You don’t have permission to view this page.
      </p>
      <Button
        onClick={() => router.push("/")}
        className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
      >
        Go Back to Home
      </Button>
    </div>
  );
}
