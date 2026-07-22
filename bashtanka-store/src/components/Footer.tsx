import { FaTelegramPlane, FaTiktok, FaViber } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] border-t border-border/30 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div className="text-center md:text-left">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
              className="text-2xl font-heading font-bold text-foreground inline-block mb-2"
            >
              Побутова Техніка <span className="text-primary">Баштанка</span>
            </a>
            <p className="text-muted-foreground text-sm uppercase tracking-widest">
              Якість. Надійність. Гарантія.
            </p>
          </div>

          <div className="flex gap-6">
            <a 
              href="https://t.me/oleksii070" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Telegram"
            >
              <FaTelegramPlane className="w-6 h-6" />
            </a>
            <a 
              href="https://www.tiktok.com/@technobashtanka" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="TikTok"
            >
              <FaTiktok className="w-6 h-6" />
            </a>
            <a 
              href="viber://chat?number=%2B380980503885" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Viber"
            >
              <FaViber className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-border/30 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
          <p>&copy; {currentYear} Побутова Техніка Баштанка. Всі права захищено.</p>
          <p>м. Баштанка, вул. Промислова, 30а</p>
        </div>
      </div>
    </footer>
  );
}
