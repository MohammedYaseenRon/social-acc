import AnimatedLayout from "@/components/AnimateLayout";
import { Category } from "@/state/types";
import SidebarWrapper from "@/components/Sidewrapper";
import CartModal from "@/components/CartModal";
import Header from "@/components/admin/Header";

async function getCategories():Promise<Category[]> {
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
      <Header name="Market Place"/>

      <div className="flex flex-1">
        <SidebarWrapper categories={categories} />
          <div className="flex-1 p-4 bg-gray-50 min-h-screen">
            <AnimatedLayout>
              {children}
            </AnimatedLayout>
          </div>
      </div>
      <CartModal />
    </div>
  );
};

