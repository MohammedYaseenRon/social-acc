"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { SearchIcon } from "lucide-react";

export const NavbarSearch = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const debouncedSearch = debounce((value: string) => {
    const searchParams = new URLSearchParams();
    if (value.trim()) {
      searchParams.set("query", value);
    }

    router.push(`/products?${searchParams.toString()}`);
  }, 400);

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="py-2 pl-10 pr-4 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500 w-96"
      />
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};
