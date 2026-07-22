import { motion } from "framer-motion";

export function MapSection() {
  return (
    <section className="bg-background py-0">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full border-y-4 border-primary"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664.123456789!2d32.437860!3d47.414280!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDI0JzUxLjQiTiAzMsKwMjYnMTYuMyJF!5e0!3m2!1suk!2sua!4v1621234567890" 
          width="100%" 
          height="400" 
          style={{ border: 0, filter: "grayscale(100%) invert(100%) contrast(85%)" }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Карта проїзду до магазину Побутова Техніка Баштанка"
          className="block"
        />
      </motion.div>
    </section>
  );
}
