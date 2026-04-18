module {
  public type Product = {
    id : Text;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    unit : Text;
    inStock : Bool;
    imageUrl : Text;
  };

  public type CartItem = {
    productId : Text;
    quantity : Nat;
  };

  public type Cart = {
    sessionId : Text;
    items : [CartItem];
  };
};
