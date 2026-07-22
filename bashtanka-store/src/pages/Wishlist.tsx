import { useWishlist } from "@/context/WishlistContext";
import { Link } from "wouter";
import { Heart, Trash2 } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export default function Wishlist() {
  const { items, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg">
        <div className="w-24 h-24 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart size={40} className="text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold font-heading uppercase tracking-wide mb-4">Список порожній</h1>
        <p className="text-muted-foreground mb-8 text-lg">Додавайте товари в обране, щоб не загубити те, що сподобалось.</p>
        <Link 
          href="/catalog" 
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-black font-bold uppercase tracking-wider hover:bg-white transition-colors"
        >
          Перейти до каталогу
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold font-heading uppercase tracking-wide">
          Список бажань <span className="text-muted-foreground text-xl">({items.length})</span>
        </h1>
        <button 
          onClick={clearWishlist}
          className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-red-500 transition-colors"
        >
          <Trash2 size={16} /> Очистити список
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}