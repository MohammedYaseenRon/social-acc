import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AnimatedLayout from "@/components/AnimateLayout";

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    cache: "no-store" // optional: prevents stale data
  });
  return res.json();
}

export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed or regular Navbar at the top */}
      <Navbar />

      <div className="flex flex-1">
        <SidebarProvider>
          <AppSidebar categories={categories} />

          <div className="flex-1 p-4 bg-gray-50 min-h-screen">
            <AnimatedLayout>
              {/* <SidebarTrigger  className="mt-12"/> */}
              {children}
            </AnimatedLayout>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

