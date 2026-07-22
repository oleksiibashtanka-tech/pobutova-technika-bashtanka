import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Heart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useLocation();
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Головна", href: "/" },
    { name: "Каталог", href: "/catalog" },
    { name: "Контакти", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-heading font-bold text-foreground flex items-center gap-2 group">
          Побутова Техніка <span className="text-primary group-hover:text-primary/80 transition-colors">Баштанка</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 ml-4 border-l border-border pl-8">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-foreground hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <Link href="/wishlist" className="text-foreground hover:text-primary transition-colors relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="text-foreground hover:text-primary transition-colors relative">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Toggle & Icons */}
        <div className="md:hidden flex items-center gap-4">
          <Link href="/cart" className="text-foreground hover:text-primary transition-colors relative">
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Search Bar Dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-card border-b border-border p-4 shadow-xl"
          >
            <div className="container mx-auto px-4 md:px-8">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Пошук товарів..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow bg-background border border-border px-4 py-3 text-white focus:outline-none focus:border-primary"
                  autoFocus
                />
                <button type="submit" className="bg-primary text-black px-6 py-3 font-bold uppercase tracking-wider">
                  Знайти
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden absolute top-full left-0 right-0"
          >
            <div className="flex flex-col px-4 py-6 gap-6">
              <form onSubmit={handleSearch} className="flex items-center gap-2 mb-2">
                <input 
                  type="text" 
                  placeholder="Пошук..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow bg-card border border-border px-4 py-3 text-white focus:outline-none focus:border-primary"
                />
                <button type="submit" className="bg-primary text-black px-4 py-3">
                  <Search size={20} />
                </button>
              </form>
              
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground hover:text-primary transition-colors uppercase tracking-widest block">
                  {link.name}
                </Link>
              ))}
              <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground hover:text-primary transition-colors uppercase tracking-widest flex items-center justify-between">
                Список бажань
                <span className="bg-card px-2 py-1 text-xs">{wishlistCount}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
