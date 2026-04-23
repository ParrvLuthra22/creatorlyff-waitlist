import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#4A9EFF]/30 selection:text-white">
      <Nav />
      <Hero />
      <ProductShowcase />
      <FAQ />
      <Footer />
    </main>
  );
}
