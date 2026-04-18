import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  LayoutGrid,
  Search,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Breadcrumb } from "../components/Breadcrumb";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
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
import { useSearchProducts } from "../hooks/useProducts";
import type { Product } from "../types";

type SortKey = "default" | "price-asc" | "price-desc" | "name-asc";

function SearchResultCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { addItem } = useCart();
  const category = CATEGORIES.find((c) => c.slug === product.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.5) }}
    >
      <Card
        className="product-card group h-full"
        data-ocid={`search.result_card.${index + 1}`}
      >
        <Link to="/product/$id" params={{ id: product.id }} className="block">
          <div className="aspect-square bg-muted/40 overflow-hidden relative">
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
              <span className="absolute top-2 left-2 badge-organic">
                {product.badge}
              </span>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </Link>
        <CardContent className="p-4">
          <Link to="/product/$id" params={{ id: product.id }}>
            <h3 className="font-display font-semibold text-sm text-foreground hover:text-primary transition-smooth line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <Link
              to="/category/$slug"
              params={{ slug: product.category }}
              data-ocid={`search.category_badge.${index + 1}`}
            >
              <Badge
                variant="secondary"
                className="text-[10px] py-0 px-1.5 cursor-pointer hover:bg-primary/10 hover:text-primary transition-smooth"
              >
                {category?.icon} {category?.name ?? product.category}
              </Badge>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{product.unit}</p>
          <div className="flex items-center justify-between mt-3 gap-2">
            <span className="font-display text-base font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              onClick={() => addItem(product)}
              disabled={!product.inStock}
              className="text-xs gap-1 flex-shrink-0"
              data-ocid={`search.add_to_cart.${index + 1}`}
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function SearchPage() {
  const { q } = useSearch({ from: "/search" });
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(q ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("default");

  const { data: rawResults, isLoading } = useSearchProducts(q ?? "");

  useEffect(() => {
    setInputValue(q ?? "");
    setSelectedCategories([]);
    setSort("default");
  }, [q]);

  const results = useMemo(() => {
    let list = rawResults ?? [];
    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }
    return [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [rawResults, selectedCategories, sort]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      void navigate({ to: "/search", search: { q: inputValue.trim() } });
    }
  };

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      void navigate({ to: "/" });
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Page header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-3">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth"
              data-ocid="search.back_button"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          </div>
          <Breadcrumb items={[{ label: "Search Results" }]} />

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-3 mb-4">
            {q ? "Search Results" : "Search Products"}
          </h1>

          {/* Search form */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search products, categories…"
                className="pl-10"
                data-ocid="search.search_input"
              />
            </div>
            <Button type="submit" data-ocid="search.search_button">
              Search
            </Button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results layout */}
        {q ? (
          <div className="flex gap-8">
            {/* Sidebar filters */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="bg-card rounded-xl border border-border p-5 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <h2 className="font-display font-semibold text-sm text-foreground">
                    Filter by Category
                  </h2>
                </div>
                <ul className="space-y-2.5" data-ocid="search.category_filters">
                  {CATEGORIES.map((cat) => {
                    const countInResults = (rawResults ?? []).filter(
                      (p) => p.category === cat.slug,
                    ).length;
                    const checked = selectedCategories.includes(cat.slug);
                    return (
                      <li key={cat.id}>
                        <label className="flex items-center justify-between gap-2 cursor-pointer group">
                          <span className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleCategory(cat.slug)}
                              className="accent-primary h-3.5 w-3.5 rounded"
                              data-ocid={`search.filter.${cat.slug}`}
                            />
                            <span className="text-sm text-foreground group-hover:text-primary transition-smooth">
                              {cat.icon} {cat.name}
                            </span>
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {countInResults}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
                {selectedCategories.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategories([])}
                    className="mt-4 text-xs text-primary hover:underline"
                    data-ocid="search.clear_filters_button"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </aside>

            {/* Main results area */}
            <div className="flex-1 min-w-0">
              {/* Mobile category filter chips */}
              <div className="flex flex-wrap gap-2 mb-4 lg:hidden">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.slug)}
                    className={
                      selectedCategories.includes(cat.slug)
                        ? "text-xs px-3 py-1.5 rounded-full border transition-smooth bg-primary text-primary-foreground border-primary"
                        : "text-xs px-3 py-1.5 rounded-full border transition-smooth bg-card border-border text-foreground hover:border-primary/40"
                    }
                    data-ocid={`search.mobile_filter.${cat.slug}`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>

              {/* Results count + sort bar */}
              {!isLoading && (
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <p
                    className="text-sm text-muted-foreground"
                    data-ocid="search.results_count"
                  >
                    <span className="font-semibold text-foreground">
                      {results.length}
                    </span>{" "}
                    result{results.length !== 1 ? "s" : ""} for{" "}
                    <span className="font-semibold text-foreground">"{q}"</span>
                    {selectedCategories.length > 0 && (
                      <span className="text-muted-foreground">
                        {" "}
                        · filtered by{" "}
                        {selectedCategories
                          .map(
                            (s) =>
                              CATEGORIES.find((c) => c.slug === s)?.name ?? s,
                          )
                          .join(", ")}
                      </span>
                    )}
                  </p>
                  <Select
                    value={sort}
                    onValueChange={(v) => setSort(v as SortKey)}
                  >
                    <SelectTrigger
                      className="w-44"
                      data-ocid="search.sort_select"
                    >
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Featured</SelectItem>
                      <SelectItem value="price-asc">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="name-asc">Name: A–Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Loading skeleton */}
              {isLoading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
                    <Skeleton key={k} className="h-64 rounded-xl" />
                  ))}
                </div>
              )}

              {/* No results */}
              {!isLoading && results.length === 0 && (
                <div
                  className="py-20 text-center"
                  data-ocid="search.no_results_state"
                >
                  <p className="text-5xl mb-4">🔍</p>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    No results for "{q}"
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    {selectedCategories.length > 0
                      ? "Try removing category filters or searching with different terms."
                      : "Check the spelling, or try a more general keyword."}
                  </p>
                  <div className="mb-8">
                    <p className="text-sm font-medium text-foreground mb-3">
                      Browse categories instead:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          to="/category/$slug"
                          params={{ slug: cat.slug }}
                          data-ocid={`search.empty_category_link.${cat.slug}`}
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
                  {selectedCategories.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setSelectedCategories([])}
                      data-ocid="search.clear_filters_button"
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              )}

              {/* Results grid */}
              {!isLoading && results.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {results.map((product, i) => (
                    <SearchResultCard
                      key={product.id}
                      product={product}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* No query state */
          <div className="py-20 text-center" data-ocid="search.empty_state">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Search className="h-9 w-9 text-primary opacity-70" />
            </div>
            <p className="font-display text-2xl font-semibold text-foreground mb-2">
              Search FreshMart
            </p>
            <p className="text-muted-foreground mb-10 max-w-sm mx-auto">
              Type a product name, ingredient, or category to find exactly what
              you need.
            </p>
            <div>
              <p className="text-sm font-medium text-foreground mb-3 flex items-center justify-center gap-2">
                <LayoutGrid className="h-4 w-4 text-primary" />
                Or browse by category
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to="/category/$slug"
                    params={{ slug: cat.slug }}
                    data-ocid={`search.browse_category.${cat.slug}`}
                  >
                    <Badge
                      variant="outline"
                      className="text-sm py-2 px-4 cursor-pointer hover:bg-primary/5 hover:border-primary/40 transition-smooth"
                    >
                      {cat.icon} {cat.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
