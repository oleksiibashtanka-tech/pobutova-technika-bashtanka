import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { products, getAllBrands } from "@/data/products";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function Catalog() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const initialSearch = searchParams.get('search') || "";
  const initialCategory = searchParams.get('category');
  
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [saleOnly, setSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState("price_asc");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const allCategories = Array.from(new Set(products.map(p => p.category))).sort();
  const allBrands = getAllBrands();

  // Filter products
  let filtered = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
    if (inStockOnly && !p.inStock) return false;
    if (saleOnly && !p.discount) return false;
    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
    const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
    
    if (sortBy === "price_asc") return priceA - priceB;
    if (sortBy === "price_desc") return priceB - priceA;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setInStockOnly(false);
    setSaleOnly(false);
    setSearch("");
    setLocation('/catalog');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold font-heading uppercase tracking-wide">Каталог</h1>
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-border bg-card text-white hover:text-primary transition-colors"
          >
            <Filter size={18} />
            Фільтри
          </button>
        </div>

        {/* Sidebar Filters */}
        <div className={`w-full md:w-[280px] shrink-0 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-card border border-border p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
              <h2 className="text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-primary" />
                Фільтри
              </h2>
              <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Скинути
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4 uppercase tracking-wider text-sm text-white/80">Категорії</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {allCategories.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-primary border-primary' : 'border-muted-foreground group-hover:border-primary'}`}>
                      {selectedCategories.includes(cat) && <div className="w-2 h-2 bg-black" />}
                    </div>
                    <span className={`text-sm transition-colors ${selectedCategories.includes(cat) ? 'text-white font-medium' : 'text-muted-foreground group-hover:text-white'}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4 uppercase tracking-wider text-sm text-white/80">Бренди</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {allBrands.map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-primary border-primary' : 'border-muted-foreground group-hover:border-primary'}`}>
                      {selectedBrands.includes(brand) && <div className="w-2 h-2 bg-black" />}
                    </div>
                    <span className={`text-sm transition-colors ${selectedBrands.includes(brand) ? 'text-white font-medium' : 'text-muted-foreground group-hover:text-white'}`}>
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">В наявності</span>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${inStockOnly ? 'bg-primary' : 'bg-muted'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-black rounded-full transition-all ${inStockOnly ? 'left-6' : 'left-1'}`} />
                </div>
                {/* Hidden actual checkbox for accessibility if needed, or just standard React state */}
                <input type="checkbox" className="hidden" checked={inStockOnly} onChange={() => setInStockOnly(!inStockOnly)} />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">Тільки зі знижкою</span>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${saleOnly ? 'bg-primary' : 'bg-muted'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-black rounded-full transition-all ${saleOnly ? 'left-6' : 'left-1'}`} />
                </div>
                <input type="checkbox" className="hidden" checked={saleOnly} onChange={() => setSaleOnly(!saleOnly)} />
              </label>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold font-heading uppercase tracking-wide hidden md:block mb-2">Каталог</h1>
              <p className="text-muted-foreground">Знайдено <span className="text-primary font-bold">{filtered.length}</span> товарів</p>
            </div>

            <div className="relative">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-card border border-border px-4 py-3 pr-10 text-white font-medium focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                <option value="price_asc">За ціною (зрост.)</option>
                <option value="price_desc">За ціною (спад.)</option>
                <option value="rating">За рейтингом</option>
                <option value="name">За назвою</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border p-12 text-center flex flex-col items-center justify-center">
              <Filter size={48} className="text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-bold uppercase tracking-wide mb-2">Товарів не знайдено</h3>
              <p className="text-muted-foreground mb-6">Спробуйте змінити критерії пошуку або скинути фільтри.</p>
              <button 
                onClick={clearFilters}
                className="px-6 py-3 bg-primary text-black font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                Скинути фільтри
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}