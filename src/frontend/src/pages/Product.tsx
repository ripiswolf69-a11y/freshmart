import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { Breadcrumb } from "../components/Breadcrumb";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { CATEGORIES } from "../data/products";
import { useCart } from "../hooks/useCart";
import { useProductById, useProductsByCategory } from "../hooks/useProducts";
import type { Product } from "../types";

// ─── Product Image ─────────────────────────────────────────────────────────

function ProductHeroImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-muted border border-border flex items-center justify-center">
      {errored ? (
        <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground p-8 text-center select-none">
          <span className="text-7xl">🛒</span>
          <span className="text-sm font-body font-medium">{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

// ─── Quantity Selector ─────────────────────────────────────────────────────

interface QtyProps {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}

function QuantitySelector({ value, onChange, disabled }: QtyProps) {
  const dec = () => onChange(Math.max(1, value - 1));
  const inc = () => onChange(Math.min(99, value + 1));

  return (
    <div
      className="flex items-center border border-input rounded-lg overflow-hidden w-fit"
      data-ocid="product.quantity_selector"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={dec}
        disabled={disabled || value <= 1}
        className="w-10 h-11 flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        data-ocid="product.quantity_dec_button"
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        min={1}
        max={99}
        value={value}
        onChange={(e) => {
          const v = Number.parseInt(e.target.value, 10);
          if (!Number.isNaN(v)) onChange(Math.min(99, Math.max(1, v)));
        }}
        disabled={disabled}
        className="w-14 h-11 text-center text-sm font-semibold bg-background border-x border-input text-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="Quantity"
        data-ocid="product.quantity_input"
      />
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={inc}
        disabled={disabled || value >= 99}
        className="w-10 h-11 flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        data-ocid="product.quantity_inc_button"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

// ─── Related Card ─────────────────────────────────────────────────────────

function RelatedCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addItem(product, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    },
    [addItem, product],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      data-ocid={`product.related.item.${index + 1}`}
    >
      <Link to="/product/$id" params={{ id: product.id }}>
        <Card className="product-card group overflow-hidden h-full">
          <div className="aspect-square bg-muted overflow-hidden">
            {imgError ? (
              <div className="w-full h-full flex items-center justify-center text-4xl bg-muted select-none">
                🛒
              </div>
            ) : (
              <img
                src={product.imageUrl}
                alt={product.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
              />
            )}
          </div>
          <CardContent className="p-3">
            <p className="font-body font-semibold text-sm text-foreground line-clamp-2 leading-snug mb-0.5">
              {product.name}
            </p>
            <p className="text-xs text-muted-foreground mb-2">{product.unit}</p>
            <div className="flex items-center justify-between gap-2">
              <span className="font-display font-bold text-primary text-base">
                ${product.price.toFixed(2)}
              </span>
              <button
                type="button"
                onClick={handleAdd}
                disabled={!product.inStock}
                aria-label={`Add ${product.name} to cart`}
                data-ocid={`product.related.add_button.${index + 1}`}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-smooth
                  ${added ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:opacity-90"}
                  disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {added ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────

function ProductSkeleton() {
  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
      data-ocid="product.loading_state"
    >
      <div className="bg-card border-b border-border -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-3 mb-6">
        <Skeleton className="h-4 w-72" />
      </div>
      <Skeleton className="h-5 w-36 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        <Skeleton className="aspect-square rounded-2xl" />
        <div className="space-y-4 pt-2">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-28" />
          <div className="h-px bg-border" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-11 w-36 rounded-lg" />
            <Skeleton className="h-11 flex-1 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Product Details Info Table ────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const { data: product, isLoading } = useProductById(id);
  const { data: related } = useProductsByCategory(product?.category ?? "");
  const { addItem } = useCart();

  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const categoryInfo = CATEGORIES.find((c) => c.slug === product?.category);
  const categoryName = categoryInfo?.name ?? product?.category ?? "";
  const relatedProducts = (related ?? [])
    .filter((p) => p.id !== id)
    .slice(0, 4);

  const handleAddToCart = useCallback(() => {
    if (!product || !product.inStock) return;
    addItem(product, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [product, qty, addItem]);

  if (isLoading) return <ProductSkeleton />;

  if (!product) {
    return (
      <div
        className="max-w-6xl mx-auto px-4 py-24 text-center"
        data-ocid="product.error_state"
      >
        <p className="text-6xl mb-4">🥦</p>
        <h1 className="font-display text-2xl font-semibold text-foreground mb-2">
          Product Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          This product doesn't exist or may have been removed.
        </p>
        <Button asChild>
          <Link to="/" data-ocid="product.back_home_button">
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Breadcrumb
            items={[
              {
                label: categoryName,
                href: `/category/${product.category}`,
              },
              { label: product.name },
            ]}
          />
          <Link
            to="/category/$slug"
            params={{ slug: product.category }}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth w-fit"
            data-ocid="product.back_button"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {categoryName}
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductHeroImage src={product.imageUrl} alt={product.name} />
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="flex flex-col"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold px-2.5 py-0.5"
                data-ocid="product.category_badge"
              >
                {categoryName}
              </Badge>
              {product.badge && (
                <Badge
                  variant="secondary"
                  className="bg-accent/15 text-foreground border-accent/20 text-xs px-2.5 py-0.5"
                  data-ocid="product.badge"
                >
                  {product.badge}
                </Badge>
              )}
              <Badge
                variant={product.inStock ? "secondary" : "destructive"}
                className={
                  product.inStock
                    ? "bg-green-100 text-green-800 border-green-200 text-xs px-2.5 py-0.5"
                    : "text-xs px-2.5 py-0.5"
                }
                data-ocid="product.stock_badge"
              >
                {product.inStock ? "● In Stock" : "● Out of Stock"}
              </Badge>
            </div>

            {/* Name */}
            <h1
              className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-2"
              data-ocid="product.name"
            >
              {product.name}
            </h1>

            {/* Unit */}
            <p
              className="text-sm text-muted-foreground mb-5"
              data-ocid="product.unit"
            >
              Sold per:{" "}
              <span className="font-semibold text-foreground">
                {product.unit}
              </span>
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-5">
              <span
                className="font-display text-4xl font-bold text-primary"
                data-ocid="product.price"
              >
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">
                / {product.unit}
              </span>
            </div>

            <div className="h-px bg-border mb-5" />

            {/* Description */}
            <p
              className="font-body text-base text-foreground/80 leading-relaxed mb-6"
              data-ocid="product.description"
            >
              {product.description} Carefully sourced from trusted local farms
              and hand-selected for peak freshness. Delivered to your door at
              the height of quality so every meal starts with the best
              ingredients.
            </p>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <QuantitySelector
                value={qty}
                onChange={setQty}
                disabled={!product.inStock}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={addedToCart ? "added" : "add"}
                  initial={{ scale: 0.97, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.97, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 min-w-[160px]"
                >
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    size="lg"
                    className={`w-full h-11 font-semibold gap-2 transition-smooth
                      ${addedToCart ? "bg-green-600 hover:bg-green-700 text-white" : ""}`}
                    data-ocid="product.add_to_cart_button"
                  >
                    {addedToCart ? (
                      <>
                        <Check className="h-4 w-4" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </>
                    )}
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>

            {!product.inStock && (
              <p
                className="text-sm text-destructive font-medium mb-4"
                data-ocid="product.out_of_stock_notice"
              >
                Currently out of stock — check back soon!
              </p>
            )}

            {/* View cart */}
            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth mb-6 w-fit"
              data-ocid="product.view_cart_link"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              View your cart
            </Link>

            {/* Details table */}
            <div className="bg-muted/30 rounded-xl px-4 py-1">
              <InfoRow label="Category" value={categoryName} />
              <InfoRow label="Unit" value={product.unit} />
              <InfoRow
                label="Availability"
                value={product.inStock ? "Available" : "Unavailable"}
              />
              {product.badge && <InfoRow label="Label" value={product.badge} />}
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section
            className="mt-16 pt-10 border-t border-border"
            data-ocid="product.related_section"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                More from {categoryName}
              </h2>
              <Link
                to="/category/$slug"
                params={{ slug: product.category }}
                className="text-sm text-primary font-semibold hover:underline transition-smooth"
                data-ocid="product.view_all_link"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p, i) => (
                <RelatedCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
