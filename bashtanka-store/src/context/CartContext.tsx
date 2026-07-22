import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const localData = localStorage.getItem('bashtanka_cart');
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('bashtanka_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (id: number) => setItems(prev => prev.filter(i => i.product.id !== id));
  
  const updateQty = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(i => i.product.id === id ? { ...i, quantity } : i));
  };
  
  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => {
    const price = item.product.discount 
      ? item.product.price * (1 - item.product.discount / 100) 
      : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
