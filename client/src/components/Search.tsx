"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";
import { Search } from "lucide-react";

export const NavbarSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");
 
  const debouncedSearch = useMemo(() => 
    debounce((value: string) => {
      const currentQuery = searchParams.get("query") || "";

      if (value.trim() !== currentQuery) {
        const newParams = new URLSearchParams();
        if (value.trim()) {
          newParams.set("query", value.trim());
          router.push(`${pathname}?${newParams.toString()}`);
        } else {
          router.push(pathname); 
        }
      }
    }, 400)
  , [searchParams, pathname, router]);

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query]);

  useEffect(() => {
    const urlQuery = searchParams.get("query") || "";
    setQuery(urlQuery);
  }, [searchParams]);

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
