// src/components/UserProvider.tsx
"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const { fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  return <>{children}</>;
};
