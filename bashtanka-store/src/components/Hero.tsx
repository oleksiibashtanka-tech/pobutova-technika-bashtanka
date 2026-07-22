import { motion } from "framer-motion";
import heroImg from "@assets/hero.jpg";

export function Hero() {
  const handleCtaClick = () => {
    const el = document.querySelector("#products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative h-[100dvh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-background/40 z-10" />
        <img 
          src={heroImg} 
          alt="Сучасна кухня" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-20 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-foreground leading-[1.1] mb-6">
              Побутова техніка <br />
              <span className="text-primary">для вашого дому</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-foreground/80 font-medium mb-10 max-w-xl"
          >
            Якість. Надійність. Баштанка.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              onClick={handleCtaClick}
              className="px-8 py-4 bg-primary text-primary-foreground text-lg font-bold uppercase tracking-widest hover:bg-white hover:text-background transition-all duration-300 shadow-[0_0_20px_rgba(245,197,24,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              Переглянути товари
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Гортайте вниз</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[2px] h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
