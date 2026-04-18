import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "../data/products";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-display text-2xl font-bold text-primary">
              FreshMart
            </span>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Premium fresh produce and pantry staples sourced from trusted
              farms and artisan producers worldwide.
            </p>
          </div>

          {/* Shop by Category */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">
              Shop by Category
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to="/category/$slug"
                    params={{ slug: cat.slug }}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                    data-ocid={`footer.category_${cat.slug}_link`}
                  >
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/cart", label: "Shopping Cart" },
                { to: "/search", label: "Search Products" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Store info */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">
              Our Promise
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>🌱 Sustainably sourced</li>
              <li>🚜 Farm-fresh daily</li>
              <li>🌿 Wide organic selection</li>
              <li>⭐ Quality guaranteed</li>
              <li>🍃 No artificial preservatives</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs">FreshMart — Fresh. Organic. Delivered.</p>
        </div>
      </div>
    </footer>
  );
}
