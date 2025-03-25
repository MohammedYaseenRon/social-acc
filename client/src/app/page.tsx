import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SecondNavbar from "@/components/SecondNavbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="hidden lg:block">
      <SecondNavbar />
      </div>
      <Hero />
    </div>
  );
}
