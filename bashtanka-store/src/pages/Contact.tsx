import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { FaTelegramPlane, FaTiktok, FaViber } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-card border-b border-border py-16 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-4">
            Контакти
          </h1>
          <div className="h-1 w-16 bg-primary mx-auto" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Left Column: Info */}
          <div className="space-y-8">
            <div className="bg-card border border-border p-8 hover:border-primary/50 transition-colors">
              <h2 className="text-2xl font-bold uppercase tracking-wide mb-8 border-b border-border/50 pb-4">Зв'яжіться з нами</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <a href="tel:0980503885" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-background border border-primary/30 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary/5 transition-all">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Телефон</p>
                    <p className="text-lg font-medium text-white group-hover:text-primary transition-colors">098 050 38 85</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-background border border-primary/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Адреса</p>
                    <p className="text-base font-medium text-white leading-snug">м. Баштанка, вул. Промислова, 30а</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-background border border-primary/30 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Графік роботи</p>
                    <p className="text-sm font-medium text-white mb-1">Пн-Пт: 9:00 – 18:00</p>
                    <p className="text-sm font-medium text-white mb-1">Сб: 9:00 – 15:00</p>
                    <p className="text-sm font-medium text-muted-foreground">Нд: вихідний</p>
                  </div>
                </div>

                <a href="mailto:info@bashtanka.com" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-background border border-primary/30 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary/5 transition-all">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                    <p className="text-base font-medium text-white group-hover:text-primary transition-colors">info@bashtanka.com</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border border-border p-8">
                <h3 className="text-lg font-bold uppercase tracking-wide mb-6">Соціальні мережі</h3>
                <div className="flex gap-4">
                  <a 
                    href="https://t.me/oleksii070" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-background border border-border flex items-center justify-center hover:border-primary hover:text-primary hover:-translate-y-1 transition-all text-white"
                  >
                    <FaTelegramPlane className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://www.tiktok.com/@technobashtanka" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-background border border-border flex items-center justify-center hover:border-primary hover:text-primary hover:-translate-y-1 transition-all text-white"
                  >
                    <FaTiktok className="w-6 h-6" />
                  </a>
                </div>
              </div>

              <div className="bg-primary p-8 flex flex-col justify-center shadow-[0_10px_30px_rgba(245,197,24,0.1)]">
                <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-black">Миттєвий зв'язок</h3>
                <p className="text-black/80 font-medium mb-6 text-sm">Найшвидший спосіб отримати консультацію.</p>
                <a 
                  href="viber://chat?number=%2B380980503885"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-black text-primary font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  <FaViber className="w-5 h-5" />
                  Viber
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="h-full min-h-[450px] bg-card border border-border p-2">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664.123456789!2d32.437860!3d47.414280!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDI0JzUxLjQiTiAzMsKwMjYnMTYuMyJF!5e0!3m2!1suk!2sua!4v1621234567890" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "grayscale(100%) invert(100%) contrast(85%) min-height: 450px" }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта проїзду"
              className="block h-full"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}