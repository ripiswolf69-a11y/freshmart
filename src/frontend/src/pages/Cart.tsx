import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { useCartContext } from "../context/CartContext";
import type { CartItem } from "../types";

const TAX_RATE = 0.08;
const DELIVERY_FEE = 4.99;
const FREE_DELIVERY_THRESHOLD = 50;

// ── Quantity Selector ──────────────────────────────────────────────────────────
function QuantitySelector({
  item,
  onUpdate,
  index,
}: {
  item: CartItem;
  onUpdate: (id: string, qty: number) => void;
  index: number;
}) {
  return (
    <div
      className="inline-flex items-center border border-border rounded-lg overflow-hidden"
      data-ocid={`cart.quantity_selector.${index}`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        data-ocid={`cart.qty_decrease.${index}`}
        disabled={item.quantity <= 1}
        onClick={() => onUpdate(item.productId, item.quantity - 1)}
        className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span
        className="w-9 text-center text-sm font-semibold text-foreground select-none border-x border-border py-1"
        data-ocid={`cart.qty_display.${index}`}
      >
        {item.quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        data-ocid={`cart.qty_increase.${index}`}
        onClick={() => onUpdate(item.productId, item.quantity + 1)}
        className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors text-foreground"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ── Desktop Table Row ──────────────────────────────────────────────────────────
function CartTableRow({
  item,
  index,
  onUpdate,
  onRemove,
}: {
  item: CartItem;
  index: number;
  onUpdate: (id: string, qty: number) => void;
  onRemove: (id: string, product: CartItem) => void;
}) {
  const lineTotal = item.product.price * item.quantity;

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.25 }}
      className="border-b border-border last:border-0 group align-middle"
      data-ocid={`cart.item.${index}`}
    >
      {/* Thumbnail */}
      <td className="py-5 pl-6 pr-4 w-20">
        <Link
          to="/product/$id"
          params={{ id: item.productId }}
          className="block w-16 h-16 rounded-xl overflow-hidden bg-muted border border-border hover:opacity-80 transition-smooth"
        >
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
        </Link>
      </td>

      {/* Name + category */}
      <td className="py-5 pr-6 min-w-0">
        <Link
          to="/product/$id"
          params={{ id: item.productId }}
          className="font-semibold text-sm text-foreground hover:text-primary transition-smooth line-clamp-2 leading-snug block"
          data-ocid={`cart.product_link.${index}`}
        >
          {item.product.name}
        </Link>
        <p className="text-xs text-muted-foreground mt-1 capitalize">
          {item.product.category}
        </p>
        <p className="text-xs text-muted-foreground/70">{item.product.unit}</p>
      </td>

      {/* Unit price */}
      <td className="py-5 pr-6 text-right text-sm text-muted-foreground whitespace-nowrap">
        ${item.product.price.toFixed(2)}
      </td>

      {/* Quantity */}
      <td className="py-5 pr-6">
        <QuantitySelector item={item} onUpdate={onUpdate} index={index} />
      </td>

      {/* Line total */}
      <td className="py-5 pr-6 text-right font-bold text-foreground text-sm whitespace-nowrap">
        ${lineTotal.toFixed(2)}
      </td>

      {/* Remove */}
      <td className="py-5 pr-6 text-right">
        <button
          type="button"
          aria-label={`Remove ${item.product.name}`}
          data-ocid={`cart.delete_button.${index}`}
          onClick={() => onRemove(item.productId, item)}
          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </motion.tr>
  );
}

// ── Mobile Card Row ────────────────────────────────────────────────────────────
function CartMobileCard({
  item,
  index,
  onUpdate,
  onRemove,
}: {
  item: CartItem;
  index: number;
  onUpdate: (id: string, qty: number) => void;
  onRemove: (id: string, product: CartItem) => void;
}) {
  const lineTotal = item.product.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.25 }}
      className="flex gap-3 py-4 border-b border-border last:border-0"
      data-ocid={`cart.item.${index}`}
    >
      <Link to="/product/$id" params={{ id: item.productId }}>
        <div className="w-18 h-18 w-[72px] h-[72px] rounded-xl overflow-hidden bg-muted border border-border flex-shrink-0">
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to="/product/$id"
              params={{ id: item.productId }}
              className="font-semibold text-sm text-foreground hover:text-primary transition-smooth line-clamp-2 leading-snug"
            >
              {item.product.name}
            </Link>
            <p className="text-xs text-muted-foreground mt-0.5 capitalize">
              {item.product.category} · {item.product.unit}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              ${item.product.price.toFixed(2)} each
            </p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${item.product.name}`}
            data-ocid={`cart.delete_button.${index}`}
            onClick={() => onRemove(item.productId, item)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth flex-shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <QuantitySelector item={item} onUpdate={onUpdate} index={index} />
          <span className="font-bold text-sm text-foreground">
            ${lineTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────────
function EmptyCartState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-24 text-center"
      data-ocid="cart.empty_state"
    >
      <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center mb-6 shadow-subtle">
        <ShoppingBag className="h-14 w-14 text-primary" />
      </div>
      <h2 className="font-display text-3xl font-bold text-foreground mb-3">
        Your cart is empty
      </h2>
      <p className="text-muted-foreground max-w-sm leading-relaxed mb-8">
        You haven't added anything yet. Browse our fresh produce, dairy, bakery
        goods and more to fill your cart.
      </p>
      <Link to="/" data-ocid="cart.start_shopping_button">
        <Button size="lg" className="btn-primary px-10 text-base gap-2">
          Start Shopping
        </Button>
      </Link>
    </motion.div>
  );
}

// ── Order Summary ──────────────────────────────────────────────────────────────
function OrderSummary({
  subtotal,
  onCheckout,
}: {
  subtotal: number;
  onCheckout: () => void;
}) {
  const tax = subtotal * TAX_RATE;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + tax + deliveryFee;
  const savingsToFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal;

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-subtle sticky top-6"
      data-ocid="cart.order_summary"
    >
      <h2 className="font-display text-xl font-bold text-foreground mb-5">
        Order Summary
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-semibold text-foreground">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Estimated tax (8%)</span>
          <span className="font-semibold text-foreground">
            ${tax.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Delivery fee</span>
          {deliveryFee === 0 ? (
            <span className="font-semibold text-primary">Free 🎉</span>
          ) : (
            <span className="font-semibold text-foreground">
              ${deliveryFee.toFixed(2)}
            </span>
          )}
        </div>

        {subtotal > 0 && savingsToFreeDelivery > 0 && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-xs bg-primary/8 text-primary border border-primary/20 rounded-lg px-3 py-2.5 leading-relaxed"
          >
            Add{" "}
            <span className="font-bold">
              ${savingsToFreeDelivery.toFixed(2)}
            </span>{" "}
            more for free delivery
          </motion.p>
        )}
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between items-center">
        <span className="font-display font-bold text-lg text-foreground">
          Total
        </span>
        <span className="font-display font-bold text-2xl text-primary">
          ${total.toFixed(2)}
        </span>
      </div>

      <Button
        size="lg"
        className="w-full mt-5 btn-primary text-base py-6"
        onClick={onCheckout}
        data-ocid="cart.checkout_button"
      >
        Proceed to Checkout
      </Button>

      <Link to="/" className="block mt-3">
        <Button
          variant="ghost"
          size="lg"
          className="w-full text-primary hover:text-primary hover:bg-primary/8"
          data-ocid="cart.continue_shopping_link"
        >
          ← Continue Shopping
        </Button>
      </Link>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function CartPage() {
  const { items, addItem, removeItem, updateQuantity, itemCount, totalPrice } =
    useCartContext();
  const navigate = useNavigate();

  function handleRemove(productId: string, snapshot: CartItem) {
    removeItem(productId);
    toast("Item removed from cart", {
      description: snapshot.product.name,
      action: {
        label: "Undo",
        onClick: () => {
          addItem(snapshot.product, snapshot.quantity);
        },
      },
      duration: 5000,
    });
  }

  function handleCheckout() {
    toast.success("Order placed successfully! 🎉", {
      description:
        "Thank you for shopping at FreshMart. We'll be in touch shortly.",
      duration: 6000,
    });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page header strip */}
      <div className="bg-card border-b border-border shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Breadcrumb items={[{ label: "Shopping Cart" }]} />
          <div className="flex items-center gap-3 mt-3">
            <button
              type="button"
              aria-label="Go back"
              data-ocid="cart.back_button"
              onClick={() => navigate({ to: "/" })}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <Separator orientation="vertical" className="h-4" />
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Your Shopping Cart
              {itemCount > 0 && (
                <span className="ml-3 text-base sm:text-lg font-normal text-muted-foreground">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </h1>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <EmptyCartState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* ── Items column ─────────────────────────────────────── */}
            <div className="lg:col-span-2">
              {/* Desktop table */}
              <div
                className="hidden md:block bg-card border border-border rounded-2xl overflow-hidden shadow-subtle"
                data-ocid="cart.table"
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th
                        colSpan={2}
                        className="py-4 pl-6 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Product
                      </th>
                      <th className="py-4 pr-6 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Unit Price
                      </th>
                      <th className="py-4 pr-6 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Qty
                      </th>
                      <th className="py-4 pr-6 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Total
                      </th>
                      <th className="py-4 pr-6" />
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="popLayout">
                      {items.map((item, idx) => (
                        <CartTableRow
                          key={item.productId}
                          item={item}
                          index={idx + 1}
                          onUpdate={updateQuantity}
                          onRemove={handleRemove}
                        />
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Mobile card list */}
              <div
                className="md:hidden bg-card border border-border rounded-2xl px-4 shadow-subtle"
                data-ocid="cart.list"
              >
                <AnimatePresence mode="popLayout">
                  {items.map((item, idx) => (
                    <CartMobileCard
                      key={item.productId}
                      item={item}
                      index={idx + 1}
                      onUpdate={updateQuantity}
                      onRemove={handleRemove}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* ── Sidebar ──────────────────────────────────────────── */}
            <div className="lg:col-span-1">
              <OrderSummary subtotal={totalPrice} onCheckout={handleCheckout} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
