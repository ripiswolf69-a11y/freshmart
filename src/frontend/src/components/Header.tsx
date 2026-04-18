import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { CATEGORIES } from "../data/products";
import { useCart } from "../hooks/useCart";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Header() {
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      void navigate({ to: "/search", search: { q: searchQuery.trim() } });
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 group"
            data-ocid="header.logo_link"
          >
            <span className="font-display text-2xl font-bold text-primary group-hover:opacity-80 transition-smooth">
              FreshMart
            </span>
          </Link>

          {/* Desktop search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-lg relative"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search fresh produce, pantry staples…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-input focus:bg-card"
                data-ocid="header.search_input"
              />
            </div>
            <Button
              type="submit"
              className="ml-2"
              data-ocid="header.search_button"
            >
              Search
            </Button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Toggle search"
              data-ocid="header.mobile_search_toggle"
            >
              {searchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>

            {/* Cart */}
            <Link to="/cart" data-ocid="header.cart_link">
              <Button
                variant="outline"
                size="icon"
                className="relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    className="absolute -top-1.5 -right-1.5 h-5 min-w-5 flex items-center justify-center text-xs px-1 bg-primary text-primary-foreground border-0"
                    data-ocid="header.cart_count_badge"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                  data-ocid="header.mobile_menu_toggle"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <nav className="flex flex-col gap-1 mt-6">
                  <Link
                    to="/"
                    className={`px-4 py-3 rounded-md font-body text-sm transition-smooth ${
                      currentPath === "/"
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                    data-ocid="header.mobile_nav_home"
                  >
                    Home
                  </Link>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to="/category/$slug"
                      params={{ slug: cat.slug }}
                      className={`px-4 py-3 rounded-md font-body text-sm transition-smooth ${
                        currentPath === `/category/${cat.slug}`
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-foreground hover:bg-muted"
                      }`}
                      data-ocid={`header.mobile_nav_${cat.slug}`}
                    >
                      {cat.icon} {cat.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Search products…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  autoFocus
                  data-ocid="header.mobile_search_input"
                />
              </div>
              <Button type="submit" data-ocid="header.mobile_search_button">
                Go
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Desktop nav bar */}
      <nav className="hidden lg:block border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1 h-10">
            <li>
              <Link
                to="/"
                className={`px-3 py-1.5 rounded text-sm font-medium transition-smooth ${
                  currentPath === "/"
                    ? "text-primary font-semibold"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                }`}
                data-ocid="header.nav_home"
              >
                Home
              </Link>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-smooth ${
                    currentPath === `/category/${cat.slug}`
                      ? "text-primary font-semibold"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  }`}
                  data-ocid={`header.nav_${cat.slug}`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
