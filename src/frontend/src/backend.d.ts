import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Cart {
    sessionId: string;
    items: Array<CartItem>;
}
export interface CartItem {
    productId: string;
    quantity: bigint;
}
export interface Product {
    id: string;
    inStock: boolean;
    name: string;
    unit: string;
    description: string;
    imageUrl: string;
    category: string;
    price: number;
}
export interface backendInterface {
    addToCart(sessionId: string, productId: string, quantity: bigint): Promise<void>;
    clearCart(sessionId: string): Promise<void>;
    getAllCategories(): Promise<Array<string>>;
    getCart(sessionId: string): Promise<Cart>;
    getProductById(id: string): Promise<Product | null>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    removeFromCart(sessionId: string, productId: string): Promise<void>;
    searchProducts(searchQuery: string): Promise<Array<Product>>;
    updateCartQuantity(sessionId: string, productId: string, quantity: bigint): Promise<void>;
}
