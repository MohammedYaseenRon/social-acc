import AnimatedLayout from "@/components/AnimateLayout";
import { Category } from "@/state/types";
import SidebarWrapper from "@/components/Sidewrapper";
import CartModal from "@/components/CartModal";
import Header from "@/components/admin/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

async function getCategories(): Promise<Category[]> {
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <SidebarWrapper categories={categories} />
        <div className="flex-1 flex flex-col">
          <Header name="Market place" />
          {/* Main content */}
          <main className="flex-1 p-6">
            <AnimatedLayout>{children}</AnimatedLayout>
          </main>
        </div>

        {/* Cart Modal */}
        <CartModal />
      </div>
    </SidebarProvider>




  );
};

