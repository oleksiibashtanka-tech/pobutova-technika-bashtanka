import { useParams, Link } from "wouter";
import { getProductById, getRelatedProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";
import { Heart, Star, ShoppingCart, Check, ChevronRight, Info, Shield, Truck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(Number(id));
  const { addToCart } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("desc"); // desc, specs, reviews
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Товар не знайдено</h1>
        <Link href="/catalog" className="text-primary hover:underline">Повернутися до каталогу</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const related = getRelatedProducts(product.category, product.id);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-primary transition-colors">Головна</Link>
        <ChevronRight size={14} />
        <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
        <ChevronRight size={14} />
        <Link href={`/catalog?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="text-white font-medium">{product.name}</span>
      </div>

      {/* Product Hero */}
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <div className="bg-card border border-border p-8 md:p-16 aspect-square relative flex items-center justify-center group overflow-hidden">
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
              {product.discount && (
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
                  Знижка -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="bg-primary text-black text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
                  Новинка
                </span>
              )}
            </div>
            
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-w-full max-h-full object-contain mix-blend-screen relative z-10 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <p className="text-primary font-medium tracking-widest uppercase mb-2 text-sm">{product.brand}</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-primary">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star} 
                  size={18} 
                  className={star <= product.rating ? "fill-primary" : (star - 0.5 <= product.rating ? "fill-primary opacity-50" : "opacity-20")} 
                />
              ))}
            </div>
            <a href="#reviews" onClick={(e) => { e.preventDefault(); setActiveTab('reviews'); }} className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
              {product.reviewCount} відгуків
            </a>
            <div className="w-px h-4 bg-border" />
            <span className={`text-sm font-medium uppercase tracking-wider flex items-center gap-2 ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
              <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              {product.inStock ? 'В наявності' : 'Немає'}
            </span>
          </div>

          <p className="text-muted-foreground mb-8 text-lg">{product.shortDesc}</p>

          <div className="flex flex-col mb-8 p-6 bg-card border border-border">
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through mb-1">₴{product.originalPrice.toLocaleString('uk-UA')}</span>
            )}
            <span className="text-4xl font-bold font-heading text-primary">₴{product.price.toLocaleString('uk-UA')}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-border bg-card">
              <button 
                className="w-12 h-12 flex items-center justify-center text-xl hover:text-primary transition-colors"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >-</button>
              <div className="w-12 h-12 flex items-center justify-center font-bold text-lg border-x border-border">
                {qty}
              </div>
              <button 
                className="w-12 h-12 flex items-center justify-center text-xl hover:text-primary transition-colors"
                onClick={() => setQty(qty + 1)}
              >+</button>
            </div>
            
            <button 
              onClick={handleAdd}
              className={`flex-grow flex items-center justify-center gap-2 h-12 font-bold uppercase tracking-wider transition-all duration-300 ${added ? 'bg-green-500 text-white' : 'bg-primary text-black hover:bg-white'}`}
            >
              {added ? (
                <><Check size={20} /> Додано</>
              ) : (
                <><ShoppingCart size={20} /> До кошика</>
              )}
            </button>
            
            <button 
              onClick={() => toggle(product)}
              className={`w-12 h-12 flex items-center justify-center border transition-colors ${inWishlist ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground bg-card hover:text-primary hover:border-primary'}`}
            >
              <Heart size={20} className={inWishlist ? "fill-primary" : ""} />
            </button>
          </div>

          {/* Quick info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border/50">
            <div className="flex gap-3">
              <Shield className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <p className="font-semibold text-sm mb-1 text-white">Офіційна гарантія</p>
                <p className="text-xs text-muted-foreground">Від виробника на 12 міс.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Truck className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <p className="font-semibold text-sm mb-1 text-white">Доставка</p>
                <p className="text-xs text-muted-foreground">Нова Пошта, Укрпошта, Самовивіз</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex overflow-x-auto border-b border-border mb-8 scrollbar-hide">
          <button 
            className={`px-8 py-4 font-semibold uppercase tracking-wider text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'desc' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-white'}`}
            onClick={() => setActiveTab('desc')}
          >
            Опис
          </button>
          <button 
            className={`px-8 py-4 font-semibold uppercase tracking-wider text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-white'}`}
            onClick={() => setActiveTab('specs')}
          >
            Характеристики
          </button>
          <button 
            className={`px-8 py-4 font-semibold uppercase tracking-wider text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-white'}`}
            onClick={() => setActiveTab('reviews')}
            id="reviews"
          >
            Відгуки ({product.reviewCount})
          </button>
        </div>

        <div className="bg-card border border-border p-8">
          {activeTab === 'desc' && (
            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p className="text-lg mb-6">{product.shortDesc}</p>
              <p>Обираючи техніку {product.brand}, ви отримуєте найвищу якість та надійність. Дана модель розроблена з урахуванням сучасних стандартів енергоефективності та зручності використання.</p>
              <p>Магазин "Побутова Техніка Баштанка" гарантує оригінальність продукції та забезпечує повну сервісну підтримку.</p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div key={key} className={`flex py-4 ${i !== 0 && i !== 1 ? 'border-t border-border/50' : ''}`}>
                  <span className="w-1/2 text-muted-foreground">{key}</span>
                  <span className="w-1/2 font-medium text-white">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center gap-6 mb-10 pb-10 border-b border-border">
                <div className="text-center">
                  <span className="text-5xl font-bold text-primary font-heading leading-none">{product.rating}</span>
                  <div className="flex text-primary justify-center mt-2 mb-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={14} className={star <= product.rating ? "fill-primary" : "opacity-20"} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{product.reviewCount} відгуків</span>
                </div>
              </div>

              <div className="space-y-8">
                {product.reviews.map(review => (
                  <div key={review.id} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary border border-primary/30 flex items-center justify-center font-bold text-lg shrink-0">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-white">{review.author}</span>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex text-primary mb-3">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} size={12} className={star <= review.rating ? "fill-primary" : "opacity-20"} />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold font-heading uppercase tracking-wide">Схожі товари</h2>
            <div className="h-px bg-border flex-grow" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}