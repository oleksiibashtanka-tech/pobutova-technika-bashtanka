import { Link } from "wouter";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, Star } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group flex flex-col bg-card border border-border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-[0_10px_30px_rgba(245,197,24,0.1)] relative">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {product.discount && (
          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            Знижка -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            Новинка
          </span>
        )}
        {product.isBestseller && (
          <span className="bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            Хіт
          </span>
        )}
      </div>

      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
        <button 
          onClick={(e) => { e.preventDefault(); toggle(product); }}
          className={`w-8 h-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border transition-colors ${inWishlist ? 'border-primary text-primary' : 'border-border text-muted-foreground hover:text-primary'}`}
        >
          <Heart size={16} className={inWishlist ? "fill-primary" : ""} />
        </button>
        <div className="flex items-center gap-1.5 bg-background/80 backdrop-blur-sm px-2 py-1 border border-border rounded-full">
          <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-[10px] font-medium uppercase tracking-wider">
            {product.inStock ? 'В наявності' : 'Немає'}
          </span>
        </div>
      </div>

      <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-white/5 p-6 flex items-center justify-center block z-10">
        <img 
          src={product.image} 
          alt={product.name}
          className="max-w-full max-h-full object-contain mix-blend-screen transition-transform duration-700 group-hover:scale-110"
        />
      </Link>

      <div className="p-6 flex flex-col flex-grow z-10 bg-card">
        <Link href={`/catalog?category=${encodeURIComponent(product.category)}`} className="text-xs text-muted-foreground uppercase tracking-wider mb-2 hover:text-primary transition-colors block w-fit">
          {product.category}
        </Link>
        <Link href={`/product/${product.id}`} className="text-lg font-medium leading-snug mb-3 flex-grow hover:text-primary transition-colors block">
          {product.name}
        </Link>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-primary">
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                size={14} 
                className={star <= product.rating ? "fill-primary" : (star - 0.5 <= product.rating ? "fill-primary opacity-50" : "opacity-20")} 
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        <div className="flex flex-col mb-4">
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">₴{product.originalPrice.toLocaleString('uk-UA')}</span>
          )}
          <span className="text-xl font-bold font-heading text-primary">₴{product.price.toLocaleString('uk-UA')}</span>
        </div>

        <div className="flex items-center gap-3 mt-auto">
          <button 
            onClick={() => addToCart(product)}
            className="flex-grow text-sm font-semibold uppercase tracking-wider px-4 py-3 bg-primary text-primary-foreground hover:bg-white hover:text-black transition-colors duration-300"
          >
            В кошик
          </button>
        </div>
      </div>
    </div>
  );
}
