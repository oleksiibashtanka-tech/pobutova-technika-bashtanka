import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { FaTelegramPlane, FaTiktok, FaViber } from "react-icons/fa";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background border-t border-border/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-4"
            >
              Наші <span className="text-primary">Контакти</span>
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "80px" }}
              viewport={{ once: true }}
              className="h-1 bg-primary mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-8 md:p-12"
            >
              <h3 className="text-2xl font-semibold mb-8 text-white uppercase tracking-wide border-b border-border/50 pb-4">
                Зв'язок з нами
              </h3>
              
              <div className="space-y-8">
                <a href="tel:0980503885" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-background border border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Телефон</p>
                    <p className="text-lg font-medium text-white group-hover:text-primary transition-colors">098 050 38 85</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background border border-primary/30 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Адреса</p>
                    <p className="text-lg font-medium text-white">м. Баштанка, вул. Промислова, 30а</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a 
                    href="https://t.me/oleksii070" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-background border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all text-white"
                  >
                    <FaTelegramPlane className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.tiktok.com/@technobashtanka" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-background border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all text-white"
                  >
                    <FaTiktok className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary p-8 md:p-12 flex flex-col justify-center h-full"
            >
              <h3 className="text-2xl font-semibold mb-6 text-primary-foreground uppercase tracking-wide">
                Швидке замовлення
              </h3>
              <p className="text-primary-foreground/80 font-medium mb-8 text-lg">
                Найшвидший спосіб отримати консультацію або замовити товар — написати нам у Viber.
              </p>
              
              <a 
                href="viber://chat?number=%2B380980503885"
                className="group flex items-center justify-center gap-3 w-full py-4 bg-background text-foreground text-lg font-bold uppercase tracking-widest hover:bg-white hover:text-background transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              >
                <FaViber className="w-6 h-6 text-primary" />
                Написати у Viber
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
