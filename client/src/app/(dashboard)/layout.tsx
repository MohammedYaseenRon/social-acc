"use client";
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import SecondNavbar from '@/components/SecondNavbar';
import AppSidebar from '@/components/Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react'

const layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className='h-full w-full'>
            <Navbar />
            <div className="hidden lg:block">
                <SecondNavbar />
            </div>
            <SidebarProvider>
                <AppSidebar />
                <main className={cn('h-full flex w-full flex-col pt-16 transition-all duration-300',"lg:ml-16")}
                    style={{marginLeft: "calc(var(--sidebar-width, 4rem))",}}
                >
                    {children}
                </main>
            </SidebarProvider>
        </div>
    )
}

export default layout