import CallToAction from "@/components/CallToAction";
import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import Features from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <Products />
      <CallToAction />
    </div>
  );
}
