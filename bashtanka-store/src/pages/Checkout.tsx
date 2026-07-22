import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Link, useLocation } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  if (success) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-xl">
        <div className="w-24 h-24 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-bold font-heading uppercase tracking-wide mb-4 text-white">Дякуємо!</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Ваше замовлення успішно прийнято. Наш менеджер зв'яжеться з вами найближчим часом для підтвердження деталей.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-black font-bold uppercase tracking-wider hover:bg-white transition-colors"
        >
          На головну
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Ваш кошик порожній</h1>
        <button onClick={() => setLocation('/catalog')} className="text-primary underline">Перейти до каталогу</button>
      </div>
    );
  }

  const onSubmit = (data: any) => {
    console.log("Order Data:", data, "Items:", items);
    clearCart();
    setSuccess(true);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-heading uppercase tracking-wide mb-8">Оформлення замовлення</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Контактні дані */}
            <div className="bg-card border border-border p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6 uppercase tracking-wider border-b border-border/50 pb-4">Контактні дані</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">Ім'я та прізвище *</label>
                  <input 
                    {...register("name", { required: "Це поле є обов'язковим" })}
                    className={`w-full bg-background border ${errors.name ? 'border-red-500' : 'border-border'} px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                    placeholder="Іван Іваненко"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">Телефон *</label>
                  <input 
                    {...register("phone", { required: "Це поле є обов'язковим", pattern: { value: /^[0-9+() -]+$/, message: "Невірний формат" } })}
                    className={`w-full bg-background border ${errors.phone ? 'border-red-500' : 'border-border'} px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                    placeholder="+38 (000) 000-00-00"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">Email</label>
                  <input 
                    {...register("email")}
                    className="w-full bg-background border border-border px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Доставка */}
            <div className="bg-card border border-border p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6 uppercase tracking-wider border-b border-border/50 pb-4">Доставка</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <label className="border border-border p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors group">
                  <input type="radio" value="pickup" {...register("delivery", { required: true })} defaultChecked className="text-primary accent-primary w-4 h-4" />
                  <span className="font-medium group-hover:text-primary transition-colors text-center text-sm">Самовивіз з магазину</span>
                </label>
                <label className="border border-border p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors group">
                  <input type="radio" value="novaposhta" {...register("delivery")} className="text-primary accent-primary w-4 h-4" />
                  <span className="font-medium group-hover:text-primary transition-colors text-center text-sm">Нова Пошта</span>
                </label>
                <label className="border border-border p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors group">
                  <input type="radio" value="ukrposhta" {...register("delivery")} className="text-primary accent-primary w-4 h-4" />
                  <span className="font-medium group-hover:text-primary transition-colors text-center text-sm">Укрпошта</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">Місто *</label>
                  <input 
                    {...register("city", { required: "Це поле є обов'язковим" })}
                    className={`w-full bg-background border ${errors.city ? 'border-red-500' : 'border-border'} px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                    placeholder="Київ"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">Відділення / Адреса *</label>
                  <input 
                    {...register("address", { required: "Це поле є обов'язковим" })}
                    className={`w-full bg-background border ${errors.address ? 'border-red-500' : 'border-border'} px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                    placeholder="Відділення №1"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message as string}</p>}
                </div>
              </div>
            </div>

            {/* Оплата */}
            <div className="bg-card border border-border p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6 uppercase tracking-wider border-b border-border/50 pb-4">Оплата</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer p-4 border border-border hover:border-primary transition-colors group">
                  <input type="radio" value="cash" {...register("payment", { required: true })} defaultChecked className="w-4 h-4 accent-primary" />
                  <span className="group-hover:text-white text-muted-foreground transition-colors">Готівка при отриманні</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-4 border border-border hover:border-primary transition-colors group">
                  <input type="radio" value="card" {...register("payment")} className="w-4 h-4 accent-primary" />
                  <span className="group-hover:text-white text-muted-foreground transition-colors">Карткою онлайн</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-4 border border-border hover:border-primary transition-colors group">
                  <input type="radio" value="cod" {...register("payment")} className="w-4 h-4 accent-primary" />
                  <span className="group-hover:text-white text-muted-foreground transition-colors">Накладений платіж (Нова Пошта)</span>
                </label>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm text-muted-foreground uppercase tracking-wider mb-2">Коментар до замовлення</label>
                <textarea 
                  {...register("comment")}
                  rows={4}
                  className="w-full bg-background border border-border px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Додаткова інформація..."
                />
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-card border border-border p-8 sticky top-24">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6 pb-4 border-b border-border/50">Ваше замовлення</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {items.map(item => {
                const finalPrice = item.product.discount ? item.product.price * (1 - item.product.discount/100) : item.product.price;
                return (
                  <div key={item.product.id} className="flex gap-4 border-b border-border/30 pb-4 last:border-0">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-contain bg-white/5 p-1" />
                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-medium line-clamp-2">{item.product.name}</span>
                      <span className="text-xs text-muted-foreground">{item.quantity} шт x ₴{finalPrice.toLocaleString('uk-UA')}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="space-y-4 mb-6 pt-4 border-t border-border/50">
              <div className="flex justify-between text-muted-foreground">
                <span>Товари ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span>₴{total.toLocaleString('uk-UA')}</span>
              </div>
              <div className="flex justify-between items-end pt-2 border-t border-border/50 mt-2">
                <span className="text-lg font-medium text-white">До сплати</span>
                <span className="text-3xl font-bold font-heading text-primary">₴{total.toLocaleString('uk-UA')}</span>
              </div>
            </div>

            <button 
              type="submit"
              form="checkout-form"
              className="w-full py-4 bg-primary text-black font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              Підтвердити замовлення
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}