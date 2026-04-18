import Types "../types/products-and-cart";
import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Nat "mo:core/Nat";

module {
  // --- Product catalog ---

  public func getAllCategories(products : List.List<Types.Product>) : [Text] {
    let seen = Set.empty<Text>();
    products.forEach(func(p) { seen.add(p.category) });
    seen.toArray();
  };

  public func getProductsByCategory(products : List.List<Types.Product>, category : Text) : [Types.Product] {
    let lower = category.toLower();
    products.filter(func(p) { p.category.toLower() == lower }).toArray();
  };

  public func getProductById(products : List.List<Types.Product>, id : Text) : ?Types.Product {
    products.find(func(p) { p.id == id });
  };

  public func searchProducts(products : List.List<Types.Product>, searchQuery : Text) : [Types.Product] {
    let lower = searchQuery.toLower();
    products.filter(func(p) {
      p.name.toLower().contains(#text lower) or
      p.description.toLower().contains(#text lower) or
      p.category.toLower().contains(#text lower)
    }).toArray();
  };

  // --- Cart operations ---

  public func addToCart(
    carts : Map.Map<Text, List.List<Types.CartItem>>,
    sessionId : Text,
    productId : Text,
    quantity : Nat,
  ) {
    let items = switch (carts.get(sessionId)) {
      case (?existing) existing;
      case null {
        let fresh = List.empty<Types.CartItem>();
        carts.add(sessionId, fresh);
        fresh;
      };
    };
    let existing = items.find(func(item : Types.CartItem) : Bool { item.productId == productId });
    switch (existing) {
      case (?found) {
        items.mapInPlace(func(item : Types.CartItem) : Types.CartItem {
          if (item.productId == productId) { { item with quantity = item.quantity + quantity } }
          else item;
        });
      };
      case null {
        items.add({ productId; quantity });
      };
    };
  };

  public func removeFromCart(
    carts : Map.Map<Text, List.List<Types.CartItem>>,
    sessionId : Text,
    productId : Text,
  ) {
    switch (carts.get(sessionId)) {
      case (?items) {
        let filtered = items.filter(func(item : Types.CartItem) : Bool { item.productId != productId });
        items.clear();
        items.append(filtered);
      };
      case null {};
    };
  };

  public func updateCartQuantity(
    carts : Map.Map<Text, List.List<Types.CartItem>>,
    sessionId : Text,
    productId : Text,
    quantity : Nat,
  ) {
    switch (carts.get(sessionId)) {
      case (?items) {
        if (quantity == 0) {
          let filtered = items.filter(func(item : Types.CartItem) : Bool { item.productId != productId });
          items.clear();
          items.append(filtered);
        } else {
          items.mapInPlace(func(item : Types.CartItem) : Types.CartItem {
            if (item.productId == productId) { { item with quantity } }
            else item;
          });
        };
      };
      case null {};
    };
  };

  public func getCart(
    carts : Map.Map<Text, List.List<Types.CartItem>>,
    sessionId : Text,
  ) : Types.Cart {
    let items = switch (carts.get(sessionId)) {
      case (?existing) existing.toArray();
      case null [];
    };
    { sessionId; items };
  };

  public func clearCart(
    carts : Map.Map<Text, List.List<Types.CartItem>>,
    sessionId : Text,
  ) {
    switch (carts.get(sessionId)) {
      case (?items) items.clear();
      case null {};
    };
  };

  // --- Seed data (600 products across 6 categories) ---

  public func seedProducts() : List.List<Types.Product> {
    let list = List.empty<Types.Product>();

    // Category 1: Fresh Vegetables (100 products)
    let vegetables : [(Text, Text, Float, Text)] = [
      ("Organic Baby Spinach", "Tender young spinach leaves, perfect for salads and smoothies. Rich in iron and vitamins.", 2.49, "bunch"),
      ("Roma Tomatoes", "Firm, flavourful roma tomatoes ideal for sauces, salads, and cooking.", 1.99, "kg"),
      ("English Cucumber", "Crisp, seedless English cucumber with mild flavour. Great for salads and snacking.", 1.49, "each"),
      ("Broccoli Crown", "Fresh broccoli crown packed with vitamins C and K. Versatile for steaming, roasting, or stir-frying.", 2.29, "each"),
      ("White Button Mushrooms", "Classic white mushrooms with earthy flavour. Perfect for sautéing and adding to dishes.", 3.49, "250g"),
      ("Red Bell Pepper", "Sweet, crisp red bell pepper loaded with vitamin C. Excellent raw or cooked.", 1.79, "each"),
      ("Yellow Bell Pepper", "Mild and sweet yellow bell pepper. Adds colour and nutrition to any meal.", 1.79, "each"),
      ("Green Bell Pepper", "Classic green bell pepper with a slightly bitter, fresh flavour.", 1.29, "each"),
      ("Orange Bell Pepper", "Vibrant orange bell pepper, sweet and crunchy. High in antioxidants.", 1.89, "each"),
      ("Carrots", "Freshly harvested carrots, naturally sweet and crunchy. Great raw or cooked.", 1.49, "kg"),
      ("Yellow Onions", "Versatile yellow onions with pungent flavour that mellows when cooked.", 0.99, "kg"),
      ("Red Onions", "Mild, slightly sweet red onions. Perfect for salads, pickling, and grilling.", 1.29, "kg"),
      ("Spring Onions", "Fresh spring onions with delicate onion flavour. Great as garnish or in Asian dishes.", 0.99, "bunch"),
      ("Garlic Bulb", "Aromatic garlic bulb with multiple cloves. Essential flavour base for countless dishes.", 0.79, "each"),
      ("Fresh Ginger Root", "Zesty, aromatic ginger root. Adds warmth and flavour to both sweet and savoury dishes.", 1.99, "250g"),
      ("Celery", "Crisp celery stalks with mild, fresh flavour. Excellent for snacking, soups, and stocks.", 1.99, "bunch"),
      ("Leek", "Mild, sweet leek. Wonderful in soups, quiches, and braised dishes.", 1.49, "each"),
      ("Zucchini", "Tender summer zucchini with mild flavour. Versatile for grilling, baking, and spiralizing.", 1.39, "each"),
      ("Eggplant", "Glossy purple eggplant with meaty texture. Perfect for curries, grilling, and dips.", 1.89, "each"),
      ("Cauliflower", "Dense, creamy white cauliflower head. Great roasted, mashed, or as a pizza base.", 3.49, "each"),
      ("Green Cabbage", "Crisp green cabbage with tightly packed leaves. Excellent for coleslaw and stir-fries.", 1.99, "each"),
      ("Red Cabbage", "Vibrant purple-red cabbage with firm texture. Wonderful pickled or braised.", 2.29, "each"),
      ("Brussels Sprouts", "Miniature cabbages with nutty flavour. Delicious roasted with olive oil and garlic.", 3.29, "500g"),
      ("Kale", "Hearty, dark leafy kale packed with nutrients. Great in salads, smoothies, and soups.", 2.99, "bunch"),
      ("Swiss Chard", "Colourful Swiss chard with earthy flavour. Nutritious and versatile in cooking.", 2.49, "bunch"),
      ("Beetroot", "Earthy, sweet beetroot with deep red colour. Delicious roasted, pickled, or juiced.", 1.99, "bunch"),
      ("Radish", "Crisp, peppery radishes. Perfect sliced into salads or served as a snack with butter.", 0.99, "bunch"),
      ("Turnip", "Sweet, slightly peppery turnip. Wonderful in stews, roasted, or mashed.", 1.29, "each"),
      ("Parsnip", "Sweet, nutty parsnip with earthy undertones. Excellent roasted or in hearty soups.", 1.49, "each"),
      ("Sweet Potato", "Rich, naturally sweet sweet potato. Perfect baked, mashed, or in curries.", 1.89, "each"),
      ("Russet Potato", "Classic russet potato with fluffy interior. Ideal for baking, mashing, and frying.", 0.99, "kg"),
      ("Red Potato", "Waxy red-skinned potato that holds its shape when cooked. Great for potato salads.", 1.29, "kg"),
      ("Yukon Gold Potato", "Buttery, golden-fleshed Yukon Gold. Naturally creamy when mashed.", 1.49, "kg"),
      ("Corn on the Cob", "Fresh sweet corn still on the cob. Bursting with natural sweetness.", 0.89, "each"),
      ("Asparagus", "Tender green asparagus spears. Wonderful grilled, roasted, or steamed.", 3.99, "bunch"),
      ("Artichoke", "Whole globe artichoke with tender heart. Delicious steamed with garlic butter.", 2.49, "each"),
      ("Fennel Bulb", "Crisp fennel bulb with mild anise flavour. Delicious raw in salads or roasted.", 2.29, "each"),
      ("Butternut Squash", "Sweet, nutty butternut squash with smooth orange flesh. Perfect for soups and roasting.", 2.99, "each"),
      ("Acorn Squash", "Small, ribbed acorn squash with mildly sweet flesh. Great halved and baked.", 2.49, "each"),
      ("Spaghetti Squash", "Unique spaghetti squash whose flesh separates into noodle-like strands when cooked.", 3.49, "each"),
      ("Watercress", "Peppery, refreshing watercress. Wonderful in salads, sandwiches, and soups.", 1.99, "bunch"),
      ("Arugula", "Peppery, nutty arugula leaves. Excellent as a salad base or pizza topping.", 2.49, "bag"),
      ("Radicchio", "Slightly bitter, purple-red radicchio. Adds colour and bold flavour to salads.", 2.29, "each"),
      ("Endive", "Crisp, mildly bitter endive leaves. Perfect for dipping or in composed salads.", 2.49, "each"),
      ("Bok Choy", "Tender bok choy with mild flavour. A staple in Asian stir-fries and soups.", 1.79, "each"),
      ("Napa Cabbage", "Delicate, slightly sweet napa cabbage. Essential for kimchi and Asian dishes.", 2.49, "each"),
      ("Snow Peas", "Flat, tender snow pea pods. Crisp and sweet, great in stir-fries and salads.", 3.29, "250g"),
      ("Sugar Snap Peas", "Plump, crunchy sugar snap peas. Wonderful as a snack or in salads.", 3.49, "250g"),
      ("Green Beans", "Tender, crisp green beans with fresh flavour. Versatile steamed, sautéed, or raw.", 2.49, "250g"),
      ("Wax Beans", "Mild, tender yellow wax beans. Great steamed as a side dish or in salads.", 2.49, "250g"),
      ("Jalapeño Peppers", "Medium-heat jalapeño peppers. Essential for Mexican dishes, salsas, and pickling.", 1.49, "4-pack"),
      ("Serrano Peppers", "Fiery serrano peppers with bright flavour. Excellent fresh in salsas and hot sauces.", 1.29, "4-pack"),
      ("Poblano Peppers", "Mild, earthy poblano peppers. Perfect for stuffing, roasting, and chiles rellenos.", 1.79, "2-pack"),
      ("Anaheim Peppers", "Mildly spiced Anaheim peppers with sweet undertones. Great for grilling and stuffing.", 1.59, "2-pack"),
      ("Portobello Mushrooms", "Large, meaty portobello caps. Ideal for grilling as a burger substitute or roasting.", 4.49, "2-pack"),
      ("Shiitake Mushrooms", "Rich, smoky shiitake mushrooms. Add deep umami flavour to any dish.", 4.99, "150g"),
      ("Cremini Mushrooms", "Brown cremini mushrooms with deeper flavour than white button mushrooms.", 3.79, "250g"),
      ("Oyster Mushrooms", "Delicate, velvety oyster mushrooms. Wonderful sautéed with butter and herbs.", 5.49, "150g"),
      ("Shallots", "Small, mild shallots with subtle sweetness. Refined flavour for dressings and sauces.", 1.99, "250g"),
      ("Celeriac", "Knobbly celeriac root with celery-like flavour. Delicious mashed or in remoulade.", 2.99, "each"),
      ("Kohlrabi", "Unusual kohlrabi with mild, slightly sweet flavour. Wonderful raw or lightly cooked.", 1.99, "each"),
      ("Daikon Radish", "Long, white daikon radish with mild flavour. Essential in Asian cooking.", 1.79, "each"),
      ("Jicama", "Crisp, mildly sweet jicama root. Refreshing raw in salads or with chilli lime.", 2.49, "each"),
      ("Taro Root", "Starchy, nutty taro root. Used in soups, curries, and traditional island dishes.", 2.29, "each"),
      ("Yuca / Cassava", "Starchy, filling cassava root. Perfect for frying, boiling, or making tapioca.", 1.99, "each"),
      ("Plantain", "Starchy cooking plantain. Delicious fried, boiled, or baked at various ripeness stages.", 0.89, "each"),
      ("Bitter Melon", "Uniquely bitter melon prized in Asian and Caribbean cuisines for health benefits.", 1.99, "each"),
      ("Chayote", "Mild, crisp chayote squash used across Latin American and Asian cuisines.", 1.49, "each"),
      ("Okra", "Tender okra pods with mucilaginous quality. Essential in gumbo and South Asian curries.", 2.49, "250g"),
      ("Edamame (Shelled)", "Young green soybeans, lightly salted. A protein-rich snack or meal addition.", 3.99, "400g"),
      ("Fresh Peas (Shelled)", "Sweet, tender freshly shelled garden peas. Wonderful in risottos and pasta.", 3.49, "250g"),
      ("Baby Corn", "Tender baby corn cobs with sweet, mild flavour. Perfect in stir-fries.", 2.99, "250g"),
      ("Water Chestnuts", "Crisp, fresh water chestnuts. Add crunch to stir-fries and Asian dishes.", 2.99, "250g"),
      ("Lotus Root", "Beautiful lotus root with lacy cross-section. Used in Asian soups and stir-fries.", 3.49, "each"),
      ("Banana Blossom", "Large purple banana flower used as a meat alternative in curries and tacos.", 2.99, "each"),
      ("Hearts of Palm", "Tender, mild hearts of palm. Wonderful in salads or as a ceviche ingredient.", 3.99, "jar"),
      ("Fiddlehead Ferns", "Seasonal fiddlehead ferns, a spring delicacy. Flavour similar to asparagus.", 6.99, "150g"),
      ("Ramps / Wild Garlic", "Foraged wild ramps with pungent garlic-onion flavour. Prized spring vegetable.", 5.99, "bunch"),
      ("Purslane", "Succulent purslane with lemony flavour, high in omega-3. Great in salads.", 2.49, "bunch"),
      ("Samphire", "Salty, crunchy sea samphire. Pairs beautifully with fish and seafood dishes.", 4.99, "100g"),
      ("Purple Sprouting Broccoli", "Tender purple sprouting broccoli with sweet flavour. Roast or steam briefly.", 3.49, "bunch"),
      ("Tenderstem Broccoli", "Long-stemmed, sweet tenderstem broccoli. Delicious grilled or stir-fried.", 3.29, "bunch"),
      ("Romanesco", "Striking lime-green romanesco with fractal pattern and nutty flavour.", 3.99, "each"),
      ("Savoy Cabbage", "Crinkly-leafed savoy cabbage with delicate flavour. Perfect in stews and colcannon.", 2.29, "each"),
      ("Hispi / Pointed Cabbage", "Sweet, tender pointed spring cabbage. Wonderful briefly steamed or charred.", 2.49, "each"),
      ("Purple Kale", "Robust purple kale with earthy flavour. Beautiful in salads and as a cooked green.", 2.99, "bunch"),
      ("Cavolo Nero", "Dark Italian cavolo nero with intense flavour. Essential in ribollita and pasta.", 3.29, "bunch"),
      ("Rainbow Chard", "Colourful rainbow chard with stems in red, yellow, and orange. Nutritious and pretty.", 2.79, "bunch"),
      ("Mustard Greens", "Peppery, pungent mustard greens. Wonderful sautéed with garlic or in Southern cooking.", 2.49, "bunch"),
      ("Collard Greens", "Hearty collard greens with robust flavour. A Southern staple braised with smoked meat.", 2.29, "bunch"),
      ("Turnip Greens", "Slightly bitter turnip greens packed with nutrients. Excellent braised or sautéed.", 1.99, "bunch"),
      ("Beet Greens", "Tender beet greens with earthy flavour. Use like spinach or chard.", 1.79, "bunch"),
      ("Microgreens Mix", "Nutrient-dense microgreen mix including pea shoots, radish, and sunflower.", 4.99, "50g"),
      ("Pea Shoots", "Delicate pea shoots with fresh, sweet flavour. Wonderful in salads and as a garnish.", 3.99, "50g"),
      ("Sunflower Sprouts", "Crisp sunflower sprouts with nutty flavour. High in protein and healthy fats.", 3.49, "50g"),
      ("Alfalfa Sprouts", "Delicate alfalfa sprouts with mild flavour. Great on sandwiches and in salads.", 2.49, "50g"),
      ("Mung Bean Sprouts", "Crisp mung bean sprouts, essential in Asian cuisine. Fresh and crunchy.", 1.99, "150g"),
    ];

    for (i in vegetables.keys()) {
      let (name, desc, price, unit) = vegetables[i];
      list.add({
        id = "veg-" # (i + 1).toText();
        name;
        description = desc;
        price;
        category = "Fresh Vegetables";
        unit;
        inStock = true;
        imageUrl = "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80";
      });
    };

    // Category 2: Fresh Fruits (100 products)
    let fruits : [(Text, Text, Float, Text)] = [
      ("Pink Lady Apples", "Crisp, tangy-sweet Pink Lady apples with a distinctive rosy blush. Perfect for snacking.", 3.49, "kg"),
      ("Granny Smith Apples", "Tart, firm Granny Smith apples with bright green skin. Excellent for baking and juicing.", 2.99, "kg"),
      ("Fuji Apples", "Exceptionally sweet and crisp Fuji apples. One of the world's most popular apple varieties.", 3.29, "kg"),
      ("Gala Apples", "Mild, sweet Gala apples with a red-yellow striped skin. Great for kids and snacking.", 2.79, "kg"),
      ("Honeycrisp Apples", "Renowned for explosive crunch and honey-sweet flavour. A premium apple experience.", 4.99, "kg"),
      ("Braeburn Apples", "Balanced sweet-tart Braeburn apples. Holds up well in cooking and baking.", 3.19, "kg"),
      ("Cox's Orange Pippin", "Classic English dessert apple with complex aromatic flavour. A true heritage variety.", 3.79, "kg"),
      ("Bramley Apples", "Large, tart cooking apple that cooks down to a fluffy purée. The baker's favourite.", 2.49, "kg"),
      ("Navel Oranges", "Seedless navel oranges with sweet, juicy flesh. Easy to peel and perfect for eating fresh.", 3.49, "kg"),
      ("Blood Oranges", "Stunning blood oranges with deep crimson flesh and berry-citrus flavour.", 4.29, "kg"),
      ("Cara Cara Oranges", "Pink-fleshed Cara Cara with sweet, low-acid flavour. Exceptionally juicy.", 4.49, "kg"),
      ("Seville Oranges", "Bitter Seville oranges, the gold standard for homemade marmalade.", 2.99, "kg"),
      ("Mandarins", "Easy-peel mandarins bursting with sweet citrus juice. A family favourite snack.", 3.29, "kg"),
      ("Clementines", "Seedless clementines with glossy skin and intensely sweet flesh.", 3.99, "bag"),
      ("Satsumas", "Loose-skinned, easy-peel satsumas. Exceptionally sweet and juicy with no seeds.", 3.79, "bag"),
      ("Tangerines", "Small, fragrant tangerines with rich, sweet flavour. Great for lunchboxes.", 3.29, "bag"),
      ("Lemons", "Bright, zesty lemons with aromatic skin and tart, flavourful juice.", 0.49, "each"),
      ("Limes", "Fragrant limes essential for cooking, cocktails, and dressings.", 0.39, "each"),
      ("Meyer Lemons", "Sweeter, thinner-skinned Meyer lemons. Wonderful for desserts and cocktails.", 0.69, "each"),
      ("Key Limes", "Small, intensely aromatic Key limes. The essential ingredient for Key lime pie.", 0.59, "each"),
      ("Pink Grapefruit", "Sweet-tart pink grapefruit with blush flesh. Refreshing and high in vitamin C.", 1.29, "each"),
      ("White Grapefruit", "Classic white grapefruit with bold, bitter-tart flavour. A breakfast staple.", 1.09, "each"),
      ("Red Grapefruit", "Ruby-red grapefruit with sweeter, less bitter flavour than white varieties.", 1.39, "each"),
      ("Pomelo", "Giant citrus pomelo, the ancestor of grapefruit. Mild, sweet, and easy to peel.", 2.99, "each"),
      ("Yuzu", "Fragrant Japanese yuzu with complex floral-citrus aroma. Used for zest and juice.", 3.99, "each"),
      ("Finger Limes", "Tiny 'citrus caviar' finger limes with pearl-like vesicles that burst with flavour.", 8.99, "punnet"),
      ("Cavendish Bananas", "Classic yellow Cavendish bananas, creamy and sweet. The world's most popular fruit.", 1.29, "kg"),
      ("Red Bananas", "Unusual red-skinned bananas with creamy, slightly raspberry-flavoured flesh.", 2.99, "bunch"),
      ("Plantain (Ripe)", "Golden ripe plantain, sweet and caramelizable. Perfect fried as maduros.", 0.99, "each"),
      ("Strawberries", "Plump, sun-ripened strawberries bursting with sweet summer flavour.", 3.99, "400g"),
      ("Raspberries", "Delicate, intensely flavoured raspberries. Perfect fresh or for jams and desserts.", 3.49, "125g"),
      ("Blackberries", "Plump, juicy blackberries with deep, complex flavour. Great for crumbles.", 3.29, "150g"),
      ("Blueberries", "Plump blueberries packed with antioxidants and natural sweetness.", 3.99, "300g"),
      ("Gooseberries", "Tart gooseberries with a unique tangy flavour. Wonderful in crumbles and jams.", 4.49, "300g"),
      ("Redcurrants", "Jewel-like red currants with bright, tart flavour. Beautiful garnish and great for jelly.", 3.99, "150g"),
      ("Blackcurrants", "Intensely flavoured blackcurrants, rich in vitamin C. Great for cordials and jams.", 4.29, "150g"),
      ("White Currants", "Delicate, translucent white currants with mild, sweet-tart flavour.", 4.99, "150g"),
      ("Elderberries", "Small, dark elderberries with rich, earthy flavour. Used for cordials and supplements.", 5.99, "150g"),
      ("Goji Berries (Fresh)", "Bright red goji berries with slightly sweet, tangy flavour. Highly nutritious.", 6.99, "150g"),
      ("Mulberries", "Soft, sweet-tart mulberries. A rare treat, similar to blackberries but more complex.", 5.49, "150g"),
      ("Green Grapes (Seedless)", "Sweet, crisp seedless green grapes. Refreshing and perfect for snacking.", 2.99, "500g"),
      ("Red Grapes (Seedless)", "Sweet, succulent red seedless grapes with thin skin and rich flavour.", 3.29, "500g"),
      ("Black Grapes", "Deep purple-black grapes with intense, complex sweetness.", 3.49, "500g"),
      ("Muscat Grapes", "Aromatic Muscat grapes with distinctive floral, honey-like flavour.", 5.99, "250g"),
      ("Concord Grapes", "Quintessential American grape with deep purple skin and bold, foxy flavour.", 4.49, "250g"),
      ("Alphonso Mango", "The king of mangoes. Alphonso with silky, saffron-coloured flesh and heavenly aroma.", 2.49, "each"),
      ("Ataulfo Mango", "Flat, kidney-shaped Ataulfo mango with buttery, fibre-free flesh. Exceptionally sweet.", 1.99, "each"),
      ("Tommy Atkins Mango", "Large, colourful Tommy Atkins mango. Firm flesh and mild, sweet flavour.", 1.79, "each"),
      ("Kent Mango", "Juicy, sweet Kent mango with minimal fibre. One of the finest eating mangoes.", 2.29, "each"),
      ("Keitt Mango", "Large, green-skinned Keitt mango that stays green even when ripe. Rich and sweet.", 2.49, "each"),
      ("Hayden Mango", "Smooth, fleshy Hayden mango with rich sweetness and almost no fibre.", 2.19, "each"),
      ("Williams Pears", "Classic Williams pear with smooth, buttery texture and sweet, intense flavour.", 2.99, "kg"),
      ("Conference Pears", "Popular Conference pears with long, elegant shape and sweet, juicy flesh.", 2.79, "kg"),
      ("Comice Pears", "The finest dessert pear — Comice with meltingly smooth flesh and rich sweetness.", 3.99, "kg"),
      ("Bosc Pears", "Elegant brown-skinned Bosc pears with crisp, dense, spicy-sweet flesh.", 3.29, "kg"),
      ("Asian Pears", "Crisp, apple-like Asian pears with delicate, refreshing sweetness.", 1.99, "each"),
      ("Forelle Pears", "Small, speckled Forelle pears with firm, sweet, mildly tangy flesh.", 3.49, "bag"),
      ("Cavendish Pineapple", "Golden, ripe pineapple with sweet, tangy flesh. Tropical sunshine in every bite.", 2.99, "each"),
      ("Queen Pineapple", "Smaller, more intensely flavoured Queen pineapple. Sweeter than standard varieties.", 3.99, "each"),
      ("Sugarloaf Pineapple", "White-fleshed sugarloaf pineapple with exceptionally sweet, non-acidic flavour.", 5.99, "each"),
      ("Watermelon (Whole)", "Large, juicy seedless watermelon, refreshingly sweet and perfect for summer.", 7.99, "each"),
      ("Mini Watermelon", "Compact seedless mini watermelon, just the right size for smaller households.", 3.99, "each"),
      ("Honeydew Melon", "Sweet, pale green honeydew melon with smooth flesh and honey-like flavour.", 4.49, "each"),
      ("Cantaloupe Melon", "Fragrant cantaloupe with orange flesh, sweet aroma, and high vitamin A content.", 3.99, "each"),
      ("Galia Melon", "Aromatic Galia melon, a cross between cantaloupe and honeydew. Exceptionally sweet.", 4.29, "each"),
      ("Charentais Melon", "Small French Charentais melon with incomparable perfume and intensely sweet flesh.", 5.49, "each"),
      ("Ogen Melon", "Green-fleshed Ogen melon with delicate, sweet flavour. A classic Israeli variety.", 4.99, "each"),
      ("Peaches", "Fragrant, ripe peaches with sweet, juicy flesh and velvety skin.", 3.99, "kg"),
      ("Nectarines", "Smooth-skinned nectarines with sweet, aromatic flesh similar to peaches.", 3.79, "kg"),
      ("Plums", "Juicy, sweet-tart plums in season. Wonderful fresh or baked into tarts.", 3.29, "kg"),
      ("Damsons", "Small, intensely flavoured damsons. The finest variety for jam, gin, and crumbles.", 4.49, "kg"),
      ("Greengages", "Sweet, aromatic greengages with green skin and exceptional honeyed flavour.", 4.99, "kg"),
      ("Mirabelle Plums", "Tiny golden Mirabelle plums from Lorraine with sweet, fragrant flesh.", 5.49, "250g"),
      ("Cherries (Sweet)", "Plump, sweet Bing or Rainier cherries. A summer luxury, perfect eaten fresh.", 6.99, "400g"),
      ("Morello Cherries", "Sour Morello cherries, ideal for cooking, baking, and cherry liqueur.", 5.99, "400g"),
      ("Apricots", "Fragrant, ripe apricots with orange flesh and velvety skin. Sweet with a gentle tang.", 4.29, "500g"),
      ("Figs (Fresh)", "Lusciously ripe fresh figs with honey-sweet flesh. Eat fresh or with cheese.", 4.99, "250g"),
      ("Dates (Fresh Medjool)", "Large, soft Medjool dates with caramel-toffee sweetness. Nature's candy.", 5.99, "250g"),
      ("Passion Fruit", "Wrinkled passion fruit filled with tart, aromatic, seedy pulp. Intensely tropical.", 0.89, "each"),
      ("Pomegranate", "Ruby-red pomegranate packed with jewel-like, sweet-tart arils. High in antioxidants.", 2.49, "each"),
      ("Kiwi Fruit (Green)", "Tangy-sweet green kiwi with bright emerald flesh. Packed with vitamin C.", 0.59, "each"),
      ("Kiwi Fruit (Golden)", "Premium golden kiwi with yellow flesh and sweeter, less acidic flavour.", 0.99, "each"),
      ("Kiwi Berries", "Grape-sized kiwi berries with edible skin and intense kiwi flavour.", 4.49, "150g"),
      ("Star Fruit / Carambola", "Waxy yellow star fruit with crisp, mildly sweet flesh. Stunning when sliced.", 2.29, "each"),
      ("Dragon Fruit (Pink)", "Striking pink dragon fruit with white flesh and black seeds. Mildly sweet.", 3.99, "each"),
      ("Dragon Fruit (Red)", "Red-fleshed dragon fruit with deeper colour and slightly richer flavour.", 4.49, "each"),
      ("Papaya", "Tropical papaya with orange-yellow flesh and sweet, musky flavour. High in enzymes.", 3.99, "each"),
      ("Guava", "Fragrant guava with pink flesh and sweet, tropical flavour. Rich in vitamin C.", 1.99, "each"),
      ("Lychee", "Fragrant lychees with translucent, sweet, floral flesh. A prized tropical treat.", 4.99, "250g"),
      ("Rambutan", "Exotic red rambutan with spiky exterior and sweet, juicy flesh similar to lychee.", 5.99, "250g"),
      ("Longan", "Small longan fruit with translucent flesh and delicate, musky-sweet flavour.", 4.49, "250g"),
      ("Jackfruit (Ripe)", "Sweet ripe jackfruit with fibrous, yellow flesh and tropical, banana-like flavour.", 6.99, "kg"),
      ("Durian", "The king of tropical fruits — creamy, custard-like durian with complex, rich flavour.", 12.99, "each"),
      ("Tamarind (Fresh)", "Fresh tamarind pods with intensely sour-sweet pulp. Essential in Asian cooking.", 2.99, "250g"),
      ("Kumquats", "Tiny kumquats eaten whole — sweet skin with tart flesh. A unique citrus experience.", 3.99, "250g"),
      ("Calamansi", "Small Philippine citrus with intensely sour juice and aromatic skin.", 2.99, "250g"),
      ("Buddha's Hand", "Striking Buddha's Hand citron with intensely fragrant zest and no juice or pulp.", 7.99, "each"),
      ("Feijoa", "Fragrant feijoa with minty, guava-like flavour. Scoop out the jelly-like flesh.", 4.49, "250g"),
      ("Cape Gooseberry", "Golden cape gooseberries in papery husks with sweet-tart flavour. Great garnish.", 3.99, "150g"),
      ("Physalis", "Papery-husked physalis with sweet, tropical flavour. Elegant and nutritious.", 3.79, "150g"),
      ("Ackee", "Buttery, creamy ackee fruit, Jamaica's national fruit. Savoury when cooked.", 5.99, "tin"),
    ];

    for (i in fruits.keys()) {
      let (name, desc, price, unit) = fruits[i];
      list.add({
        id = "frt-" # (i + 1).toText();
        name;
        description = desc;
        price;
        category = "Fresh Fruits";
        unit;
        inStock = true;
        imageUrl = "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80";
      });
    };

    // Category 3: Dairy & Eggs (100 products)
    let dairy : [(Text, Text, Float, Text)] = [
      ("Whole Milk (2L)", "Fresh whole milk from local farms, rich in protein and calcium.", 1.89, "2L"),
      ("Semi-Skimmed Milk (2L)", "Popular semi-skimmed milk with reduced fat and smooth, clean flavour.", 1.79, "2L"),
      ("Skimmed Milk (2L)", "Light skimmed milk with no fat, full of calcium and protein.", 1.69, "2L"),
      ("Organic Whole Milk (1L)", "Certified organic whole milk from pasture-raised cows. Superior taste.", 1.99, "1L"),
      ("Oat Milk (1L)", "Creamy, naturally sweet oat milk. Ideal for coffee and cereal.", 1.89, "1L"),
      ("Almond Milk (Unsweetened, 1L)", "Nutty, light almond milk. Low calorie and lactose-free.", 1.79, "1L"),
      ("Soy Milk (1L)", "Smooth, protein-rich soy milk. A classic dairy alternative.", 1.59, "1L"),
      ("Coconut Milk (1L)", "Rich, creamy coconut milk with tropical flavour. Wonderful in coffee and cooking.", 2.29, "1L"),
      ("Cashew Milk (1L)", "Smooth, creamy cashew milk with subtle nutty flavour and minimal calories.", 2.49, "1L"),
      ("Pea Protein Milk (1L)", "High-protein pea milk, nutritionally comparable to dairy. Environmentally friendly.", 2.69, "1L"),
      ("Salted Butter (250g)", "Rich, creamy salted butter from grass-fed cows. Perfect for spreading and cooking.", 2.49, "250g"),
      ("Unsalted Butter (250g)", "Pure unsalted butter from high-quality cream. Preferred for baking.", 2.49, "250g"),
      ("Organic Butter (250g)", "Certified organic butter with deep yellow colour and exceptional flavour.", 3.29, "250g"),
      ("Clarified Butter / Ghee (250g)", "Pure golden ghee with rich, nutty flavour. High smoke point for frying.", 4.99, "250g"),
      ("Plant-Based Butter (250g)", "Creamy plant-based butter alternative with rich flavour. Vegan-friendly.", 2.99, "250g"),
      ("Double Cream (300ml)", "Indulgent double cream (48% fat) for whipping and rich sauces.", 1.79, "300ml"),
      ("Single Cream (300ml)", "Light, pourable single cream. Perfect for pouring over desserts.", 1.49, "300ml"),
      ("Whipping Cream (300ml)", "Perfect-consistency whipping cream for creating clouds of whipped cream.", 1.69, "300ml"),
      ("Soured Cream (300ml)", "Tangy, thick soured cream. Excellent in dips, dressings, and baked potatoes.", 1.59, "300ml"),
      ("Crème Fraîche (200ml)", "Rich, slightly tangy crème fraîche from France. Will not curdle when heated.", 1.99, "200ml"),
      ("Clotted Cream (113g)", "Thick, golden clotted cream, made by scalding cream. The essential cream tea accompaniment.", 2.49, "113g"),
      ("Coconut Cream (200ml)", "Rich, thick coconut cream for curries, desserts, and tropical cocktails.", 1.59, "200ml"),
      ("Greek Yogurt (500g)", "Thick, creamy Greek yogurt strained to remove whey. High in protein.", 2.99, "500g"),
      ("Natural Yogurt (500g)", "Mild, creamy natural yogurt from whole milk. Versatile for sweet and savoury dishes.", 1.79, "500g"),
      ("Low-Fat Yogurt (500g)", "Light low-fat yogurt with smooth texture and mild, clean flavour.", 1.59, "500g"),
      ("Skyr (450g)", "Icelandic-style skyr, thick and creamy with very high protein content.", 2.49, "450g"),
      ("Kefir (500ml)", "Fermented kefir packed with probiotics for gut health. Tangy and refreshing.", 2.99, "500ml"),
      ("Labneh (200g)", "Strained yogurt cheese from the Middle East. Creamy and tangy, great with olive oil.", 3.49, "200g"),
      ("Coconut Yogurt (400g)", "Dairy-free coconut yogurt with smooth texture and natural coconut flavour.", 2.79, "400g"),
      ("Oat Yogurt (400g)", "Creamy oat-based yogurt with subtle natural sweetness. Dairy-free.", 2.59, "400g"),
      ("Cheddar (Mature, 400g)", "Sharp, crumbly mature Cheddar aged for depth of flavour. A British classic.", 4.49, "400g"),
      ("Mild Cheddar (400g)", "Smooth, creamy mild Cheddar with gentle flavour. Beloved by all ages.", 3.99, "400g"),
      ("Extra Mature Cheddar (200g)", "Intensely flavoured extra-mature Cheddar with crystalized texture.", 3.79, "200g"),
      ("Red Leicester (200g)", "Nutty, tangy Red Leicester with distinctive orange colour from annatto.", 2.99, "200g"),
      ("Double Gloucester (200g)", "Smooth, buttery Double Gloucester with mellow, slightly sweet flavour.", 2.99, "200g"),
      ("Stilton (200g)", "King of British cheeses. Creamy blue Stilton with complex, tangy flavour.", 4.99, "200g"),
      ("Gorgonzola (150g)", "Italian blue cheese, available dolce (mild) or piccante (sharp).", 4.79, "150g"),
      ("Roquefort (100g)", "The original blue cheese from France, made with sheep's milk. Rich and pungent.", 5.49, "100g"),
      ("Brie (200g)", "Soft, white-rinded French Brie with creamy interior and earthy, mushroom flavour.", 3.99, "200g"),
      ("Camembert (250g)", "Normandy Camembert, richer and more intense than Brie. Bake whole for elegance.", 3.49, "250g"),
      ("Mozzarella (125g)", "Fresh, milky Italian mozzarella in brine. Essential for Caprese and pizza.", 1.79, "125g"),
      ("Burrata (125g)", "Luxurious burrata with creamy, stracciatella filling. Worth every calorie.", 3.99, "125g"),
      ("Feta (200g)", "Crumbly, salty Greek feta from sheep and goat's milk. Essential in Greek salad.", 2.79, "200g"),
      ("Halloumi (225g)", "Firm Cypriot halloumi that squeaks and grills without melting. BBQ essential.", 3.99, "225g"),
      ("Ricotta (250g)", "Light, mild Italian ricotta. Wonderful in pasta, pastries, and spread on toast.", 2.99, "250g"),
      ("Mascarpone (250g)", "Rich, velvety Italian mascarpone. Essential for tiramisu and creamy pasta sauces.", 2.49, "250g"),
      ("Cottage Cheese (300g)", "Light, chunky cottage cheese with mild flavour. High in protein, low in fat.", 1.99, "300g"),
      ("Cream Cheese (200g)", "Smooth, spreadable cream cheese. Perfect on bagels, in cheesecakes, and dips.", 1.99, "200g"),
      ("Quark (250g)", "German-style quark, similar to cream cheese but lighter. Excellent in baking.", 2.29, "250g"),
      ("Parmesan (100g)", "Hard, aged Parmigiano-Reggiano with deep umami flavour. Grate over pasta.", 3.99, "100g"),
      ("Pecorino Romano (100g)", "Sharp, salty Italian sheep's milk cheese. Essential for cacio e pepe.", 3.79, "100g"),
      ("Comté (100g)", "Nutty, sweet French Comté, aged in alpine caves. Complex and versatile.", 4.49, "100g"),
      ("Gruyère (100g)", "Swiss Gruyère with sweet, nutty flavour that melts beautifully. Perfect for fondue.", 4.29, "100g"),
      ("Emmental (200g)", "Classic Swiss Emmental with distinctive holes and mild, sweet-nutty flavour.", 3.49, "200g"),
      ("Gouda (Young, 200g)", "Mild, springy young Gouda. Melts well and has a creamy, buttery flavour.", 3.29, "200g"),
      ("Aged Gouda (200g)", "Intense, crystalline aged Gouda with deep caramel and butterscotch notes.", 5.49, "200g"),
      ("Edam (200g)", "Mild, slightly rubbery Edam. Low in fat and versatile for slicing and melting.", 2.99, "200g"),
      ("Manchego (100g)", "Spanish sheep's milk Manchego with distinctive woven rind pattern. Firm and tasty.", 5.29, "100g"),
      ("Taleggio (150g)", "Washed-rind Italian Taleggio with pungent aroma but surprisingly mild flavour.", 4.99, "150g"),
      ("Raclette (200g)", "Swiss raclette cheese designed for melting over potatoes. Rich and gooey.", 5.49, "200g"),
      ("Wensleydale (150g)", "Crumbly Yorkshire Wensleydale, moist and mild with a hint of honey.", 3.79, "150g"),
      ("Cheddar with Chives (200g)", "Mature Cheddar blended with fresh chives. Excellent as a ploughman's.", 3.49, "200g"),
      ("Smoked Cheddar (200g)", "Traditional smoked Cheddar with gentle smokiness and firm texture.", 3.59, "200g"),
      ("Goat's Cheese Log (150g)", "Soft, fresh goat's cheese with tangy, slightly earthy flavour.", 3.49, "150g"),
      ("Aged Goat's Cheese (100g)", "Firm, mature goat's cheese with concentrated tangy flavour.", 4.29, "100g"),
      ("Sheep's Milk Yogurt (400g)", "Creamy, richly flavoured sheep's milk yogurt. Higher in fat and protein than cow's.", 3.99, "400g"),
      ("Butter Milk (500ml)", "Tangy, cultured buttermilk. Essential for fluffy American pancakes and tenderising.", 1.29, "500ml"),
      ("Chocolate Milk (500ml)", "Rich, indulgent chocolate milk made with real cocoa. A childhood favourite.", 1.59, "500ml"),
      ("Strawberry Milk (500ml)", "Creamy strawberry-flavoured milk with real strawberry. Refreshing and fun.", 1.59, "500ml"),
      ("Condensed Milk (397g)", "Sweet, thick condensed milk. Essential for fudge, toffee, and Asian desserts.", 1.69, "397g"),
      ("Evaporated Milk (410g)", "Unsweetened evaporated milk with creamy consistency. Great in coffee and curries.", 1.29, "410g"),
      ("Free-Range Eggs (6 large)", "Fresh free-range eggs with golden yolks. Produced by hens with outdoor access.", 1.99, "6-pack"),
      ("Organic Eggs (6 large)", "Certified organic eggs from truly free-range, organically fed hens.", 2.99, "6-pack"),
      ("Free-Range Eggs (12 large)", "Economical 12-pack of fresh, large free-range eggs.", 3.49, "12-pack"),
      ("Barn Eggs (12 large)", "Fresh barn eggs from hens housed in spacious, comfortable barns.", 2.49, "12-pack"),
      ("Duck Eggs (6)", "Rich, creamy duck eggs with larger yolks. Exceptional for baking and frying.", 3.99, "6-pack"),
      ("Quail Eggs (12)", "Delicate quail eggs, speckled and miniature. Elegant in salads and as canapés.", 2.99, "12-pack"),
      ("Goose Eggs (2)", "Enormous goose eggs with rich, creamy yolks. Equal to about 3 hen's eggs each.", 3.49, "2-pack"),
      ("Ostrich Egg", "A genuine ostrich egg, equivalent to 24 hen's eggs. A dramatic culinary experience.", 29.99, "each"),
      ("Liquid Egg Whites (500ml)", "Pasteurised, ready-to-use liquid egg whites. Convenient for meringues and baking.", 3.29, "500ml"),
      ("Scrambled Egg Mix (500ml)", "Pre-mixed, seasoned liquid egg perfect for quick scrambled eggs.", 2.99, "500ml"),
      ("Sour Milk Cheese (200g)", "Traditional Eastern European sour milk cheese. Dry, crumbly, and tangy.", 3.49, "200g"),
      ("Aged Brie (150g)", "Matured brie with more assertive flavour and runny interior.", 4.29, "150g"),
      ("Cheddar Slices (10)", "Individually wrapped Cheddar slices, perfect for burgers and sandwiches.", 2.49, "10-pack"),
      ("Processed Cheese Slices (10)", "Individually wrapped processed cheese slices. Classic for grilled cheese.", 1.99, "10-pack"),
      ("Mozzarella Block (400g)", "Firm mozzarella block for shredding. Melts beautifully on pizza.", 3.49, "400g"),
      ("Cheese Strings (8)", "Fun, stringy cheese snacks for kids. Made from real mozzarella.", 2.79, "8-pack"),
      ("Babybel (6)", "Iconic mini Babybel rounds in red wax. A perfect lunchbox cheese.", 3.29, "6-pack"),
      ("Laughing Cow Triangles (8)", "Smooth, creamy Laughing Cow cheese triangles. Great for spreading.", 2.49, "8-pack"),
      ("Philadelphia Cream Cheese (200g)", "The original cream cheese. Smooth and versatile for spreading and cooking.", 2.29, "200g"),
      ("Quark with Herbs (200g)", "Creamy quark blended with fresh herbs. Perfect as a dip or spread.", 2.49, "200g"),
      ("Tzatziki (200g)", "Greek yogurt dip with cucumber and dill. Refreshing and protein-rich.", 2.49, "200g"),
      ("Natural Fromage Frais (500g)", "Smooth, mild fromage frais. Low fat and versatile for desserts and dips.", 1.99, "500g"),
      ("Fromage Frais (Children's, 6-pack)", "Smooth, mild fromage frais in fun individual pots. Ideal for children's lunchboxes.", 2.29, "6-pack"),
      ("Butter Spread (500g)", "Soft, spreadable butter blend that spreads straight from the fridge.", 2.49, "500g"),
      ("Light Butter Spread (500g)", "Lighter version of spreadable butter with reduced fat content.", 2.29, "500g"),
      ("Vegan Cream Cheese (180g)", "Smooth, dairy-free cream cheese alternative made from cashews or tofu.", 2.99, "180g"),
      ("Vegan Mozzarella (200g)", "Stretchy, meltable plant-based mozzarella. Excellent on vegan pizza.", 3.49, "200g"),
      ("Vegan Cheddar (200g)", "Sliceable plant-based Cheddar with mild, satisfying flavour.", 3.29, "200g"),
      ("Paneer (200g)", "Firm Indian fresh cheese that holds its shape when cooked. Essential for palak paneer.", 2.99, "200g"),
    ];

    for (i in dairy.keys()) {
      let (name, desc, price, unit) = dairy[i];
      list.add({
        id = "dae-" # (i + 1).toText();
        name;
        description = desc;
        price;
        category = "Dairy & Eggs";
        unit;
        inStock = true;
        imageUrl = "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80";
      });
    };

    // Category 4: Bakery & Bread (100 products)
    let bakery : [(Text, Text, Float, Text)] = [
      ("White Sliced Loaf", "Soft, pillowy white sliced bread. Perfect for sandwiches, toast, and packed lunches.", 1.29, "800g"),
      ("Wholemeal Sliced Loaf", "Hearty wholemeal bread packed with fibre. Nutty flavour and satisfying texture.", 1.49, "800g"),
      ("Seeded Bloomer", "Rustic bloomer studded with sunflower, pumpkin, and sesame seeds. Superb toast.", 2.49, "each"),
      ("Sourdough Loaf", "Artisan sourdough with chewy crumb, crisp crust, and complex tangy flavour.", 3.49, "each"),
      ("Sourdough Baguette", "Crisp-crusted sourdough baguette. Perfect with cheese or as garlic bread.", 2.29, "each"),
      ("French Baguette", "Classic French baguette with airy crumb and golden, crisp crust.", 1.49, "each"),
      ("Ciabatta Loaf", "Italian ciabatta with open, airy texture and olive-oil richness. Great for panini.", 2.29, "each"),
      ("Focaccia (Rosemary & Sea Salt)", "Pillowy focaccia dimpled with rosemary and flaky sea salt. Fragrant and satisfying.", 3.49, "each"),
      ("Focaccia (Olive & Tomato)", "Rustic focaccia topped with black olives and sun-dried tomatoes.", 3.79, "each"),
      ("Rye Bread (Dark)", "Dense, moist dark rye bread with earthy, malty flavour. Rich in fibre.", 2.99, "each"),
      ("Pumpernickel", "Traditional German pumpernickel made with whole rye. Dense, dark, and nutritious.", 2.79, "each"),
      ("Spelt Loaf", "Nutty, slightly sweet spelt bread. Easier to digest than wheat for many people.", 3.29, "each"),
      ("Gluten-Free White Loaf", "Soft, light gluten-free white bread. Suitable for coeliacs and gluten-intolerant.", 3.49, "each"),
      ("Gluten-Free Seeded Loaf", "Nutty, seeded gluten-free loaf packed with flavour and texture.", 3.99, "each"),
      ("Multigrain Loaf", "Hearty multigrain loaf with oats, barley, and wheat. Rich in fibre and nutrients.", 2.49, "each"),
      ("Granary Loaf", "Malted grain Granary bread with nutty flavour and satisfying chew.", 2.69, "each"),
      ("Tiger Bread", "Distinctive crackle-crusted tiger bread with soft white interior. Popular with all ages.", 1.99, "each"),
      ("Milk Loaf", "Soft, slightly sweet milk bread. Wonderful for French toast and soft sandwiches.", 2.29, "each"),
      ("Brioche Loaf", "Butter and egg enriched brioche with golden crust and fluffy, rich interior.", 3.49, "each"),
      ("Brioche Buns (4-pack)", "Buttery brioche burger buns, light and tender. Elevate any burger or sandwich.", 2.99, "4-pack"),
      ("White Rolls (6-pack)", "Soft, pillowy white dinner rolls. Ideal for rolls, sliders, and sides.", 1.79, "6-pack"),
      ("Seeded Rolls (4-pack)", "Soft rolls topped with a mix of seeds. Flavourful and versatile.", 2.29, "4-pack"),
      ("Wholemeal Rolls (6-pack)", "Hearty wholemeal rolls with mild nutty flavour. Good for packed lunches.", 1.99, "6-pack"),
      ("Ciabatta Rolls (4-pack)", "Mini ciabatta rolls with airy crumb. Perfect for Italian-style sandwiches.", 2.49, "4-pack"),
      ("Baguette Rolls (4-pack)", "Crusty baguette-style rolls with chewy interior. Great for filling.", 2.29, "4-pack"),
      ("Plain Croissants (4-pack)", "Flaky, buttery French croissants with honeycomb layers. Freshly baked.", 3.49, "4-pack"),
      ("Almond Croissants (2-pack)", "Croissants filled with almond cream and topped with flaked almonds.", 3.29, "2-pack"),
      ("Chocolate Croissants / Pain au Chocolat (4-pack)", "Flaky pastry wrapped around a bar of dark chocolate. A morning treat.", 3.99, "4-pack"),
      ("Pain aux Raisins (4-pack)", "Spiral Danish pastry with custard and plump raisins. Classic Viennoiserie.", 3.99, "4-pack"),
      ("Danish Pastry Selection (4-pack)", "Assorted Danish pastries — apricot, custard, cinnamon, and berry.", 4.49, "4-pack"),
      ("Cinnamon Swirls (4-pack)", "Pillowy cinnamon rolls with sticky glaze. Irresistible warm from the oven.", 3.49, "4-pack"),
      ("Chelsea Buns (4-pack)", "Classic English Chelsea buns with currants and sweet sticky glaze.", 3.29, "4-pack"),
      ("Hot Cross Buns (4-pack)", "Spiced buns with currants and a white cross. Wonderful toasted with butter.", 2.49, "4-pack"),
      ("Crumpets (6-pack)", "Spongy crumpets with hundreds of tiny holes to soak up butter. Quintessentially British.", 1.49, "6-pack"),
      ("English Muffins (6-pack)", "Nooks-and-crannies English muffins. Perfect toasted with butter or eggs Benedict.", 1.99, "6-pack"),
      ("Pittas (6-pack)", "Soft, pocketed pitta breads. Ideal for falafel, dips, and wraps.", 1.49, "6-pack"),
      ("Wholemeal Pittas (6-pack)", "Hearty wholemeal pittas with extra fibre. Great with hummus and salads.", 1.69, "6-pack"),
      ("Naan Breads (2-pack)", "Soft, pillowy naan bread. Wonderful warmed with curry or used as a flatbread pizza.", 1.99, "2-pack"),
      ("Garlic & Coriander Naan (2-pack)", "Flavour-packed naan with garlic and coriander. The perfect curry companion.", 2.29, "2-pack"),
      ("Plain Chapatis (8-pack)", "Soft, thin whole-wheat chapatis. A staple of South Asian cuisine.", 1.99, "8-pack"),
      ("Roti (6-pack)", "Fresh, soft whole-wheat roti. Served with dhal, curries, and vegetable dishes.", 1.79, "6-pack"),
      ("Corn Tortillas (8-pack)", "Traditional stone-ground corn tortillas. Essential for tacos and enchiladas.", 2.49, "8-pack"),
      ("Flour Tortillas (8-pack)", "Soft, pliable flour tortillas. Perfect for burritos, quesadillas, and wraps.", 1.99, "8-pack"),
      ("Seeded Wraps (6-pack)", "Thin, flexible wraps studded with seeds. Great for wraps, fajitas, and pizza bases.", 2.29, "6-pack"),
      ("Wholemeal Wraps (6-pack)", "Nutritious wholemeal wraps with extra fibre. Versatile for any filling.", 2.19, "6-pack"),
      ("Bagels (4-pack)", "Chewy, doughy New York-style bagels. Perfect toasted with cream cheese.", 2.29, "4-pack"),
      ("Everything Bagels (4-pack)", "Bagels coated in a blend of sesame, poppy seeds, onion, and garlic.", 2.79, "4-pack"),
      ("Pretzel Rolls (4-pack)", "Chewy pretzel-style rolls with dark crust and a sprinkle of coarse salt.", 3.29, "4-pack"),
      ("Soft Pretzels (2-pack)", "Large, authentic soft pretzels with chewy texture and salty crust.", 2.99, "2-pack"),
      ("Pita Chips (125g)", "Crispy baked pita chips seasoned with herbs. Perfect for dipping.", 2.49, "125g"),
      ("Plain Scones (4-pack)", "Classic British plain scones. Serve with clotted cream and strawberry jam.", 2.49, "4-pack"),
      ("Fruit Scones (4-pack)", "Tender scones packed with juicy sultanas and currants. A perfect afternoon treat.", 2.79, "4-pack"),
      ("Cheese Scones (4-pack)", "Savoury mature Cheddar scones. Wonderful warm with butter.", 2.99, "4-pack"),
      ("Blueberry Scones (4-pack)", "Light, crumbly scones studded with fresh blueberries.", 3.29, "4-pack"),
      ("Victoria Sponge", "Light, golden Victoria sponge sandwich filled with jam and buttercream.", 4.99, "each"),
      ("Carrot Cake", "Moist, spiced carrot cake with cream cheese frosting. Irresistible.", 5.49, "each"),
      ("Lemon Drizzle Cake", "Zingy lemon drizzle cake soaked in tart lemon syrup. Bright and refreshing.", 4.79, "each"),
      ("Coffee & Walnut Cake", "Classic coffee and walnut sponge with coffee buttercream. A British favourite.", 5.29, "each"),
      ("Banana Bread Loaf", "Moist, naturally sweet banana bread with warming spices. Perfect with butter.", 3.49, "each"),
      ("Courgette & Lemon Loaf", "Moist courgette loaf with bright lemon zest. Subtly sweet and delicious.", 3.99, "each"),
      ("Gingerbread Loaf", "Warmly spiced gingerbread loaf with treacly depth. Keeps well for days.", 3.79, "each"),
      ("Marble Cake", "Beautiful marble cake swirled with chocolate and vanilla sponge.", 4.29, "each"),
      ("Chocolate Brownies (4-pack)", "Dense, fudgy chocolate brownies with crisp tops. True chocoholic delight.", 3.99, "4-pack"),
      ("Blondies (4-pack)", "Chewy, butterscotch-flavoured blondies with white chocolate chunks.", 3.79, "4-pack"),
      ("Rocky Road (4-pack)", "Chocolate, marshmallow, and biscuit rocky road. Sweet and indulgent.", 3.49, "4-pack"),
      ("Millionaire's Shortbread (4-pack)", "Buttery shortbread, thick caramel, and dark chocolate. Truly indulgent.", 4.29, "4-pack"),
      ("Shortbread Fingers (8-pack)", "Classic buttery Scottish shortbread. Melt-in-the-mouth texture.", 2.49, "8-pack"),
      ("Flapjacks (4-pack)", "Chewy, golden oat flapjacks with butter and golden syrup.", 2.99, "4-pack"),
      ("Caramel Flapjacks (4-pack)", "Golden oat flapjacks with a layer of soft caramel. Extra indulgent.", 3.29, "4-pack"),
      ("Muffins - Blueberry (4-pack)", "Moist, domed blueberry muffins bursting with fresh berries.", 3.49, "4-pack"),
      ("Muffins - Chocolate Chip (4-pack)", "Soft, tender chocolate chip muffins with generous chunks.", 3.49, "4-pack"),
      ("Muffins - Bran (4-pack)", "Wholesome bran muffins, high in fibre and lightly sweet.", 2.99, "4-pack"),
      ("Muffins - Lemon & Poppy Seed (4-pack)", "Tangy lemon muffins with poppy seed texture. Light and refreshing.", 3.29, "4-pack"),
      ("Cupcakes Vanilla (6-pack)", "Light vanilla cupcakes topped with swirls of buttercream. Party-ready.", 4.99, "6-pack"),
      ("Cupcakes Chocolate (6-pack)", "Rich chocolate cupcakes with chocolate buttercream. Chocolate lovers' dream.", 4.99, "6-pack"),
      ("Eccles Cakes (4-pack)", "Flaky pastry rounds filled with spiced currants. A beloved Northern English treat.", 2.99, "4-pack"),
      ("Iced Finger Buns (4-pack)", "Soft buns filled with cream and topped with pink icing. Nostalgic and delicious.", 2.99, "4-pack"),
      ("Doughnuts - Jam (4-pack)", "Pillowy jam doughnuts dusted with caster sugar. Filled with sweet jam.", 2.99, "4-pack"),
      ("Doughnuts - Glazed Ring (4-pack)", "Classic glazed ring doughnuts, light and sweet.", 3.29, "4-pack"),
      ("Doughnuts - Filled Cream (2-pack)", "Large cream-filled doughnuts. Indulgent and generously filled.", 2.49, "2-pack"),
      ("Macarons (6-pack)", "French macarons in seasonal flavours — raspberry, pistachio, and salted caramel.", 6.99, "6-pack"),
      ("Meringue Nests (6-pack)", "Crisp, light meringue nests ready for cream and berries. Effortless elegance.", 2.99, "6-pack"),
      ("Profiteroles (12-pack)", "Light choux puffs filled with cream and drizzled with chocolate sauce.", 5.49, "12-pack"),
      ("Eclairs (4-pack)", "Classic chocolate-glazed éclairs filled with whipped pastry cream.", 4.29, "4-pack"),
      ("Tarte Tatin (individual)", "Individual upside-down caramelised apple tart. Beautifully rustic and delicious.", 3.49, "each"),
      ("Lemon Tart (individual)", "Silky, intensely flavoured lemon tart in a crisp pastry shell.", 3.29, "each"),
      ("Custard Tarts (4-pack)", "Portuguese-style pastel de nata with flaky pastry and custardy filling.", 3.49, "4-pack"),
      ("Pecan Pie Slice", "Rich, caramelised pecan pie slice with buttery pastry. Deep Southern flavour.", 3.99, "each"),
      ("Baklava (6-pack)", "Crisp, honey-soaked filo pastry layered with crushed pistachios and walnuts.", 5.99, "6-pack"),
      ("Kanelbullar (4-pack)", "Swedish cinnamon buns with cardamom, twisted and pearl-sugared. Fika perfection.", 3.99, "4-pack"),
      ("Kouign-Amann", "Breton pastry with caramelised, crunchy layers and buttery interior. Extraordinary.", 4.49, "each"),
      ("Madeleine (6-pack)", "Shell-shaped French madeleines, delicately flavoured with lemon and honey.", 3.29, "6-pack"),
      ("Financiers (6-pack)", "Golden, moist French financiers made with brown butter and almonds.", 3.49, "6-pack"),
      ("Canelés (4-pack)", "Bordelais canelés with dark, caramelised exterior and custard centre.", 4.99, "4-pack"),
      ("Garibaldi Biscuits (10-pack)", "Classic British Garibaldi biscuits with a layer of currants. A teatime staple.", 1.29, "10-pack"),
      ("Digestive Biscuits (16-pack)", "Crunchy wheat digestive biscuits. Perfect with tea and cheese.", 1.49, "16-pack"),
      ("Oat Biscuits (12-pack)", "Crisp, wholesome oat biscuits with natural flavour. Great with cheese.", 1.79, "12-pack"),
    ];

    for (i in bakery.keys()) {
      let (name, desc, price, unit) = bakery[i];
      list.add({
        id = "bak-" # (i + 1).toText();
        name;
        description = desc;
        price;
        category = "Bakery & Bread";
        unit;
        inStock = true;
        imageUrl = "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80";
      });
    };

    // Category 5: Meat & Poultry (100 products)
    let meat : [(Text, Text, Float, Text)] = [
      ("Chicken Breast Fillets (2-pack)", "Lean, versatile skinless chicken breast fillets from free-range birds.", 4.99, "400g"),
      ("Chicken Thigh Fillets (4-pack)", "Boneless, skinless chicken thighs. Juicier than breast meat, full of flavour.", 4.49, "600g"),
      ("Chicken Drumsticks (6-pack)", "Free-range chicken drumsticks. Economical and full of flavour. Perfect roasted.", 3.99, "700g"),
      ("Chicken Wings (12-pack)", "Fresh chicken wings, perfect for BBQ, buffalo sauce, or oven-baking.", 4.49, "800g"),
      ("Whole Chicken (medium)", "Whole free-range chicken, ready to roast. The Sunday dinner centrepiece.", 8.99, "1.5kg"),
      ("Whole Chicken (large)", "Large free-range whole chicken. Feeds a family with meat left for sandwiches.", 11.99, "2kg"),
      ("Organic Whole Chicken", "Certified organic, free-range whole chicken with exceptional flavour.", 15.99, "1.5kg"),
      ("Chicken Crown", "Chicken crown with two breast fillets on the bone. Elegant and easy to carve.", 9.99, "each"),
      ("Chicken Legs (2-pack)", "Whole chicken legs with drumstick and thigh. Juicy and economical.", 4.99, "600g"),
      ("Chicken Mini Fillets (10-pack)", "Tender chicken mini fillets, quick-cooking and versatile.", 4.79, "500g"),
      ("Turkey Breast Fillet", "Large turkey breast fillet, lean and delicious year-round.", 6.99, "600g"),
      ("Turkey Crown", "Turkey crown — the breast on the bone. A smaller, manageable alternative to whole turkey.", 18.99, "2kg"),
      ("Turkey Mince", "Lean turkey mince. A healthier alternative to beef in burgers and meatballs.", 3.99, "500g"),
      ("Duck Breast (2-pack)", "Premium duck breast fillets with rich, gamey flavour. Score the skin and sear to perfection.", 8.99, "400g"),
      ("Whole Duck", "Whole free-range duck. Render the fat for the crispiest roast potatoes.", 14.99, "2kg"),
      ("Duck Legs (2-pack)", "Succulent duck legs, perfect for slow-braising or confit.", 8.49, "600g"),
      ("Beef Ribeye Steak (2-pack)", "Well-marbled ribeye steaks cut from the rib section. King of steaks for flavour.", 16.99, "400g"),
      ("Beef Sirloin Steak (2-pack)", "Classic sirloin steaks, tender with a strip of flavourful fat. Restaurant quality.", 14.99, "400g"),
      ("Beef Fillet Steak (2-pack)", "Tender, lean beef fillet. The most prized cut, meltingly tender.", 22.99, "300g"),
      ("Beef T-Bone Steak", "Impressive T-bone steak with both sirloin and tenderloin. A caveman cut.", 18.99, "500g"),
      ("Beef Rump Steak (2-pack)", "Firm, full-flavoured rump steak. Best cooked rare to medium-rare.", 11.99, "400g"),
      ("Beef Flank Steak", "Lean, flavoursome flank steak. Perfect marinated and grilled or for stir-fries.", 9.99, "400g"),
      ("Beef Skirt Steak", "Richly flavoured skirt steak. Excellent marinated and quick-grilled.", 8.99, "400g"),
      ("Beef Bavette / Flap Steak", "The French butcher's cut — bavette with intense beefy flavour.", 10.99, "400g"),
      ("Beef Mince (20% fat)", "Standard beef mince, ideal for burgers, meatballs, and Bolognese.", 4.49, "500g"),
      ("Lean Beef Mince (5% fat)", "Extra lean beef mince for healthy cooking without sacrificing flavour.", 4.99, "500g"),
      ("Beef Chuck Roast", "Well-marbled beef chuck for slow cooking, pot roast, and stews.", 8.99, "1kg"),
      ("Beef Brisket", "Whole beef brisket for low-and-slow smoking or braising. Melting tenderness.", 12.99, "1.5kg"),
      ("Beef Short Ribs", "Meaty, collagen-rich beef short ribs. Braise for hours for fall-off-the-bone results.", 11.99, "800g"),
      ("Beef Back Ribs (rack)", "Beef back ribs, perfect for the BBQ or slow-roasted in the oven.", 14.99, "1kg"),
      ("Beef Oxtail", "Gelatinous, flavour-rich oxtail for slow-braised stews and soups.", 7.99, "600g"),
      ("Beef Cheeks (2-pack)", "Intensely flavoured beef cheeks that braise to silky tenderness.", 9.99, "600g"),
      ("Beef Shin (bone-in)", "Beef shin on the bone, revealing beautiful marrow. Ideal for osso buco.", 7.99, "800g"),
      ("Beef Topside Joint", "Lean beef topside roasting joint. Classic Sunday roast centrepiece.", 11.99, "1.5kg"),
      ("Beef Silverside", "Lean silverside joint for pot roasting or boiling with root vegetables.", 10.99, "1.2kg"),
      ("Pork Tenderloin", "Supremely lean and tender pork fillet. Quick to cook and wonderfully versatile.", 5.99, "450g"),
      ("Pork Loin Chops (2-pack)", "Thick-cut pork loin chops with bone. Grill or pan-fry to perfection.", 5.49, "500g"),
      ("Pork Shoulder Steaks (2-pack)", "Economical, flavourful pork shoulder steaks. Wonderful marinated and grilled.", 4.49, "400g"),
      ("Pork Belly Slices (4-pack)", "Crispy-fat pork belly slices. Perfect BBQ, slow-roast, or Asian braise.", 5.99, "500g"),
      ("Pork Belly Joint", "Whole pork belly joint with skin. Slow-roast for crackling and melting meat.", 9.99, "1.2kg"),
      ("Pork Spare Ribs", "Pork spare ribs, meaty and full of flavour. Low-and-slow or BBQ.", 7.99, "800g"),
      ("Baby Back Ribs (rack)", "Tender baby back pork ribs. More meat than spare ribs, quicker to cook.", 9.99, "700g"),
      ("Pork Mince", "Versatile pork mince for dim sum, meatballs, and Asian recipes.", 3.99, "500g"),
      ("Pork & Apple Sausages (6-pack)", "Traditional pork sausages with apple and a herby seasoning. Wonderful for a bangers dinner.", 3.99, "400g"),
      ("Cumberland Sausages (6-pack)", "Long, coiled Cumberland sausages with distinctive pepper and herb seasoning.", 3.79, "400g"),
      ("Lincolnshire Sausages (6-pack)", "Coarse-textured Lincolnshire sausages with sage and thyme. An English classic.", 3.79, "400g"),
      ("Chorizo Ring", "Semi-cured Spanish chorizo ring with paprika and garlic. Slice and cook or eat cold.", 3.49, "250g"),
      ("Italian Salami (sliced)", "Classic Italian salami with peppercorns and herbs. Antipasto essential.", 2.99, "100g"),
      ("Pepperoni (sliced)", "Thinly sliced pepperoni with paprika and fennel. The pizza topping of choice.", 2.49, "100g"),
      ("Prosciutto di Parma", "Authentic Parma ham, air-dried for months. Silky, sweet and melt-in-the-mouth.", 3.99, "100g"),
      ("Serrano Ham (sliced)", "Spanish mountain-cured Serrano ham. Rich, savoury, and intensely flavoured.", 3.49, "100g"),
      ("Ibérico Ham", "Extraordinary acorn-fed Ibérico ham with intense, complex flavour. A luxury.", 8.99, "80g"),
      ("Dry-Cured Back Bacon (8-pack)", "Dry-cured British back bacon rashers. Leaner than streaky with meaty flavour.", 2.99, "240g"),
      ("Smoked Streaky Bacon (8-pack)", "Smoky, fatty streaky bacon rashers. Crisp up to accompany eggs or a burger.", 2.79, "200g"),
      ("Unsmoked Back Bacon (8-pack)", "Mild, unsmoked back bacon rashers. The classic British fry-up essential.", 2.89, "240g"),
      ("Smoked Back Bacon (8-pack)", "Gently smoked back bacon with sweet, woody flavour. Breakfast perfection.", 2.99, "240g"),
      ("Lardons (smoked)", "Diced smoked lardons for larding meat, salads, and pasta. French cooking essential.", 1.99, "200g"),
      ("Lard (block)", "Pure rendered pork lard. Superior for pastry, frying, and traditional cooking.", 1.49, "250g"),
      ("Lamb Leg (bone-in)", "Whole bone-in leg of lamb, ideal for an impressive roast dinner.", 22.99, "2.5kg"),
      ("Lamb Shoulder (bone-in)", "Bone-in lamb shoulder for slow-roasting to pull-apart tenderness.", 16.99, "2kg"),
      ("Lamb Chops (4-pack)", "Individual lamb chops with bone. Quick-cook and delicious with herbs.", 8.99, "500g"),
      ("Lamb Cutlets (6-pack)", "Elegant lamb cutlets from the rack. Perfect French-trimmed for dinner parties.", 11.99, "400g"),
      ("Rack of Lamb", "Whole rack of lamb, French-trimmed. A showstopping dinner party centrepiece.", 19.99, "700g"),
      ("Lamb Shanks (2-pack)", "Meaty lamb shanks for slow-braising in red wine and herbs until falling-off-the-bone tender.", 10.99, "800g"),
      ("Diced Lamb (for stew)", "Tender diced lamb shoulder for tagines, stews, and curries.", 6.99, "500g"),
      ("Lamb Mince", "Lean lamb mince for koftas, moussaka, and Middle Eastern dishes.", 5.49, "500g"),
      ("Veal Escalopes (2-pack)", "Thin, tender veal escalopes for schnitzel, piccata, or saltimbocca.", 9.99, "300g"),
      ("Veal Osso Buco (2-pack)", "Cross-cut veal shin, the classic Milanese braise. Gelatinous and rich.", 13.99, "600g"),
      ("Venison Loin Steak (2-pack)", "Lean, gamey venison loin steak. Best cooked rare to medium.", 12.99, "300g"),
      ("Venison Haunch Joint", "Venison haunch roasting joint. Rich, lean game meat with deep flavour.", 18.99, "1.2kg"),
      ("Rabbit (whole)", "Whole rabbit for a classic French or Spanish braise. Lean, mild white meat.", 9.99, "800g"),
      ("Rabbit Legs (4-pack)", "Rabbit legs for slow-braising with mustard and thyme. French farmhouse classic.", 7.99, "600g"),
      ("Pheasant (oven-ready)", "Oven-ready pheasant with rich, gamey flavour. The quintessential autumn game bird.", 8.99, "each"),
      ("Partridge (2-pack)", "Tender, mild partridge, smaller than pheasant. Roast whole for a bistro treat.", 9.99, "2-pack"),
      ("Quail (4-pack)", "Tiny, tender quail with delicate, mild gamey flavour. Roast, grill, or spatchcock.", 8.99, "4-pack"),
      ("Pigeon / Squab (2-pack)", "Rich, dark-fleshed wood pigeon breasts. Best served rare, like a steak.", 8.49, "2-pack"),
      ("Guinea Fowl (whole)", "Oven-ready guinea fowl with flavour between chicken and pheasant.", 9.99, "1.2kg"),
      ("Goose (whole)", "Whole goose for the ultimate Christmas dinner. Spectacularly rich and flavoursome.", 49.99, "each"),
      ("Ox Liver (sliced)", "Sliced ox liver for the classic liver and onions. Rich in iron and B vitamins.", 3.49, "400g"),
      ("Calves' Liver (sliced)", "Delicate calves' liver, more mild than ox. Quickly seared with butter and sage.", 7.99, "300g"),
      ("Chicken Liver", "Fresh chicken livers for pâté, stir-fries, and Dirty Rice.", 2.49, "400g"),
      ("Lamb Kidney (4-pack)", "Trimmed lamb kidneys for devilled kidneys or steak and kidney pie.", 3.29, "300g"),
      ("Ox Kidney", "Rich ox kidney for the quintessential British steak and kidney pudding.", 3.49, "400g"),
      ("Sweetbreads (veal)", "Delicate veal sweetbreads, prized in French cuisine. Rich, creamy and unique.", 12.99, "300g"),
      ("Bone Marrow (4 pieces)", "Beef bone marrow for roasting. Spreads like butter and enriches sauces.", 4.99, "4-pack"),
      ("Beef Suet (shredded)", "Traditional shredded beef suet for pastry, puddings, and dumplings.", 1.99, "240g"),
      ("Pork Crackling Pieces", "Ready-to-cook pork rind for making perfect crackling. Addictive.", 2.49, "300g"),
      ("Black Pudding Ring", "Traditional British black pudding with oats and spices. Breakfast essential.", 2.99, "each"),
      ("Haggis", "Traditional Scottish haggis with oatmeal and spices. Served with neeps and tatties.", 4.99, "400g"),
      ("Faggots (4-pack)", "Traditional West Country faggots in rich onion gravy. Warming British comfort food.", 3.99, "4-pack"),
      ("Scotch Eggs (2-pack)", "Hard-boiled eggs wrapped in seasoned pork sausage meat, breadcrumbed and baked.", 2.99, "2-pack"),
      ("Pork Pâté (180g)", "Smooth French-style pork liver pâté. Wonderful spread on crusty bread.", 2.99, "180g"),
      ("Duck Pâté (180g)", "Rich, silky duck liver pâté with cognac. An elegant appetiser.", 4.49, "180g"),
      ("Chicken Liver Pâté (180g)", "Classic chicken liver pâté with herb butter seal. Smooth and luxurious.", 3.29, "180g"),
      ("Chorizo Cooking Slices", "Sliced cooking chorizo, releasing paprika-rich oil when fried. Spanish staple.", 2.99, "200g"),
      ("Merguez Sausages (6-pack)", "Spicy North African lamb merguez sausages. Fragrant with harissa and cumin.", 4.99, "400g"),
      ("Bratwurst (4-pack)", "German-style bratwurst pork sausages with herbs. Grill and serve with mustard.", 4.49, "400g"),
    ];

    for (i in meat.keys()) {
      let (name, desc, price, unit) = meat[i];
      list.add({
        id = "mea-" # (i + 1).toText();
        name;
        description = desc;
        price;
        category = "Meat & Poultry";
        unit;
        inStock = true;
        imageUrl = "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&q=80";
      });
    };

    // Category 6: Pantry & Dry Goods (100 products)
    let pantry : [(Text, Text, Float, Text)] = [
      ("Basmati Rice (1kg)", "Long-grain aromatic basmati rice from the foothills of the Himalayas. Fluffy when cooked.", 2.49, "1kg"),
      ("Jasmine Rice (1kg)", "Fragrant Thai jasmine rice with delicate floral aroma. Perfect with Asian dishes.", 2.29, "1kg"),
      ("Short Grain Rice (1kg)", "Starchy short grain rice for sushi, risotto-style dishes, and rice pudding.", 2.19, "1kg"),
      ("Brown Basmati Rice (1kg)", "Nutritious whole grain brown basmati with nutty flavour and extra fibre.", 2.79, "1kg"),
      ("Arborio Rice (500g)", "Starchy Arborio rice, the essential variety for classic creamy risotto.", 2.99, "500g"),
      ("Wild Rice (500g)", "Nutty, earthy wild rice (actually a grass seed). Wonderful in grain salads.", 4.49, "500g"),
      ("Red Camargue Rice (500g)", "Striking red French rice with nutty flavour and chewy texture.", 3.99, "500g"),
      ("Black Forbidden Rice (500g)", "Dramatic black rice that turns purple when cooked. Nutty and antioxidant-rich.", 4.49, "500g"),
      ("Spaghetti (500g)", "Classic durum wheat spaghetti, the world's most beloved pasta shape.", 1.49, "500g"),
      ("Penne Rigate (500g)", "Ridged penne tubes that grip chunky sauces beautifully.", 1.29, "500g"),
      ("Rigatoni (500g)", "Large, ridged rigatoni, perfect for hearty meat and vegetable sauces.", 1.49, "500g"),
      ("Farfalle (500g)", "Whimsical bow-tie farfalle, lovely in salads and light cream sauces.", 1.49, "500g"),
      ("Fusilli (500g)", "Spiral fusilli that traps chunky sauces in every twist.", 1.29, "500g"),
      ("Tagliatelle (500g)", "Flat, ribbon-shaped tagliatelle. Classic with Bolognese or cream sauces.", 1.79, "500g"),
      ("Linguine (500g)", "Slim, flat linguine, halfway between spaghetti and tagliatelle. Great with seafood.", 1.49, "500g"),
      ("Pappardelle (250g)", "Wide, ribbon pappardelle. Perfect with slow-braised meat sauces.", 2.29, "250g"),
      ("Orzo (500g)", "Rice-shaped orzo pasta, perfect in soups, salads, and as a risotto substitute.", 1.69, "500g"),
      ("Orecchiette (500g)", "Ear-shaped orecchiette from Puglia. Traditional with broccoli and anchovies.", 1.99, "500g"),
      ("Whole Wheat Spaghetti (500g)", "Nutritious whole wheat spaghetti with nutty flavour and extra fibre.", 1.79, "500g"),
      ("Gluten-Free Pasta (400g)", "Corn and rice flour pasta. Suitable for coeliacs with authentic texture.", 2.49, "400g"),
      ("Soba Noodles (200g)", "Japanese buckwheat soba noodles. Wonderful in cold salads and hot soups.", 2.99, "200g"),
      ("Udon Noodles (200g)", "Thick, chewy Japanese udon noodles. Wonderful in miso soup and stir-fries.", 2.49, "200g"),
      ("Rice Noodles (200g)", "Light, gluten-free rice noodles for pad Thai, pho, and stir-fries.", 1.99, "200g"),
      ("Glass / Cellophane Noodles (100g)", "Transparent glass noodles from mung bean starch. Used in spring rolls.", 1.79, "100g"),
      ("Egg Noodles (300g)", "Wheat and egg noodles for Chinese and South-East Asian dishes.", 2.29, "300g"),
      ("Red Lentils (500g)", "Quick-cooking red lentils for dhal, soups, and stews. Nutritious and filling.", 1.49, "500g"),
      ("Green Lentils (500g)", "Firm green lentils that hold their shape. Perfect in salads and as a side.", 1.59, "500g"),
      ("Puy Lentils (500g)", "Protected Puy lentils from Le Puy, France. Prized for peppery flavour.", 2.49, "500g"),
      ("Yellow Split Peas (500g)", "Split yellow peas for dal and pea soup. Cooks down to a thick, hearty purée.", 1.29, "500g"),
      ("Green Split Peas (500g)", "Dried split green peas for classic pea and ham soup.", 1.29, "500g"),
      ("Chickpeas (400g tin)", "Cooked chickpeas in water. Ready for hummus, curries, and salads.", 0.89, "400g"),
      ("Red Kidney Beans (400g tin)", "Cooked red kidney beans. Essential for chilli con carne and three-bean salads.", 0.85, "400g"),
      ("Black Beans (400g tin)", "Cooked black beans, a staple of Mexican and Caribbean cuisines.", 0.89, "400g"),
      ("Cannellini Beans (400g tin)", "Creamy Italian cannellini beans. Perfect in ribollita and with tuna.", 0.89, "400g"),
      ("Borlotti Beans (400g tin)", "Speckled borlotti beans with creamy texture. Classic in Italian pasta e fagioli.", 0.95, "400g"),
      ("Butter Beans (400g tin)", "Large, creamy butter beans (lima beans). Wonderful in stews and salads.", 0.89, "400g"),
      ("Haricot Beans (400g tin)", "Small white haricot beans, the basis of baked beans and cassoulet.", 0.85, "400g"),
      ("Pinto Beans (400g tin)", "Speckled pinto beans, the classic refried bean for Mexican cooking.", 0.85, "400g"),
      ("Rolled Oats (1kg)", "Classic rolled oats for porridge, granola, and baking. Wholesome and filling.", 1.79, "1kg"),
      ("Jumbo Rolled Oats (1kg)", "Large-flake jumbo oats with heartier texture. Perfect for chunky porridge.", 2.29, "1kg"),
      ("Oat Bran (500g)", "Fine oat bran for boosting fibre in porridge, smoothies, and baking.", 1.99, "500g"),
      ("Polenta / Cornmeal (500g)", "Fine-milled polenta for creamy polenta, cakes, and baked goods.", 2.49, "500g"),
      ("Semolina (500g)", "Golden semolina for pasta-making, gnocchi, and sweet halwa.", 1.49, "500g"),
      ("Plain Flour (1.5kg)", "Versatile plain wheat flour. The essential kitchen staple for baking and cooking.", 1.29, "1.5kg"),
      ("Self-Raising Flour (1.5kg)", "Self-raising flour with added baking powder. Ready for cakes and scones.", 1.39, "1.5kg"),
      ("Strong Bread Flour (1.5kg)", "High-gluten bread flour with extra protein for chewy loaves and pizza.", 1.69, "1.5kg"),
      ("Wholemeal Flour (1.5kg)", "Nutritious wholemeal flour with bran and germ intact. For wholesome baking.", 1.79, "1.5kg"),
      ("Spelt Flour (1kg)", "Ancient grain spelt flour with nutty flavour. Easier to digest than modern wheat.", 3.49, "1kg"),
      ("Gluten-Free Plain Flour (1kg)", "Blend of rice and tapioca flours. For gluten-free baking without compromise.", 2.99, "1kg"),
      ("Cornflour (500g)", "Fine white cornflour for thickening sauces, making shortbread, and batters.", 0.99, "500g"),
      ("Caster Sugar (1kg)", "Fine caster sugar that dissolves quickly. Essential for cakes, meringues, and cream.", 1.29, "1kg"),
      ("Granulated Sugar (1kg)", "Standard granulated white sugar for everyday sweetening.", 0.99, "1kg"),
      ("Icing Sugar (500g)", "Powdered icing sugar for buttercream, glacé icing, and dusting desserts.", 1.09, "500g"),
      ("Soft Brown Sugar (500g)", "Moist, toffee-flavoured light brown sugar. Essential for cookies and fudge.", 1.29, "500g"),
      ("Muscovado Sugar (500g)", "Unrefined dark muscovado sugar with intense treacly, molasses flavour.", 1.99, "500g"),
      ("Demerara Sugar (500g)", "Crunchy golden Demerara crystals for crumble toppings and coffee.", 1.49, "500g"),
      ("Coconut Sugar (250g)", "Natural, unrefined coconut blossom sugar with gentle caramel flavour.", 3.49, "250g"),
      ("Honey (454g)", "Pure runny British set honey from wildflower meadows. Golden and aromatic.", 3.99, "454g"),
      ("Manuka Honey (250g)", "Prized New Zealand Manuka honey with remarkable properties. MGO rated.", 12.99, "250g"),
      ("Maple Syrup (250ml)", "Pure Grade A amber maple syrup from Canada. Rich, complex sweetness.", 4.99, "250ml"),
      ("Golden Syrup (454g)", "Lyle's iconic golden syrup with light toffee flavour. Baking essential.", 1.79, "454g"),
      ("Treacle (454g)", "Rich, dark black treacle. Essential for parkin, gingerbread, and Christmas cake.", 1.79, "454g"),
      ("Agave Nectar (250ml)", "Low-GI agave nectar with mild, clean sweetness. Vegan honey alternative.", 2.99, "250ml"),
      ("Olive Oil (Extra Virgin, 500ml)", "Cold-pressed extra virgin olive oil with fruity, peppery notes. First press quality.", 5.99, "500ml"),
      ("Olive Oil (Light, 500ml)", "Refined light olive oil with neutral flavour. Perfect for frying and baking.", 3.99, "500ml"),
      ("Sunflower Oil (1L)", "Refined sunflower oil with neutral flavour and high smoke point. Everyday cooking.", 2.49, "1L"),
      ("Rapeseed Oil (1L)", "British cold-pressed rapeseed oil with golden colour and nutty flavour.", 3.49, "1L"),
      ("Coconut Oil (500ml)", "Organic virgin coconut oil with rich tropical flavour. High smoke point for frying.", 5.49, "500ml"),
      ("Sesame Oil (300ml)", "Toasted sesame oil with deep, nutty, aromatic flavour. Used as a finishing oil.", 3.49, "300ml"),
      ("Balsamic Vinegar of Modena (250ml)", "Traditional balsamic vinegar from Modena with sweet-sour complexity.", 3.99, "250ml"),
      ("Red Wine Vinegar (500ml)", "Classic red wine vinegar. Sharp and fruity for dressings and marinades.", 1.99, "500ml"),
      ("Apple Cider Vinegar (500ml)", "Raw, unfiltered apple cider vinegar with the mother. Health and cooking benefits.", 2.99, "500ml"),
      ("White Wine Vinegar (500ml)", "Clean, sharp white wine vinegar. Essential for béarnaise and hollandaise.", 1.79, "500ml"),
      ("Rice Wine Vinegar (500ml)", "Mild, slightly sweet Japanese rice vinegar. Essential for sushi rice.", 2.49, "500ml"),
      ("Soy Sauce (150ml)", "Classic Japanese soy sauce. The umami backbone of Asian cooking.", 2.29, "150ml"),
      ("Tamari (150ml)", "Wheat-free tamari with rounder, less salty flavour than regular soy sauce.", 2.99, "150ml"),
      ("Worcestershire Sauce (290ml)", "Iconic fermented Worcestershire sauce with complex savoury-sweet flavour.", 1.99, "290ml"),
      ("Tabasco (60ml)", "Original Louisiana Tabasco hot sauce. Fiery vinegared cayenne pepper sauce.", 2.49, "60ml"),
      ("Sriracha Sauce (450ml)", "Thai-American sriracha chilli sauce — sweet, garlicky, and spicy.", 3.49, "450ml"),
      ("Fish Sauce (200ml)", "Fermented Thai fish sauce with pungent, salty, umami flavour. Essential in Thai cooking.", 2.49, "200ml"),
      ("Oyster Sauce (255g)", "Rich, dark Chinese oyster sauce. Adds depth and gloss to stir-fries.", 2.29, "255g"),
      ("Tomato Purée (200g)", "Concentrated tomato purée for adding rich tomato depth to sauces and stews.", 0.79, "200g"),
      ("Tomato Passata (700g)", "Smooth, strained Italian tomato passata. For quick sauces and pizza bases.", 1.29, "700g"),
      ("Chopped Tomatoes (400g tin)", "Italian chopped tomatoes in their own juice. An indispensable pantry staple.", 0.69, "400g"),
      ("Whole Plum Tomatoes (400g tin)", "Italian whole plum tomatoes with dense flesh and vibrant flavour.", 0.89, "400g"),
      ("Coconut Milk (400ml tin)", "Rich, full-fat coconut milk for curries, soups, and desserts.", 1.19, "400ml"),
      ("Coconut Cream (400ml tin)", "Thick, rich coconut cream for intensely coconut-flavoured dishes.", 1.39, "400ml"),
      ("Chicken Stock (500ml)", "Rich, clear chicken stock made from free-range bones. Ready to use.", 2.49, "500ml"),
      ("Beef Stock (500ml)", "Deep, dark beef stock for gravies, stews, and braising liquids.", 2.69, "500ml"),
      ("Vegetable Stock (500ml)", "Flavourful vegetable stock made from garden vegetables. Vegan-friendly.", 1.99, "500ml"),
      ("Dried Yeast (7g)", "Fast-action dried yeast sachets for bread-making and pizza dough.", 0.89, "7g sachet"),
      ("Baking Powder (200g)", "Reliable baking powder for light, well-risen cakes and biscuits.", 1.09, "200g"),
      ("Bicarbonate of Soda (200g)", "Pure bicarbonate of soda for baking, cleaning, and as a leavening agent.", 0.89, "200g"),
      ("Cream of Tartar (100g)", "Potassium bitartrate for stabilising meringues and adding lift to baked goods.", 1.49, "100g"),
      ("Vanilla Extract (100ml)", "Pure, dark vanilla extract from Madagascar Bourbon vanilla beans.", 2.99, "100ml"),
      ("Vanilla Bean Paste (100g)", "Intensely flavoured vanilla paste with visible seeds. Professional quality.", 4.99, "100g"),
      ("Cocoa Powder (200g)", "Rich Dutch-process cocoa powder for deep chocolate flavour in baking.", 2.99, "200g"),
      ("Dark Chocolate Chips (200g)", "70% dark chocolate chips for baking. Intensely chocolatey and versatile.", 2.49, "200g"),
      ("Desiccated Coconut (200g)", "Fine, dry desiccated coconut for baking, coatings, and curries.", 1.99, "200g"),
      ("Ground Almonds (200g)", "Finely ground almonds for moist cakes, frangipane, and macarons.", 2.99, "200g"),
      ("Flaked Almonds (100g)", "Thin, crisp almond flakes for decorating cakes, crumbles, and salads.", 2.29, "100g"),
    ];

    for (i in pantry.keys()) {
      let (name, desc, price, unit) = pantry[i];
      list.add({
        id = "pan-" # (i + 1).toText();
        name;
        description = desc;
        price;
        category = "Pantry & Dry Goods";
        unit;
        inStock = true;
        imageUrl = "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80";
      });
    };

    list;
  };
};
