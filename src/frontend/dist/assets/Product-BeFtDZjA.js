import { b as useParams, u as useCart, r as reactExports, C as CATEGORIES, j as jsxRuntimeExports, a as Button, L as Link, B as Badge, S as ShoppingCart, d as Skeleton } from "./index-BaHQCgOk.js";
import { B as Breadcrumb, A as ArrowLeft } from "./Breadcrumb-CRAFUBPH.js";
import { C as Card, a as CardContent } from "./card-CbP8aI10.js";
import { a as useProductById, u as useProductsByCategory, C as Check } from "./useProducts-CNb5XH8J.js";
import { m as motion } from "./proxy-6F3qKueE.js";
import { A as AnimatePresence } from "./index-CulhARP5.js";
import { M as Minus, P as Plus } from "./plus-COSSZIpT.js";
function ProductHeroImage({ src, alt }) {
  const [errored, setErrored] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-square rounded-2xl overflow-hidden bg-muted border border-border flex items-center justify-center", children: errored ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-3 text-muted-foreground p-8 text-center select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-7xl", children: "🛒" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body font-medium", children: alt })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src,
      alt,
      onError: () => setErrored(true),
      className: "w-full h-full object-cover"
    }
  ) });
}
function QuantitySelector({ value, onChange, disabled }) {
  const dec = () => onChange(Math.max(1, value - 1));
  const inc = () => onChange(Math.min(99, value + 1));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center border border-input rounded-lg overflow-hidden w-fit",
      "data-ocid": "product.quantity_selector",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Decrease quantity",
            onClick: dec,
            disabled: disabled || value <= 1,
            className: "w-10 h-11 flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
            "data-ocid": "product.quantity_dec_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: 1,
            max: 99,
            value,
            onChange: (e) => {
              const v = Number.parseInt(e.target.value, 10);
              if (!Number.isNaN(v)) onChange(Math.min(99, Math.max(1, v)));
            },
            disabled,
            className: "w-14 h-11 text-center text-sm font-semibold bg-background border-x border-input text-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            "aria-label": "Quantity",
            "data-ocid": "product.quantity_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Increase quantity",
            onClick: inc,
            disabled: disabled || value >= 99,
            className: "w-10 h-11 flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
            "data-ocid": "product.quantity_inc_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
function RelatedCard({ product, index }) {
  const { addItem } = useCart();
  const [added, setAdded] = reactExports.useState(false);
  const [imgError, setImgError] = reactExports.useState(false);
  const handleAdd = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      addItem(product, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    },
    [addItem, product]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.35, delay: index * 0.08 },
      "data-ocid": `product.related.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "product-card group overflow-hidden h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-muted overflow-hidden", children: imgError ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-4xl bg-muted select-none", children: "🛒" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: product.imageUrl,
            alt: product.name,
            onError: () => setImgError(true),
            className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-semibold text-sm text-foreground line-clamp-2 leading-snug mb-0.5", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: product.unit }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-primary text-base", children: [
              "$",
              product.price.toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleAdd,
                disabled: !product.inStock,
                "aria-label": `Add ${product.name} to cart`,
                "data-ocid": `product.related.add_button.${index + 1}`,
                className: `w-8 h-8 rounded-full flex items-center justify-center transition-smooth
                  ${added ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:opacity-90"}
                  disabled:opacity-40 disabled:cursor-not-allowed`,
                children: added ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
              }
            )
          ] })
        ] })
      ] }) })
    }
  );
}
function ProductSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8",
      "data-ocid": "product.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-3 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-72" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-36 mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16 rounded-full" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-28" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-36 rounded-lg" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 flex-1 rounded-lg" })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function InfoRow({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: value })
  ] });
}
function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const { data: product, isLoading } = useProductById(id);
  const { data: related } = useProductsByCategory((product == null ? void 0 : product.category) ?? "");
  const { addItem } = useCart();
  const [qty, setQty] = reactExports.useState(1);
  const [addedToCart, setAddedToCart] = reactExports.useState(false);
  const categoryInfo = CATEGORIES.find((c) => c.slug === (product == null ? void 0 : product.category));
  const categoryName = (categoryInfo == null ? void 0 : categoryInfo.name) ?? (product == null ? void 0 : product.category) ?? "";
  const relatedProducts = (related ?? []).filter((p) => p.id !== id).slice(0, 4);
  const handleAddToCart = reactExports.useCallback(() => {
    if (!product || !product.inStock) return;
    addItem(product, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2e3);
  }, [product, qty, addItem]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSkeleton, {});
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-6xl mx-auto px-4 py-24 text-center",
        "data-ocid": "product.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-6xl mb-4", children: "🥦" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "Product Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "This product doesn't exist or may have been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "data-ocid": "product.back_home_button", children: "Back to Home" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Breadcrumb,
        {
          items: [
            {
              label: categoryName,
              href: `/category/${product.category}`
            },
            { label: product.name }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/category/$slug",
          params: { slug: product.category },
          className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth w-fit",
          "data-ocid": "product.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back to ",
            categoryName
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -24 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.5 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductHeroImage, { src: product.imageUrl, alt: product.name })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 24 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.5, delay: 0.12 },
            className: "flex flex-col",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "bg-primary/10 text-primary border-primary/20 text-xs font-semibold px-2.5 py-0.5",
                    "data-ocid": "product.category_badge",
                    children: categoryName
                  }
                ),
                product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "bg-accent/15 text-foreground border-accent/20 text-xs px-2.5 py-0.5",
                    "data-ocid": "product.badge",
                    children: product.badge
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: product.inStock ? "secondary" : "destructive",
                    className: product.inStock ? "bg-green-100 text-green-800 border-green-200 text-xs px-2.5 py-0.5" : "text-xs px-2.5 py-0.5",
                    "data-ocid": "product.stock_badge",
                    children: product.inStock ? "● In Stock" : "● Out of Stock"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-2",
                  "data-ocid": "product.name",
                  children: product.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-sm text-muted-foreground mb-5",
                  "data-ocid": "product.unit",
                  children: [
                    "Sold per:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: product.unit })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-display text-4xl font-bold text-primary",
                    "data-ocid": "product.price",
                    children: [
                      "$",
                      product.price.toFixed(2)
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                  "/ ",
                  product.unit
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border mb-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "font-body text-base text-foreground/80 leading-relaxed mb-6",
                  "data-ocid": "product.description",
                  children: [
                    product.description,
                    " Carefully sourced from trusted local farms and hand-selected for peak freshness. Delivered to your door at the height of quality so every meal starts with the best ingredients."
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  QuantitySelector,
                  {
                    value: qty,
                    onChange: setQty,
                    disabled: !product.inStock
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scale: 0.97, opacity: 0.7 },
                    animate: { scale: 1, opacity: 1 },
                    exit: { scale: 0.97, opacity: 0 },
                    transition: { duration: 0.15 },
                    className: "flex-1 min-w-[160px]",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        onClick: handleAddToCart,
                        disabled: !product.inStock,
                        size: "lg",
                        className: `w-full h-11 font-semibold gap-2 transition-smooth
                      ${addedToCart ? "bg-green-600 hover:bg-green-700 text-white" : ""}`,
                        "data-ocid": "product.add_to_cart_button",
                        children: addedToCart ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
                          "Added to Cart!"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4" }),
                          product.inStock ? "Add to Cart" : "Out of Stock"
                        ] })
                      }
                    )
                  },
                  addedToCart ? "added" : "add"
                ) })
              ] }),
              !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-destructive font-medium mb-4",
                  "data-ocid": "product.out_of_stock_notice",
                  children: "Currently out of stock — check back soon!"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/cart",
                  className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth mb-6 w-fit",
                  "data-ocid": "product.view_cart_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3.5 w-3.5" }),
                    "View your cart"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl px-4 py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Category", value: categoryName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Unit", value: product.unit }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoRow,
                  {
                    label: "Availability",
                    value: product.inStock ? "Available" : "Unavailable"
                  }
                ),
                product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Label", value: product.badge })
              ] })
            ]
          }
        )
      ] }),
      relatedProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          className: "mt-16 pt-10 border-t border-border",
          "data-ocid": "product.related_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-bold text-foreground", children: [
                "More from ",
                categoryName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/category/$slug",
                  params: { slug: product.category },
                  className: "text-sm text-primary font-semibold hover:underline transition-smooth",
                  "data-ocid": "product.view_all_link",
                  children: "View all →"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6", children: relatedProducts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedCard, { product: p, index: i }, p.id)) })
          ]
        }
      )
    ] })
  ] });
}
export {
  ProductDetail as default
};
