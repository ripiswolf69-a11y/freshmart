import { useCartContext } from "../context/CartContext";

// Re-export the cart context hook as useCart for named imports
export function useCart() {
  return useCartContext();
}
