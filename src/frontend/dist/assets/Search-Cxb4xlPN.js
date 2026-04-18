import { c as createLucideIcon, i as useSearch, h as useNavigate, r as reactExports, j as jsxRuntimeExports, k as Search, I as Input, a as Button, C as CATEGORIES, d as Skeleton, L as Link, B as Badge, u as useCart, S as ShoppingCart } from "./index-BaHQCgOk.js";
import { A as ArrowLeft, B as Breadcrumb } from "./Breadcrumb-CRAFUBPH.js";
import { C as Card, a as CardContent } from "./card-CbP8aI10.js";
import { S as SlidersHorizontal, a as Select, b as SelectTrigger, c as SelectValue, d as SelectContent, e as SelectItem } from "./select-BCYvTxOk.js";
import { b as useSearchProducts } from "./useProducts-CNb5XH8J.js";
import { m as motion } from "./proxy-6F3qKueE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode);
function SearchResultCard({
  product,
  index
}) {
  const { addItem } = useCart();
  const category = CATEGORIES.find((c) => c.slug === product.category);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: Math.min(index * 0.04, 0.5) },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "product-card group h-full",
          "data-ocid": `search.result_card.${index + 1}`,
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
              !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground", children: "Out of Stock" }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground hover:text-primary transition-smooth line-clamp-2 leading-tight", children: product.name }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mt-1.5 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/category/$slug",
                  params: { slug: product.category },
                  "data-ocid": `search.category_badge.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-[10px] py-0 px-1.5 cursor-pointer hover:bg-primary/10 hover:text-primary transition-smooth",
                      children: [
                        category == null ? void 0 : category.icon,
                        " ",
                        (category == null ? void 0 : category.name) ?? product.category
                      ]
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: product.unit }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-base font-bold text-primary", children: [
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
                    "data-ocid": `search.add_to_cart.${index + 1}`,
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
function SearchPage() {
  const { q } = useSearch({ from: "/search" });
  const navigate = useNavigate();
  const [inputValue, setInputValue] = reactExports.useState(q ?? "");
  const [selectedCategories, setSelectedCategories] = reactExports.useState([]);
  const [sort, setSort] = reactExports.useState("default");
  const { data: rawResults, isLoading } = useSearchProducts(q ?? "");
  reactExports.useEffect(() => {
    setInputValue(q ?? "");
    setSelectedCategories([]);
    setSort("default");
  }, [q]);
  const results = reactExports.useMemo(() => {
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
  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      void navigate({ to: "/search", search: { q: inputValue.trim() } });
    }
  };
  const toggleCategory = (slug) => {
    setSelectedCategories(
      (prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      void navigate({ to: "/" });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleBack,
          className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth",
          "data-ocid": "search.back_button",
          "aria-label": "Go back",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { items: [{ label: "Search Results" }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground mt-3 mb-4", children: q ? "Search Results" : "Search Products" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "flex gap-2 max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "search",
              value: inputValue,
              onChange: (e) => setInputValue(e.target.value),
              placeholder: "Search products, categories…",
              className: "pl-10",
              "data-ocid": "search.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", "data-ocid": "search.search_button", children: "Search" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: q ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block w-56 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-5 sticky top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "Filter by Category" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", "data-ocid": "search.category_filters", children: CATEGORIES.map((cat) => {
          const countInResults = (rawResults ?? []).filter(
            (p) => p.category === cat.slug
          ).length;
          const checked = selectedCategories.includes(cat.slug);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center justify-between gap-2 cursor-pointer group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked,
                  onChange: () => toggleCategory(cat.slug),
                  className: "accent-primary h-3.5 w-3.5 rounded",
                  "data-ocid": `search.filter.${cat.slug}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground group-hover:text-primary transition-smooth", children: [
                cat.icon,
                " ",
                cat.name
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: countInResults })
          ] }) }, cat.id);
        }) }),
        selectedCategories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSelectedCategories([]),
            className: "mt-4 text-xs text-primary hover:underline",
            "data-ocid": "search.clear_filters_button",
            children: "Clear filters"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4 lg:hidden", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => toggleCategory(cat.slug),
            className: selectedCategories.includes(cat.slug) ? "text-xs px-3 py-1.5 rounded-full border transition-smooth bg-primary text-primary-foreground border-primary" : "text-xs px-3 py-1.5 rounded-full border transition-smooth bg-card border-border text-foreground hover:border-primary/40",
            "data-ocid": `search.mobile_filter.${cat.slug}`,
            children: [
              cat.icon,
              " ",
              cat.name
            ]
          },
          cat.id
        )) }),
        !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-sm text-muted-foreground",
              "data-ocid": "search.results_count",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: results.length }),
                " ",
                "result",
                results.length !== 1 ? "s" : "",
                " for",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                  '"',
                  q,
                  '"'
                ] }),
                selectedCategories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  " ",
                  "· filtered by",
                  " ",
                  selectedCategories.map(
                    (s) => {
                      var _a;
                      return ((_a = CATEGORIES.find((c) => c.slug === s)) == null ? void 0 : _a.name) ?? s;
                    }
                  ).join(", ")
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: sort,
              onValueChange: (v) => setSort(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-44",
                    "data-ocid": "search.sort_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sort by" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "default", children: "Featured" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price-asc", children: "Price: Low to High" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price-desc", children: "Price: High to Low" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "name-asc", children: "Name: A–Z" })
                ] })
              ]
            }
          )
        ] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" }, k)) }),
        !isLoading && results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-20 text-center",
            "data-ocid": "search.no_results_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl mb-4", children: "🔍" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: [
                'No results for "',
                q,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: selectedCategories.length > 0 ? "Try removing category filters or searching with different terms." : "Check the spelling, or try a more general keyword." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-3", children: "Browse categories instead:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/category/$slug",
                    params: { slug: cat.slug },
                    "data-ocid": `search.empty_category_link.${cat.slug}`,
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
              ] }),
              selectedCategories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => setSelectedCategories([]),
                  "data-ocid": "search.clear_filters_button",
                  children: "Clear filters"
                }
              )
            ]
          }
        ),
        !isLoading && results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5", children: results.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SearchResultCard,
          {
            product,
            index: i
          },
          product.id
        )) })
      ] })
    ] }) : (
      /* No query state */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 text-center", "data-ocid": "search.empty_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-9 w-9 text-primary opacity-70" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "Search FreshMart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-10 max-w-sm mx-auto", children: "Type a product name, ingredient, or category to find exactly what you need." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground mb-3 flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-4 w-4 text-primary" }),
            "Or browse by category"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/category/$slug",
              params: { slug: cat.slug },
              "data-ocid": `search.browse_category.${cat.slug}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "text-sm py-2 px-4 cursor-pointer hover:bg-primary/5 hover:border-primary/40 transition-smooth",
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
    ) })
  ] });
}
export {
  SearchPage as default
};
