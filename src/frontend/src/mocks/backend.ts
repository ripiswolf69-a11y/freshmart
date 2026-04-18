import type { backendInterface, Cart, CartItem, Product } from "../backend";

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "vegetables-1",
    name: "Organic Roma Tomatoes",
    description: "Plump, sweet roma tomatoes perfect for sauces and salads. Hand-picked at peak ripeness.",
    price: 8.99,
    category: "vegetables",
    unit: "300g",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80",
  },
  {
    id: "vegetables-2",
    name: "Bunch of Kale",
    description: "Nutrient-dense curly kale with robust earthy flavor. Ideal for smoothies and stir-fries.",
    price: 10.0,
    category: "vegetables",
    unit: "200g",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=400&q=80",
  },
  {
    id: "vegetables-3",
    name: "Rainbow Carrots",
    description: "A colorful mix of purple, yellow, and orange carrots. Sweet and crunchy.",
    price: 6.5,
    category: "vegetables",
    unit: "500g",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&q=80",
  },
  {
    id: "vegetables-4",
    name: "Broccoli Crown",
    description: "Fresh-cut broccoli crown with tight green florets. A versatile kitchen staple.",
    price: 4.99,
    category: "vegetables",
    unit: "400g",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&q=80",
  },
  {
    id: "fruits-1",
    name: "Honeycrisp Apples",
    description: "America's favorite apple variety. Explosively crisp with honey-sweet flavor.",
    price: 7.99,
    category: "fruits",
    unit: "kg",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&q=80",
  },
  {
    id: "fruits-2",
    name: "Strawberries",
    description: "Plump, fragrant strawberries at peak ripeness. Perfect for shortcake.",
    price: 6.49,
    category: "fruits",
    unit: "500g",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80",
  },
  {
    id: "fruits-3",
    name: "Cara Cara Oranges",
    description: "Pink-fleshed navels with sweet, low-acid flavor and berry notes.",
    price: 8.99,
    category: "fruits",
    unit: "kg",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&q=80",
  },
  {
    id: "dairy-1",
    name: "Whole Milk (Organic)",
    description: "Creamy USDA organic whole milk from grass-fed cows. Rich in natural vitamins.",
    price: 6.99,
    category: "dairy",
    unit: "half gallon",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80",
  },
  {
    id: "dairy-2",
    name: "Greek Yogurt (Plain)",
    description: "Thick, protein-rich strained Greek yogurt. Naturally tangy.",
    price: 4.99,
    category: "dairy",
    unit: "500g",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80",
  },
  {
    id: "bakery-1",
    name: "San Francisco Sourdough",
    description: "Classic, tangy SF sourdough with crackly crust and airy open crumb.",
    price: 8.99,
    category: "bakery",
    unit: "loaf",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80",
  },
  {
    id: "bakery-2",
    name: "Butter Croissants",
    description: "Flaky, laminated all-butter croissants. Dozens of gossamer layers.",
    price: 4.49,
    category: "bakery",
    unit: "each",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80",
  },
  {
    id: "pantry-1",
    name: "Extra Virgin Olive Oil",
    description: "Cold-pressed Arbequina EVOO with grassy, peppery complexity.",
    price: 16.99,
    category: "pantry",
    unit: "500ml",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80",
  },
  {
    id: "organic-1",
    name: "Organic Baby Spinach",
    description: "Certified organic, tender young spinach leaves. Pre-washed and ready to eat.",
    price: 5.49,
    category: "organic",
    unit: "150g",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80",
  },
  {
    id: "organic-2",
    name: "Organic Blueberries",
    description: "Certified organic blueberries loaded with antioxidants.",
    price: 8.99,
    category: "organic",
    unit: "300g",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=80",
  },
];

const CATEGORIES = ["vegetables", "fruits", "dairy", "bakery", "pantry", "organic"];

let mockCart: { [sessionId: string]: CartItem[] } = {};

export const mockBackend: backendInterface = {
  async addToCart(sessionId: string, productId: string, quantity: bigint): Promise<void> {
    if (!mockCart[sessionId]) mockCart[sessionId] = [];
    const existing = mockCart[sessionId].find((i) => i.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      mockCart[sessionId].push({ productId, quantity });
    }
  },

  async clearCart(sessionId: string): Promise<void> {
    mockCart[sessionId] = [];
  },

  async getAllCategories(): Promise<Array<string>> {
    return CATEGORIES;
  },

  async getCart(sessionId: string): Promise<Cart> {
    return {
      sessionId,
      items: mockCart[sessionId] || [],
    };
  },

  async getProductById(id: string): Promise<Product | null> {
    return SAMPLE_PRODUCTS.find((p) => p.id === id) ?? null;
  },

  async getProductsByCategory(category: string): Promise<Array<Product>> {
    return SAMPLE_PRODUCTS.filter((p) => p.category === category);
  },

  async removeFromCart(sessionId: string, productId: string): Promise<void> {
    if (mockCart[sessionId]) {
      mockCart[sessionId] = mockCart[sessionId].filter((i) => i.productId !== productId);
    }
  },

  async searchProducts(searchQuery: string): Promise<Array<Product>> {
    const q = searchQuery.toLowerCase();
    return SAMPLE_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  },

  async updateCartQuantity(sessionId: string, productId: string, quantity: bigint): Promise<void> {
    if (!mockCart[sessionId]) return;
    const item = mockCart[sessionId].find((i) => i.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
  },
};
