import Types "types/products-and-cart";
import ProductsAndCartMixin "mixins/products-and-cart-api";
import Lib "lib/products-and-cart";
import Map "mo:core/Map";
import List "mo:core/List";

actor {
  let products : List.List<Types.Product> = Lib.seedProducts();
  let carts : Map.Map<Text, List.List<Types.CartItem>> = Map.empty<Text, List.List<Types.CartItem>>();

  include ProductsAndCartMixin(products, carts);
};
