import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { Skeleton } from "./components/ui/skeleton";
import { CartProvider } from "./context/CartContext";

const HomePage = lazy(() => import("./pages/Home"));
const CategoryPage = lazy(() => import("./pages/Category"));
const ProductPage = lazy(() => import("./pages/Product"));
const CartPage = lazy(() => import("./pages/Cart"));
const SearchPage = lazy(() => import("./pages/Search"));

function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
          <Skeleton key={k} className="h-64 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function RootLayout() {
  return (
    <CartProvider>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </Layout>
    </CartProvider>
  );
}

function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <p className="font-display text-5xl font-bold text-primary mb-4">404</p>
      <h1 className="font-display text-2xl font-semibold text-foreground mb-2">
        Page Not Found
      </h1>
      <p className="text-muted-foreground mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/category/$slug",
  component: CategoryPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  categoryRoute,
  productRoute,
  cartRoute,
  searchRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
