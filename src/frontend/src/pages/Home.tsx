import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { useCart } from "../hooks/useCart";
import type { Category, Product } from "../types";

// ------------------------------------------------------------------
// Category image map (uses generated assets)
// ------------------------------------------------------------------
const CAT_IMAGES: Record<string, string> = {
  vegetables: "/assets/generated/cat-vegetables.dim_400x300.jpg",
  fruits: "/assets/generated/cat-fruits.dim_400x300.jpg",
  dairy: "/assets/generated/cat-dairy.dim_400x300.jpg",
  bakery: "/assets/generated/cat-bakery.dim_400x300.jpg",
  pantry: "/assets/generated/cat-pantry.dim_400x300.jpg",
  organic: "/assets/generated/cat-organic.dim_400x300.jpg",
};

// ------------------------------------------------------------------
// Featured products: first 8 bestsellers
// ------------------------------------------------------------------
const FEATURED_PRODUCTS = PRODUCTS.filter(
  (p) => p.badge === "Bestseller",
).slice(0, 8);

// ------------------------------------------------------------------
// Trust badges
// ------------------------------------------------------------------
const TRUST_BADGES = [
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "On orders above $35",
  },
  {
    icon: ShieldCheck,
    title: "100% Fresh",
    desc: "Guaranteed farm-fresh quality",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "Hassle-free 48h returns",
  },
  {
    icon: ShoppingCart,
    title: "Secure Checkout",
    desc: "SSL-encrypted, safe payments",
  },
];

// ------------------------------------------------------------------
// Sub-components
// ------------------------------------------------------------------
function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  const imageSrc = CAT_IMAGES[cat.slug] ?? "/assets/images/placeholder.svg";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Link
        to="/category/$slug"
        params={{ slug: cat.slug }}
        data-ocid={`home.category_${cat.slug}_link`}
        className="group flex flex-col rounded-xl bg-card border border-border overflow-hidden hover:border-primary/50 hover:shadow-elevated transition-smooth text-center"
      >
        <div className="aspect-[4/3] overflow-hidden bg-muted/30">
          <img
            src={imageSrc}
            alt={cat.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
        </div>
        <div className="p-3 pb-4">
          <span className="text-2xl mb-1 block">{cat.icon}</span>
          <p className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-smooth leading-tight">
            {cat.name}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {cat.productCount} products
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Card
        className="product-card group h-full"
        data-ocid={`home.product_card.${index + 1}`}
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
                <span className="text-sm font-semibold text-muted-foreground">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </Link>
        <CardContent className="p-4">
          <Link to="/product/$id" params={{ id: product.id }}>
            <h3 className="font-display font-semibold text-foreground text-sm leading-tight hover:text-primary transition-smooth line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">{product.unit}</p>
          <div className="flex items-center justify-between mt-3 gap-2">
            <span className="font-display text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              onClick={() => addItem(product)}
              disabled={!product.inStock}
              className="text-xs gap-1 flex-shrink-0"
              data-ocid={`home.add_to_cart.${index + 1}`}
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

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------
export default function Home() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "460px" }}
        data-ocid="home.hero_section"
      >
        {/* Full-width background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-banner.dim_1400x560.jpg')",
          }}
          aria-hidden
        />
        {/* Gradient overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 60%, transparent 100%)",
          }}
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-xl"
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              🌱 Sourced Fresh. Delivered Daily.
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-sm">
              Farm-Fresh Goodness,{" "}
              <span className="text-primary">Delivered</span>
            </h1>
            <p className="mt-4 text-lg text-white/85 max-w-md leading-relaxed">
              Discover premium organic produce and pantry staples sourced
              sustainably for your family.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/category/$slug" params={{ slug: "vegetables" }}>
              <Button
                size="lg"
                className="gap-2 shadow-elevated"
                data-ocid="home.hero_shop_now_button"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/category/$slug" params={{ slug: "organic" }}>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20 hover:text-white"
                data-ocid="home.hero_organic_button"
              >
                Explore Organic
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────── */}
      <section
        className="bg-card border-b border-border"
        data-ocid="home.trust_badges_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.title} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <badge.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {badge.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop by Category ─────────────────────────────────── */}
      <section
        className="section-alt py-16"
        data-ocid="home.categories_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Shop by Category
              </h2>
              <p className="text-muted-foreground mt-1">
                Six fresh categories, 600+ hand-picked products
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ────────────────────────────────── */}
      <section
        className="py-16 bg-background"
        data-ocid="home.featured_products_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Bestsellers
              </h2>
              <p className="text-muted-foreground mt-1">
                Our most-loved products, hand-picked for you
              </p>
            </div>
            <Link
              to="/category/$slug"
              params={{ slug: "vegetables" }}
              className="text-sm text-primary font-semibold hover:underline flex items-center gap-1 transition-smooth"
              data-ocid="home.view_all_link"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {FEATURED_PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo Banner: Fresh Delivered Daily ──────────────── */}
      <section
        className="py-16 bg-primary"
        data-ocid="home.promo_banner_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-center md:text-left">
              <p className="text-primary-foreground/80 text-sm font-semibold uppercase tracking-widest mb-2">
                Our Promise
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground leading-tight">
                Fresh Delivered Daily
              </h2>
              <p className="mt-3 text-primary-foreground/80 max-w-md text-base leading-relaxed">
                Every morning we source directly from local farms and artisan
                producers. Freshness isn't a guarantee — it's our daily
                commitment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link to="/category/$slug" params={{ slug: "vegetables" }}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 font-semibold"
                  data-ocid="home.promo_shop_vegetables_button"
                >
                  🥦 Shop Vegetables
                </Button>
              </Link>
              <Link to="/category/$slug" params={{ slug: "fruits" }}>
                <Button
                  size="lg"
                  className="gap-2 bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90"
                  data-ocid="home.promo_shop_fruits_button"
                >
                  🍎 Shop Fruits
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA grid ──────────────────────────────────── */}
      <section className="section-alt py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl font-bold text-foreground">
              Explore Every Aisle
            </h2>
            <p className="text-muted-foreground mt-2">
              Browse all 600+ products across 6 fresh categories
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  data-ocid={`home.bottom_category_${cat.slug}_button`}
                  className="group block rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-elevated transition-smooth bg-card"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted/30">
                    <img
                      src={
                        CAT_IMAGES[cat.slug] ?? "/assets/images/placeholder.svg"
                      }
                      alt={cat.name}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/assets/images/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="p-2.5 text-center">
                    <span className="text-base block mb-0.5">{cat.icon}</span>
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-smooth leading-tight block">
                      {cat.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
