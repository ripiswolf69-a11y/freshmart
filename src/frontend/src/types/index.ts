export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  unit: string;
  inStock: boolean;
  imageUrl: string;
  badge?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  imageUrl: string;
  productCount: number;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}
