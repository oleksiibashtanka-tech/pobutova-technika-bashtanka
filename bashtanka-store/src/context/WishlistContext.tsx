import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';

interface WishlistContextType {
  items: Product[];
  toggle: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
  count: number;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    try {
      const localData = localStorage.getItem('bashtanka_wishlist');
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('bashtanka_wishlist', JSON.stringify(items));
  }, [items]);

  const toggle = (product: Product) => {
    setItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const isInWishlist = (id: number) => items.some(item => item.id === id);
  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider value={{ items, toggle, isInWishlist, count: items.length, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
