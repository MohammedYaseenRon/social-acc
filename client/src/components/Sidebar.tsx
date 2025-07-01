import React, { useCallback, useRef } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import Pricerange from "./Pricerange";
import { useProductStore } from "@/store/productStore";


interface SidebarProps {
  categories: {
    id: number;
    name: string;
    subcategories: {
      id: number;
      name: string;
    }[];
  }[];
}


export function AppSidebar({ categories }: SidebarProps) {
  const { fetchProducts } = useProductStore();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handlePriceChange = useCallback((range: [number, number]) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchProducts({ minPrice: range[0], maxPrice: range[1] });
    }, 300);
  }, [fetchProducts]);


  return (
    <Sidebar className="flex flex-col h-full">
      <ScrollArea className="min-h-screen" >
        <SidebarContent >
          <SidebarGroup className="pt-18">
            <SidebarGroupLabel className="hover:bg-gray-100 w-full text-md mb-4 border font-medium">
              SideBar
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {categories.map((cat) =>
                  cat.subcategories && cat.subcategories.length > 0 ? (
                    <Collapsible
                      key={cat.id}
                      defaultOpen
                      className="group"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full flex items-center justify-between hover:bg-gray-100">
                            {cat.name}
                            <ChevronRight className="w-4 h-4 text-gray-400 transform transition-transform duration-200 group-data-[state=open]:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {cat.subcategories.map((sub) => (
                              <SidebarMenuSubItem
                                key={sub.id}
                                className="w-full hover:bg-gray-100 p-2 rounded-lg"
                              >
                                <Link href={`/products/category/${sub.id}`}>{sub.name}</Link>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={cat.id}>
                      <SidebarMenuButton>
                        <Link href={`/products/category/${cat.id}`}>{cat.name}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarContent className="border-t pt-4 px-4">
          <SidebarGroup>
            <SidebarGroupLabel className="text-md font-medium mb-2">
              Price
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <Pricerange onChange={handlePriceChange} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  );
}
