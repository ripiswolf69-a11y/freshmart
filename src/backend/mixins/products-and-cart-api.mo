import Types "../types/products-and-cart";
import Lib "../lib/products-and-cart";
import Map "mo:core/Map";
import List "mo:core/List";

mixin (
  products : List.List<Types.Product>,
  carts : Map.Map<Text, List.List<Types.CartItem>>,
) {
  // --- Product queries ---

  public query func getAllCategories() : async [Text] {
    Lib.getAllCategories(products);
  };

  public query func getProductsByCategory(category : Text) : async [Types.Product] {
    Lib.getProductsByCategory(products, category);
  };

  public query func getProductById(id : Text) : async ?Types.Product {
    Lib.getProductById(products, id);
  };

  public query func searchProducts(searchQuery : Text) : async [Types.Product] {
    Lib.searchProducts(products, searchQuery);
  };

  // --- Cart mutations ---

  public func addToCart(sessionId : Text, productId : Text, quantity : Nat) : async () {
    Lib.addToCart(carts, sessionId, productId, quantity);
  };

  public func removeFromCart(sessionId : Text, productId : Text) : async () {
    Lib.removeFromCart(carts, sessionId, productId);
  };

  public func updateCartQuantity(sessionId : Text, productId : Text, quantity : Nat) : async () {
    Lib.updateCartQuantity(carts, sessionId, productId, quantity);
  };

  public query func getCart(sessionId : Text) : async Types.Cart {
    Lib.getCart(carts, sessionId);
  };

  public func clearCart(sessionId : Text) : async () {
    Lib.clearCart(carts, sessionId);
  };
};
