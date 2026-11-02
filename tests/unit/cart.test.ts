import { describe, expect, it, beforeEach } from "bun:test";
import { useCartStore, INITIAL_CART_ITEMS, REFERENCE_CART_ITEMS } from "@/lib/cart-store";

describe("useCartStore", () => {
  beforeEach(() => {
    // Reset cart to realistic empty state before each test
    useCartStore.setState({
      items: [],
      promoCode: "",
      discountPercentage: 0,
      deliveryFee: 15,
    });
  });

  it("initializes with empty items array by default for realistic flow", () => {
    expect(INITIAL_CART_ITEMS.length).toBe(0);
    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
    expect(state.getSubtotal()).toBe(0);
    expect(state.getDiscountAmount()).toBe(0);
    expect(state.getTotal()).toBe(0);
  });

  it("calculates totals correctly when populated with reference items", () => {
    useCartStore.setState({
      items: [...REFERENCE_CART_ITEMS],
      promoCode: "AUTUMN20",
      discountPercentage: 20,
    });
    const state = useCartStore.getState();
    expect(state.items.length).toBe(3);

    // Initial subtotal: 145 + 180 + 240 = 565
    expect(state.getSubtotal()).toBe(565);

    // 20% discount on 565 is 113
    expect(state.getDiscountAmount()).toBe(113);

    // Delivery fee is 15 -> Total: 565 - 113 + 15 = 467
    expect(state.getTotal()).toBe(467);
  });

  it("increments and decrements item quantity", () => {
    useCartStore.setState({
      items: [...REFERENCE_CART_ITEMS],
    });
    const store = useCartStore.getState();
    const firstItemId = store.items[0].id;

    store.updateQuantity(firstItemId, 1);
    expect(useCartStore.getState().items[0].quantity).toBe(2);

    store.updateQuantity(firstItemId, -1);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it("removes an item from the cart", () => {
    useCartStore.setState({
      items: [...REFERENCE_CART_ITEMS],
    });
    const store = useCartStore.getState();
    const initialCount = store.items.length;
    const itemToRemove = store.items[0].id;

    store.removeItem(itemToRemove);
    expect(useCartStore.getState().items.length).toBe(initialCount - 1);
    expect(useCartStore.getState().items.find((i) => i.id === itemToRemove)).toBeUndefined();
  });

  it("adds a new unique product to the cart", () => {
    const store = useCartStore.getState();
    store.addItem({
      productId: "t-shirt-tape-details",
      title: "T-shirt with Tape Details",
      imageSrc: "/assets/t-shirt/image 1.png",
      price: 120,
      size: "Large",
      color: "Black",
      quantity: 1,
    });

    const items = useCartStore.getState().items;
    expect(items.length).toBe(1);
    const added = items.find((i) => i.productId === "t-shirt-tape-details");
    expect(added).toBeDefined();
    expect(added?.price).toBe(120);
  });

  it("increments quantity if adding an identical existing item", () => {
    const store = useCartStore.getState();
    store.addItem({
      productId: "gradient-graphic-t-shirt",
      title: "Gradient Graphic T-shirt",
      imageSrc: "/assets/t-shirt/image 2.png",
      price: 145,
      size: "Large",
      color: "White",
      quantity: 1,
    });

    store.addItem({
      productId: "gradient-graphic-t-shirt",
      title: "Gradient Graphic T-shirt",
      imageSrc: "/assets/t-shirt/image 2.png",
      price: 145,
      size: "Large",
      color: "White",
      quantity: 2,
    });

    const items = useCartStore.getState().items;
    expect(items.length).toBe(1); // Same unique SKU
    const item = items.find((i) => i.productId === "gradient-graphic-t-shirt");
    expect(item?.quantity).toBe(3); // 1 + 2
  });

  it("applies promotional discount codes correctly", () => {
    useCartStore.setState({
      items: [...REFERENCE_CART_ITEMS],
    });
    const store = useCartStore.getState();

    // Valid code: VIP30 gives 30%
    const applied = store.applyPromo("VIP30");
    expect(applied).toBe(true);
    expect(useCartStore.getState().discountPercentage).toBe(30);

    // Subtotal 565 * 30% = 169.5 -> rounds to 170
    expect(useCartStore.getState().getDiscountAmount()).toBe(170);

    // Mock redeem code: TEST reduces $10 flat from total
    const appliedTest = store.applyPromo("test");
    expect(appliedTest).toBe(true);
    expect(useCartStore.getState().promoCode).toBe("TEST");
    expect(useCartStore.getState().fixedDiscount).toBe(10);
    expect(useCartStore.getState().getDiscountAmount()).toBe(10);
    // Subtotal 565 - 10 discount + 15 delivery fee = 570
    expect(useCartStore.getState().getTotal()).toBe(570);

    // Invalid code returns false
    const invalid = store.applyPromo("NONEXISTENT_CODE");
    expect(invalid).toBe(false);
  });

  it("clears cart and returns zero for total", () => {
    useCartStore.setState({
      items: [...REFERENCE_CART_ITEMS],
      promoCode: "AUTUMN20",
      discountPercentage: 20,
    });
    const store = useCartStore.getState();
    store.clearCart();

    expect(useCartStore.getState().items.length).toBe(0);
    expect(useCartStore.getState().promoCode).toBe("");
    expect(useCartStore.getState().discountPercentage).toBe(0);
    expect(useCartStore.getState().getSubtotal()).toBe(0);
    expect(useCartStore.getState().getTotal()).toBe(0);
  });

  it("calculates product item discounts and total savings accurately", () => {
    const store = useCartStore.getState();
    store.addItem({
      productId: "one-life-graphic-t-shirt",
      title: "One Life Graphic T-shirt",
      imageSrc: "/assets/t-shirt/one-life-main.png",
      price: 260,
      originalPrice: 300,
      discount: "-40%",
      size: "Large",
      color: "Olive Brown",
      quantity: 1,
    });

    const state = useCartStore.getState();
    // Subtotal is item price (260)
    expect(state.getSubtotal()).toBe(260);
    // Without promo code, order discount is 0
    expect(state.getDiscountAmount()).toBe(0);
    // Total: 260 + 15 = 275
    expect(state.getTotal()).toBe(275);

    // When TEST fixed $10 promo is applied, exactly $10 is discounted from total
    store.applyPromo("TEST");
    expect(useCartStore.getState().getDiscountAmount()).toBe(10);
    expect(useCartStore.getState().getTotal()).toBe(265);
  });

  it("applies fixed $10 promo discount once to the order regardless of item count (never per item)", () => {
    useCartStore.setState({
      items: [...REFERENCE_CART_ITEMS], // 3 products
      selectedItemIds: null,
    });
    const store = useCartStore.getState();
    expect(store.items.length).toBe(3);

    // Apply fixed TEST promo code
    store.applyPromo("TEST");
    const state = useCartStore.getState();
    // Subtotal of 3 items: 145 + 180 + 240 = 565
    expect(state.getSubtotal()).toBe(565);
    // Discount is strictly $10 once for the whole order, NOT 3 * 10 = $30
    expect(state.getDiscountAmount()).toBe(10);
    // Total: 565 - 10 + 15 = 570
    expect(state.getTotal()).toBe(570);

    // Even if 2 items are selected, discount remains exactly $10
    store.toggleSelectItem(REFERENCE_CART_ITEMS[0].id);
    expect(useCartStore.getState().getSelectedItems().length).toBe(2);
    expect(useCartStore.getState().getSubtotal()).toBe(420);
    expect(useCartStore.getState().getDiscountAmount()).toBe(10);
    expect(useCartStore.getState().getTotal()).toBe(425);
  });

  it("handles item selection, deselect all zeroes total, and removes selected items", () => {
    useCartStore.setState({
      items: [...REFERENCE_CART_ITEMS],
      selectedItemIds: null,
    });
    const store = useCartStore.getState();
    expect(store.items.length).toBe(3);
    expect(store.getSelectedItems().length).toBe(3);
    expect(store.getTotal()).toBeGreaterThan(0);

    // Deselect all items -> total should become 0
    store.deselectAllItems();
    expect(useCartStore.getState().getSelectedItems().length).toBe(0);
    expect(useCartStore.getState().getSubtotal()).toBe(0);
    expect(useCartStore.getState().getDiscountAmount()).toBe(0);
    expect(useCartStore.getState().getTotal()).toBe(0);

    // Toggle select all -> restores all items
    store.toggleSelectAll();
    expect(useCartStore.getState().getSelectedItems().length).toBe(3);
    expect(useCartStore.getState().getTotal()).toBeGreaterThan(0);

    // Deselect 1 item -> calculations update for remaining 2 items
    const firstId = REFERENCE_CART_ITEMS[0].id;
    store.toggleSelectItem(firstId);
    expect(useCartStore.getState().isItemSelected(firstId)).toBe(false);
    expect(useCartStore.getState().getSelectedItems().length).toBe(2);

    // Remove selected items -> only the unselected item remains
    store.removeSelectedItems();
    const remaining = useCartStore.getState().items;
    expect(remaining.length).toBe(1);
    expect(remaining[0].id).toBe(firstId);
  });
});
