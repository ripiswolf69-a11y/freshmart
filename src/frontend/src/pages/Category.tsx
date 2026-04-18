import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  SlidersHorizontal,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Breadcrumb } from "../components/Breadcrumb";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Skeleton } from "../components/ui/skeleton";
import { CATEGORIES } from "../data/products";
import { useCart } from "../hooks/useCart";
import { useProductsByCategory } from "../hooks/useProducts";
import type { Product } from "../types";

const PAGE_SIZE = 24;
type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc";

// ── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.46) }}
      className="product-card group flex flex-col h-full"
      data-ocid={`category.product.item.${index + 1}`}
    >
      {/* Image */}
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block"
        data-ocid={`category.product.link.${index + 1}`}
      >
        <div className="relative bg-muted/40 overflow-hidden aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          {product.badge && (
            <span className="absolute top-2 left-2 badge-organic z-10">
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground bg-card px-2 py-1 rounded-full border border-border">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3 gap-1">
        <p className="text-xs text-muted-foreground">{product.unit}</p>
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 hover:text-primary transition-smooth min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-display font-bold text-primary text-base">
            ${product.price.toFixed(2)}
          </span>
          {product.inStock ? (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 border-primary/30 text-primary"
            >
              In Stock
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 border-border text-muted-foreground"
            >
              Out of Stock
            </Badge>
          )}
        </div>
      </div>

      {/* Add to Cart */}
      <div className="px-3 pb-3">
        <Button
          size="sm"
          className="w-full text-xs transition-smooth"
          variant={added ? "outline" : "default"}
          disabled={!product.inStock}
          onClick={handleAdd}
          data-ocid={`category.add_to_cart.${index + 1}`}
        >
          {added ? (
            <>
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}

// ── Skeleton Grid ─────────────────────────────────────────────────────────────

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: 12 }, (_, i) => `skel-${i}`).map((key) => (
        <div
          key={key}
          className="bg-card rounded-xl border border-border overflow-hidden"
          data-ocid="category.loading_state"
        >
          <Skeleton className="aspect-square w-full" />
          <div className="p-3 space-y-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex justify-between items-center pt-1">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-14" />
            </div>
          </div>
          <div className="px-3 pb-3">
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Category() {
  const { slug } = useParams({ from: "/category/$slug" });
  const { data: products, isLoading } = useProductsByCategory(slug);
  const [sort, setSort] = useState<SortKey>("featured");
  const [page, setPage] = useState(1);

  const category = CATEGORIES.find((c) => c.slug === slug);

  const sorted = useMemo(() => {
    const list = [...(products ?? [])];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [products, sort]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const pageProducts = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSort(value: string) {
    setSort(value as SortKey);
    setPage(1);
  }

  function handlePageChange(next: number) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const inStockCount = (products ?? []).filter((p) => p.inStock).length;
  const outOfStockCount = (products ?? []).length - inStockCount;
  const displayName =
    category?.name ?? slug.charAt(0).toUpperCase() + slug.slice(1);

  // Pagination page numbers with ellipsis
  const pageNumbers = useMemo(() => {
    const nums = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
      (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
    );
    return nums.reduce<(number | "…")[]>((acc, p, idx, arr) => {
      if (
        idx > 0 &&
        typeof arr[idx - 1] === "number" &&
        (arr[idx - 1] as number) < p - 1
      ) {
        acc.push("…");
      }
      acc.push(p);
      return acc;
    }, []);
  }, [totalPages, page]);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Breadcrumb bar ── */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth shrink-0"
            aria-label="Back to Home"
            data-ocid="category.back_button"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline font-medium">Back</span>
          </Link>
          <span className="h-4 w-px bg-border" />
          <Breadcrumb items={[{ label: displayName }]} />
        </div>
      </div>

      {/* ── Category Hero ── */}
      <div className="relative overflow-hidden" style={{ minHeight: 220 }}>
        {category?.imageUrl && (
          <>
            <img
              src={category.imageUrl}
              alt={displayName}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/92 via-background/65 to-background/10" />
          </>
        )}
        {!category?.imageUrl && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-accent/8" />
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3">
              {category?.icon && (
                <span className="text-4xl" role="img" aria-label={displayName}>
                  {category.icon}
                </span>
              )}
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                {displayName}
              </h1>
            </div>

            {category?.description && (
              <p className="text-muted-foreground max-w-lg text-sm sm:text-base leading-relaxed">
                {category.description}
              </p>
            )}

            {/* Stats row */}
            <div className="flex items-center flex-wrap gap-x-5 gap-y-2 pt-1">
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {products?.length ?? category?.productCount ?? 0}
                </span>{" "}
                products
              </span>
              <span className="flex items-center gap-1 text-sm text-primary font-medium">
                <CheckCircle className="h-3.5 w-3.5" />
                {inStockCount} in stock
              </span>
              {outOfStockCount > 0 && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <XCircle className="h-3.5 w-3.5" />
                  {outOfStockCount} unavailable
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Products section ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            {isLoading ? (
              <Skeleton className="h-4 w-28" />
            ) : (
              <span>
                {sorted.length} products
                {totalPages > 1 && (
                  <span className="text-muted-foreground/70">
                    {" "}
                    — page {page} of {totalPages}
                  </span>
                )}
              </span>
            )}
          </div>

          <div
            className="flex items-center gap-2"
            data-ocid="category.sort_select"
          >
            <label
              htmlFor="sort-select"
              className="text-sm text-muted-foreground whitespace-nowrap"
            >
              Sort:
            </label>
            <Select value={sort} onValueChange={handleSort}>
              <SelectTrigger
                id="sort-select"
                className="w-44 text-sm h-9"
                data-ocid="category.sort_trigger"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A–Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <ProductGridSkeleton />
        ) : pageProducts.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="category.empty_state"
          >
            <span className="text-5xl mb-4">{category?.icon ?? "🔍"}</span>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              No products found
            </h2>
            <p className="text-muted-foreground mb-6">
              This category doesn't have any products yet.
            </p>
            <Link to="/" data-ocid="category.browse_all_link">
              <Button variant="default">Browse All Categories</Button>
            </Link>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <div
              key={`${slug}-${sort}-${page}`}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
            >
              {pageProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col items-center gap-3 mt-10"
          >
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className="flex items-center gap-1"
                data-ocid="category.pagination_prev"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </Button>

              <div className="flex items-center gap-1">
                {pageNumbers.map((item) =>
                  item === "…" ? (
                    <span
                      key={`ellipsis-before-${typeof pageNumbers[pageNumbers.indexOf(item) + 1] === "number" ? pageNumbers[pageNumbers.indexOf(item) + 1] : "end"}`}
                      className="px-1 text-sm text-muted-foreground"
                    >
                      …
                    </span>
                  ) : (
                    <Button
                      key={item}
                      variant={page === item ? "default" : "outline"}
                      size="sm"
                      className="w-9 h-9 p-0 text-sm"
                      onClick={() => handlePageChange(item as number)}
                      data-ocid={`category.pagination.page.${item}`}
                    >
                      {item}
                    </Button>
                  ),
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="flex items-center gap-1"
                data-ocid="category.pagination_next"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Showing {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, sorted.length)} of {sorted.length}{" "}
              products
            </p>
          </motion.div>
        )}

        {/* Other categories */}
        {!isLoading && sorted.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">
              Browse Other Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter((c) => c.slug !== slug).map((cat) => (
                <Link
                  key={cat.id}
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  data-ocid={`category.other_cat.${cat.slug}_link`}
                >
                  <Badge
                    variant="outline"
                    className="text-sm py-1.5 px-3 cursor-pointer hover:bg-primary/5 hover:border-primary/40 transition-smooth"
                  >
                    {cat.icon} {cat.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
