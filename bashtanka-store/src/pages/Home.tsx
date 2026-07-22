import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { Products } from "@/components/Products";
import { Contact } from "@/components/Contact";
import { MapSection } from "@/components/MapSection";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Categories />
      <Products />
      <Contact />
      <MapSection />
    </div>
  );
}