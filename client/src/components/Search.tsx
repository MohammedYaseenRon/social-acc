"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { Search, SearchIcon } from "lucide-react";

export const NavbarSearch = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const debouncedSearch = debounce((value: string) => {
    const searchParams = new URLSearchParams();
    if (value.trim()) {
      searchParams.set("query", value);
      router.push(`/products?${searchParams.toString()}`);

    }

  }, 400);

  useEffect(() => {
    if (query.trim()) {
      debouncedSearch(query);
    }
    return () => debouncedSearch.cancel();
  }, [query]);

  if (!pathname.startsWith("/") || pathname.startsWith("/admin") || pathname.startsWith("/superAdmin")) {
    return null;
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-4 border rounded-xl p-2"
      />
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};
 