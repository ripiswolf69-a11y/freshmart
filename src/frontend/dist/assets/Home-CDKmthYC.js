import { c as createLucideIcon, j as jsxRuntimeExports, B as Badge, L as Link, a as Button, S as ShoppingCart, C as CATEGORIES, P as PRODUCTS, u as useCart } from "./index-BaHQCgOk.js";
import { C as Card, a as CardContent } from "./card-CbP8aI10.js";
import { m as motion } from "./proxy-6F3qKueE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const CAT_IMAGES = {
  vegetables: "/assets/generated/cat-vegetables.dim_400x300.jpg",
  fruits: "/assets/generated/cat-fruits.dim_400x300.jpg",
  dairy: "/assets/generated/cat-dairy.dim_400x300.jpg",
  bakery: "/assets/generated/cat-bakery.dim_400x300.jpg",
  pantry: "/assets/generated/cat-pantry.dim_400x300.jpg",
  organic: "/assets/generated/cat-organic.dim_400x300.jpg"
};
const FEATURED_PRODUCTS = PRODUCTS.filter(
  (p) => p.badge === "Bestseller"
).slice(0, 8);
const TRUST_BADGES = [
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "On orders above $35"
  },
  {
    icon: ShieldCheck,
    title: "100% Fresh",
    desc: "Guaranteed farm-fresh quality"
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "Hassle-free 48h returns"
  },
  {
    icon: ShoppingCart,
    title: "Secure Checkout",
    desc: "SSL-encrypted, safe payments"
  }
];
function CategoryCard({ cat, index }) {
  const imageSrc = CAT_IMAGES[cat.slug] ?? "/assets/images/placeholder.svg";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true },
      transition: { duration: 0.35, delay: index * 0.06 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/category/$slug",
          params: { slug: cat.slug },
          "data-ocid": `home.category_${cat.slug}_link`,
          className: "group flex flex-col rounded-xl bg-card border border-border overflow-hidden hover:border-primary/50 hover:shadow-elevated transition-smooth text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: imageSrc,
                alt: cat.name,
                className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
                onError: (e) => {
                  e.target.src = "/assets/images/placeholder.svg";
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl mb-1 block", children: cat.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground group-hover:text-primary transition-smooth leading-tight", children: cat.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                cat.productCount,
                " products"
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function ProductCard({ product, index }) {
  const { addItem } = useCart();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.07 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "product-card group h-full",
          "data-ocid": `home.product_card.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id }, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square bg-muted/40 overflow-hidden relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.imageUrl,
                  alt: product.name,
                  className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
                  onError: (e) => {
                    e.target.src = "/assets/images/placeholder.svg";
                  }
                }
              ),
              product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 left-2 badge-organic", children: product.badge }),
              !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-muted-foreground", children: "Out of Stock" }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-tight hover:text-primary transition-smooth line-clamp-2", children: product.name }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: product.unit }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg font-bold text-primary", children: [
                  "$",
                  product.price.toFixed(2)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    onClick: () => addItem(product),
                    disabled: !product.inStock,
                    className: "text-xs gap-1 flex-shrink-0",
                    "data-ocid": `home.add_to_cart.${index + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3.5 w-3.5" }),
                      "Add"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden",
        style: { minHeight: "460px" },
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center",
              style: {
                backgroundImage: "url('/assets/generated/hero-banner.dim_1400x560.jpg')"
              },
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0",
              style: {
                background: "linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 60%, transparent 100%)"
              },
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex flex-col items-start gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -32 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.65 },
                className: "max-w-xl",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm", children: "🌱 Sourced Fresh. Delivered Daily." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-sm", children: [
                    "Farm-Fresh Goodness,",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Delivered" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-white/85 max-w-md leading-relaxed", children: "Discover premium organic produce and pantry staples sourced sustainably for your family." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.55, delay: 0.25 },
                className: "flex flex-wrap gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/category/$slug", params: { slug: "vegetables" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "gap-2 shadow-elevated",
                      "data-ocid": "home.hero_shop_now_button",
                      children: [
                        "Shop Now ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/category/$slug", params: { slug: "organic" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "lg",
                      variant: "outline",
                      className: "bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20 hover:text-white",
                      "data-ocid": "home.hero_organic_button",
                      children: "Explore Organic"
                    }
                  ) })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card border-b border-border",
        "data-ocid": "home.trust_badges_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-6", children: TRUST_BADGES.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(badge.icon, { className: "h-5 w-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: badge.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: badge.desc })
          ] })
        ] }, badge.title)) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "section-alt py-16",
        "data-ocid": "home.categories_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "flex items-end justify-between mb-8",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Shop by Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Six fresh categories, 600+ hand-picked products" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4", children: CATEGORIES.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryCard, { cat, index: i }, cat.id)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-background",
        "data-ocid": "home.featured_products_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              className: "flex items-end justify-between mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Bestsellers" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Our most-loved products, hand-picked for you" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/category/$slug",
                    params: { slug: "vegetables" },
                    className: "text-sm text-primary font-semibold hover:underline flex items-center gap-1 transition-smooth",
                    "data-ocid": "home.view_all_link",
                    children: [
                      "View all ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6", children: FEATURED_PRODUCTS.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, product.id)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-primary",
        "data-ocid": "home.promo_banner_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "flex flex-col md:flex-row items-center justify-between gap-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center md:text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm font-semibold uppercase tracking-widest mb-2", children: "Our Promise" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-primary-foreground leading-tight", children: "Fresh Delivered Daily" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-primary-foreground/80 max-w-md text-base leading-relaxed", children: "Every morning we source directly from local farms and artisan producers. Freshness isn't a guarantee — it's our daily commitment." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/category/$slug", params: { slug: "vegetables" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    variant: "secondary",
                    className: "gap-2 font-semibold",
                    "data-ocid": "home.promo_shop_vegetables_button",
                    children: "🥦 Shop Vegetables"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/category/$slug", params: { slug: "fruits" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    className: "gap-2 bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90",
                    "data-ocid": "home.promo_shop_fruits_button",
                    children: "🍎 Shop Fruits"
                  }
                ) })
              ] })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section-alt py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          className: "text-center mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Explore Every Aisle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Browse all 600+ products across 6 fresh categories" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4", children: CATEGORIES.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.05 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/category/$slug",
              params: { slug: cat.slug },
              "data-ocid": `home.bottom_category_${cat.slug}_button`,
              className: "group block rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-elevated transition-smooth bg-card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: CAT_IMAGES[cat.slug] ?? "/assets/images/placeholder.svg",
                    alt: cat.name,
                    className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
                    onError: (e) => {
                      e.target.src = "/assets/images/placeholder.svg";
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base block mb-0.5", children: cat.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground group-hover:text-primary transition-smooth leading-tight block", children: cat.name })
                ] })
              ]
            }
          )
        },
        cat.id
      )) })
    ] }) })
  ] });
}
export {
  Home as default
};
