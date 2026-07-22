import { motion } from "framer-motion";
import { Link } from "wouter";
import { Refrigerator, WashingMachine, Microwave, Flame, Tv, Wind, Coffee, Fan, Droplet, ChefHat, Grid3x3 } from "lucide-react";

const categories = [
  { name: "Холодильники", icon: Refrigerator },
  { name: "Пральні машини", icon: WashingMachine },
  { name: "Духові шафи", icon: Grid3x3 },
  { name: "Варильні поверхні", icon: Flame },
  { name: "Телевізори", icon: Tv },
  { name: "Кондиціонери", icon: Wind },
  { name: "Плити", icon: ChefHat },
  { name: "Витяжки", icon: Fan },
  { name: "Бойлери", icon: Droplet },
  { name: "Посудомийні машини", icon: Coffee }, 
  { name: "Мікрохвильові печі", icon: Microwave },
];

export function Categories() {
  return (
    <section id="categories" className="py-24 bg-background border-b border-border/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-4"
          >
            Категорії <span className="text-primary">товарів</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-primary mx-auto"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 justify-center">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.1 }}
              className={i === 10 ? "xl:col-start-3 xl:col-end-5" : ""} // Center the 11th item
            >
              <Link href={`/catalog?category=${encodeURIComponent(cat.name)}`} className="group block h-full">
                <div className="bg-card border border-border p-6 h-full flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_rgba(245,197,24,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <cat.icon className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground group-hover:text-primary transition-colors duration-300 relative z-10" strokeWidth={1.5} />
                  <h3 className="text-xs md:text-sm text-center font-semibold uppercase tracking-wide group-hover:text-white transition-colors duration-300 relative z-10">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
