import { c as createLucideIcon, b as useParams, r as reactExports, C as CATEGORIES, j as jsxRuntimeExports, L as Link, d as Skeleton, a as Button, B as Badge, u as useCart, S as ShoppingCart } from "./index-BaHQCgOk.js";
import { A as ArrowLeft, B as Breadcrumb, C as ChevronRight } from "./Breadcrumb-CRAFUBPH.js";
import { S as SlidersHorizontal, a as Select, b as SelectTrigger, c as SelectValue, d as SelectContent, e as SelectItem } from "./select-BCYvTxOk.js";
import { u as useProductsByCategory } from "./useProducts-CNb5XH8J.js";
import { m as motion } from "./proxy-6F3qKueE.js";
import { A as AnimatePresence } from "./index-CulhARP5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
const PAGE_SIZE = 24;
function ProductCard({ product, index }) {
  const { addItem } = useCart();
  const [added, setAdded] = reactExports.useState(false);
  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: Math.min(index * 0.04, 0.46) },
      className: "product-card group flex flex-col h-full",
      "data-ocid": `category.product.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/product/$id",
            params: { id: product.id },
            className: "block",
            "data-ocid": `category.product.link.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-muted/40 overflow-hidden aspect-square", children: [
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
              product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 left-2 badge-organic z-10", children: product.badge }),
              !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground bg-card px-2 py-1 rounded-full border border-border", children: "Out of Stock" }) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-3 gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: product.unit }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm leading-snug line-clamp-2 hover:text-primary transition-smooth min-h-[2.5rem]", children: product.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-primary text-base", children: [
              "$",
              product.price.toFixed(2)
            ] }),
            product.inStock ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[10px] px-1.5 py-0 border-primary/30 text-primary",
                children: "In Stock"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[10px] px-1.5 py-0 border-border text-muted-foreground",
                children: "Out of Stock"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            className: "w-full text-xs transition-smooth",
            variant: added ? "outline" : "default",
            disabled: !product.inStock,
            onClick: handleAdd,
            "data-ocid": `category.add_to_cart.${index + 1}`,
            children: added ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5 mr-1.5" }),
              "Added!"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3.5 w-3.5 mr-1.5" }),
              "Add to Cart"
            ] })
          }
        ) })
      ]
    }
  );
}
function ProductGridSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5", children: Array.from({ length: 12 }, (_, i) => `skel-${i}`).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-xl border border-border overflow-hidden",
      "data-ocid": "category.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-12" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-14" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" }) })
      ]
    },
    key
  )) });
}
function Category() {
  const { slug } = useParams({ from: "/category/$slug" });
  const { data: products, isLoading } = useProductsByCategory(slug);
  const [sort, setSort] = reactExports.useState("featured");
  const [page, setPage] = reactExports.useState(1);
  const category = CATEGORIES.find((c) => c.slug === slug);
  const sorted = reactExports.useMemo(() => {
    const list = [...products ?? []];
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
  function handleSort(value) {
    setSort(value);
    setPage(1);
  }
  function handlePageChange(next) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const inStockCount = (products ?? []).filter((p) => p.inStock).length;
  const outOfStockCount = (products ?? []).length - inStockCount;
  const displayName = (category == null ? void 0 : category.name) ?? slug.charAt(0).toUpperCase() + slug.slice(1);
  const pageNumbers = reactExports.useMemo(() => {
    const nums = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
      (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
    );
    return nums.reduce((acc, p, idx, arr) => {
      if (idx > 0 && typeof arr[idx - 1] === "number" && arr[idx - 1] < p - 1) {
        acc.push("…");
      }
      acc.push(p);
      return acc;
    }, []);
  }, [totalPages, page]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth shrink-0",
          "aria-label": "Back to Home",
          "data-ocid": "category.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline font-medium", children: "Back" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-px bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { items: [{ label: displayName }] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden", style: { minHeight: 220 }, children: [
      (category == null ? void 0 : category.imageUrl) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: category.imageUrl,
            alt: displayName,
            className: "absolute inset-0 w-full h-full object-cover",
            onError: (e) => {
              e.target.style.display = "none";
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/92 via-background/65 to-background/10" })
      ] }),
      !(category == null ? void 0 : category.imageUrl) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/8 to-accent/8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.4 },
          className: "space-y-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              (category == null ? void 0 : category.icon) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", role: "img", "aria-label": displayName, children: category.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: displayName })
            ] }),
            (category == null ? void 0 : category.description) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-lg text-sm sm:text-base leading-relaxed", children: category.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-x-5 gap-y-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: (products == null ? void 0 : products.length) ?? (category == null ? void 0 : category.productCount) ?? 0 }),
                " ",
                "products"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm text-primary font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5" }),
                inStockCount,
                " in stock"
              ] }),
              outOfStockCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
                outOfStockCount,
                " unavailable"
              ] })
            ] })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            sorted.length,
            " products",
            totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/70", children: [
              " ",
              "— page ",
              page,
              " of ",
              totalPages
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2",
            "data-ocid": "category.sort_select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "sort-select",
                  className: "text-sm text-muted-foreground whitespace-nowrap",
                  children: "Sort:"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sort, onValueChange: handleSort, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "sort-select",
                    className: "w-44 text-sm h-9",
                    "data-ocid": "category.sort_trigger",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "featured", children: "Featured" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price-asc", children: "Price: Low to High" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price-desc", children: "Price: High to Low" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "name-asc", children: "Name: A–Z" })
                ] })
              ] })
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridSkeleton, {}) : pageProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-24 text-center",
          "data-ocid": "category.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-4", children: (category == null ? void 0 : category.icon) ?? "🔍" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No products found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This category doesn't have any products yet." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "data-ocid": "category.browse_all_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", children: "Browse All Categories" }) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5",
          children: pageProducts.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, product.id))
        },
        `${slug}-${sort}-${page}`
      ) }),
      !isLoading && totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.25 },
          className: "flex flex-col items-center gap-3 mt-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  disabled: page === 1,
                  onClick: () => handlePageChange(page - 1),
                  className: "flex items-center gap-1",
                  "data-ocid": "category.pagination_prev",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                    "Prev"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: pageNumbers.map(
                (item) => item === "…" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "px-1 text-sm text-muted-foreground",
                    children: "…"
                  },
                  `ellipsis-before-${typeof pageNumbers[pageNumbers.indexOf(item) + 1] === "number" ? pageNumbers[pageNumbers.indexOf(item) + 1] : "end"}`
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: page === item ? "default" : "outline",
                    size: "sm",
                    className: "w-9 h-9 p-0 text-sm",
                    onClick: () => handlePageChange(item),
                    "data-ocid": `category.pagination.page.${item}`,
                    children: item
                  },
                  item
                )
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  disabled: page === totalPages,
                  onClick: () => handlePageChange(page + 1),
                  className: "flex items-center gap-1",
                  "data-ocid": "category.pagination_next",
                  children: [
                    "Next",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Showing ",
              (page - 1) * PAGE_SIZE + 1,
              "–",
              Math.min(page * PAGE_SIZE, sorted.length),
              " of ",
              sorted.length,
              " ",
              "products"
            ] })
          ]
        }
      ),
      !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 pt-8 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-4", children: "Browse Other Categories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: CATEGORIES.filter((c) => c.slug !== slug).map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/category/$slug",
            params: { slug: cat.slug },
            "data-ocid": `category.other_cat.${cat.slug}_link`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-sm py-1.5 px-3 cursor-pointer hover:bg-primary/5 hover:border-primary/40 transition-smooth",
                children: [
                  cat.icon,
                  " ",
                  cat.name
                ]
              }
            )
          },
          cat.id
        )) })
      ] })
    ] })
  ] });
}
export {
  Category as default
};
