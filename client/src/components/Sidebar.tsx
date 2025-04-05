import {
  Home,
  Facebook,
  Video,
  Camera,
  MessageSquare,
  Phone,
  Menu,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

// Menu items
const items = [
  { title: "Adsense", url: "/categories/adsense", icon: Home },
  { title: "Facebook", url: "/categories/facebook", icon: Facebook },
  { title: "Youtube", url: "/categories/youtube", icon: Video },
  { title: "Instagram", url: "/categories/instagram", icon: Camera },
  { title: "Telegram", url: "/categories/telegram", icon: MessageSquare },
  { title: "WhatsApp", url: "/categories/whatsupp", icon: Phone },
];

const AppSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <Sidebar
      className={cn(
        "fixed top-0 left-0 z-50 bg-white  transition-all duration-300",
        isOpen ? "w-48" : "w-14"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center w-full mb-2 px-2 py-2 transition-colors hover:bg-gray-100",
                !isOpen && "justify-center"
              )}
            >
              <Menu className="text-blue-600 ml-2 min-w-[20px]" />
              <span
                className={cn(
                  "ml-2 text-sm whitespace-nowrap overflow-hidden transition-all duration-300",
                  isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                )}
              >
                All Categories
              </span>
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={cn(
                        "flex items-center w-full text-sm p-2 rounded hover:bg-gray-100 transition",
                        !isOpen && "justify-center"
                      )}
                    >

                      <item.icon className="text-blue-600" />
                      <span
                        className={cn(
                          "text-sm transition-all duration-300 ",
                          !isOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
                        )}
                      >
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
