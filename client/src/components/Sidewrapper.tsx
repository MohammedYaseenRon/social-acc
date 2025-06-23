'use client';

import { usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Category } from '@/state/types';

export default function SidebarWrapper({ categories }: { categories: Category[] }) {
    const pathname = usePathname();
    const hideSidebar = /^\/products\/[^\/]+$/.test(pathname); // Hide on /products/[slug]

    if (hideSidebar) return null;

    return (
        <div className='w-[200px]'>
            <SidebarProvider>
                <AppSidebar categories={categories} />
            </SidebarProvider>
        </div>
    );
}
