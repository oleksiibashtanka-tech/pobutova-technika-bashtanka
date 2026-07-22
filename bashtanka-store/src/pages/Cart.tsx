import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";

export default function Cart() {
  const { items, updateQty, removeFromCart, total, clearCart } = useCart();
  const [, setLocation] = useLocation();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg">
        <div className="w-24 h-24 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart size={40} className="text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold font-heading uppercase tracking-wide mb-4">Кошик порожній</h1>
        <p className="text-muted-foreground mb-8 text-lg">Ви ще не додали жодного товару до кошика.</p>
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
      <h1 className="text-3xl font-bold font-heading uppercase tracking-wide mb-8">Оформлення кошика</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-card border border-border p-6 mb-6">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border/50 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-6">Товар</div>
              <div className="col-span-2 text-center">Ціна</div>
              <div className="col-span-2 text-center">Кількість</div>
              <div className="col-span-2 text-right">Сума</div>
            </div>

            <div className="divide-y divide-border/50">
              {items.map((item) => {
                const finalPrice = item.product.discount 
                  ? item.product.price * (1 - item.product.discount / 100) 
                  : item.product.price;

                return (
                  <div key={item.product.id} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center relative">
                    <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                      <Link href={`/product/${item.product.id}`} className="w-24 h-24 bg-white/5 border border-border/50 p-2 shrink-0 group block">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-contain mix-blend-screen transition-transform group-hover:scale-110" 
                        />
                      </Link>
                      <div>
                        <p className="text-xs text-primary uppercase tracking-wider mb-1">{item.product.brand}</p>
                        <Link href={`/product/${item.product.id}`} className="text-white font-medium hover:text-primary transition-colors block line-clamp-2">
                          {item.product.name}
                        </Link>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 md:text-center text-muted-foreground">
                      <span className="md:hidden mr-2">Ціна:</span>
                      ₴{finalPrice.toLocaleString('uk-UA')}
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                      <div className="flex items-center border border-border bg-background">
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                          onClick={() => updateQty(item.product.id, item.quantity - 1)}
                        >-</button>
                        <div className="w-8 h-8 flex items-center justify-center font-bold text-sm border-x border-border">
                          {item.quantity}
                        </div>
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                          onClick={() => updateQty(item.product.id, item.quantity + 1)}
                        >+</button>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 md:text-right font-bold text-primary flex justify-between items-center">
                      <span className="md:hidden text-muted-foreground font-normal">Сума:</span>
                      ₴{(finalPrice * item.quantity).toLocaleString('uk-UA')}
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="md:absolute md:top-6 md:-right-2 text-muted-foreground hover:text-red-500 transition-colors p-2"
                        title="Видалити"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="pt-6 flex justify-between items-center">
              <Link href="/catalog" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
                ← Продовжити покупки
              </Link>
              <button 
                onClick={clearCart}
                className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-2"
              >
                <Trash2 size={14} /> Очистити кошик
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-card border border-border p-8 sticky top-24">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6 pb-4 border-b border-border/50">Ваше замовлення</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Товари ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span>₴{total.toLocaleString('uk-UA')}</span>
              </div>
              <div className="flex justify-between text-muted-foreground pb-4 border-b border-border/50">
                <span>Доставка</span>
                <span>За тарифами перевізника</span>
              </div>
              <div className="flex justify-between items-end pt-2">
                <span className="text-lg font-medium text-white">Всього до сплати</span>
                <span className="text-3xl font-bold font-heading text-primary">₴{total.toLocaleString('uk-UA')}</span>
              </div>
            </div>

            <button 
              onClick={() => setLocation('/checkout')}
              className="w-full py-4 bg-primary text-black font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              Оформити замовлення <ArrowRight size={18} />
            </button>
            
            <p className="text-xs text-muted-foreground text-center mt-4">
              Підтверджуючи замовлення, ви погоджуєтесь з умовами користувацької угоди.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}