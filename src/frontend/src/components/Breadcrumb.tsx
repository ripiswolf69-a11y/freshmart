import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm text-muted-foreground"
    >
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-primary transition-smooth"
        data-ocid="breadcrumb.home_link"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
          {item.href && index < items.length - 1 ? (
            <Link
              to={item.href}
              className="hover:text-primary transition-smooth"
              data-ocid={`breadcrumb.item.${index + 1}`}
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
