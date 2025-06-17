import React from "react";
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
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";


const sidebarItems = [
  {
    title: "Dashboard",
    children: [
      { title: "Overview", href: "/dashboard/overview" },
      { title: "Analytics", href: "/dashboard/analytics" },
      { title: "Reports", href: "/dashboard/reports" },
    ],
  },
  {
    title: "Home",
    href: "/home",
    children: [
      { title: "Overview", href: "/dashboard/overview" },
      { title: "Analytics", href: "/dashboard/analytics" },
      { title: "Reports", href: "/dashboard/reports" },
    ],
  },
  {
    title: "Inbox",
    href: "/inbox",
    children: [
      { title: "Overview", href: "/dashboard/overview" },
      { title: "Analytics", href: "/dashboard/analytics" },
      { title: "Reports", href: "/dashboard/reports" },
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    children: [
      { title: "Overview", href: "/dashboard/overview" },
      { title: "Analytics", href: "/dashboard/analytics" },
      { title: "Reports", href: "/dashboard/reports" },
    ],
  },
];

export function AppSidebar() {
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
              {sidebarItems.map((items, index) =>
                items.children ? (
                  <Collapsible
                    key={index}
                    defaultOpen
                    className="group"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full flex items-center justify-between hover:bg-gray-100">
                          {items.title}
                          <ChevronRight className="w-4 h-4 text-gray-400 transform transition-transform duration-200 group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {items.children.map((item, idx) => (
                            <SidebarMenuSubItem
                              key={idx}
                              className="w-full hover:bg-gray-100 p-2 rounded-lg"
                            >
                              <Link href={item.href}>{item.title}</Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton>
                      <Link href={items.href || "#"}>{items.title}</Link>
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
            {/* Example range filter */}
            <div className="flex flex-col gap-2 text-sm">
              <label>
                Min: <input type="number" className="border p-1 rounded w-full" />
              </label>
              <label>
                Max: <input type="number" className="border p-1 rounded w-full" />
              </label>
              <button className="mt-2 bg-black text-white p-1 rounded">
                Apply
              </button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      </ScrollArea>
    </Sidebar>
  );
}
