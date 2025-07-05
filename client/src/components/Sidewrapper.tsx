'use client';

import { usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/Sidebar';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Category } from '@/state/types';
import { Menu } from 'lucide-react';

export default function SidebarWrapper({ categories }: { categories: Category[] }) {
    const pathname = usePathname();
    const hideSidebar = /^\/products\/[^\/]+$/.test(pathname); // Hide on /products/[slug]

    if (hideSidebar) return null;

    return (
        <div>
            <AppSidebar categories={categories} />
        </div>
    );
}
