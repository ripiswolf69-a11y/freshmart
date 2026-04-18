import { useQuery } from "@tanstack/react-query";
import { CATEGORIES, PRODUCTS } from "../data/products";
import type { Category, Product } from "../types";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => CATEGORIES,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => PRODUCTS,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useProductsByCategory(slug: string) {
  return useQuery<Product[]>({
    queryKey: ["products", "category", slug],
    queryFn: async () => PRODUCTS.filter((p) => p.category === slug),
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !!slug,
  });
}

export function useProductById(id: string) {
  return useQuery<Product | undefined>({
    queryKey: ["product", id],
    queryFn: async () => PRODUCTS.find((p) => p.id === id),
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !!id,
  });
}

export function useSearchProducts(query: string) {
  return useQuery<Product[]>({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query.trim()) return [];
      const q = query.toLowerCase();
      return PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    },
    staleTime: 30_000,
    enabled: query.trim().length > 0,
  });
}
