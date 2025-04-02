import { 
  Home,        
  Facebook,    
  Video,       
  Camera,      
  MessageSquare,
  Phone,        
  Menu
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
} from "@/components/ui/sidebar"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Menu items.
const items = [
  {
    title: "Adsense",
    url: "/categories/adsense",
    icon: Home, // Represents a main tool or dashboard
  },
  {
    title: "Facebook",
    url: "/categories/facebook",
    icon: Facebook, // Use Facebook-specific icon if lucide-react has it; otherwise, Mail or a custom icon
  },
  {
    title: "Youtube",
    url: "/categories/youtube",
    icon: Video, // Perfect for video content
  },
  {
    title: "Instagram",
    url: "/categories/instagram",
    icon: Camera, // Represents photography/visual content
  },
  {
    title: "Telegram",
    url: "/categories/telegram",
    icon: MessageSquare, // Matches messaging focus
  },
  {
    title: "Whatsupp", // Corrected to "WhatsApp" in practice
    url: "/categories/whatsupp",
    icon: Phone, // Represents communication (or MessageSquare if preferred)
  },
]

const AppSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  return (
    <Sidebar className={cn("fixed inset-0 left-0 z-50 transition-all duration-300 ease-in-out", isOpen ? "10rem" : "w-16")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Menu className="text-blue-600 font-bold ml-2" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}
                      className={cn(
                        "flex items-center w-full",
                        !isOpen && "justify-center"
                      )}
                    >
                      <item.icon className="text-lg" />
                      <span className={cn("ml-2 text-lg", !isOpen && "hidden")}>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
