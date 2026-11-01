import { describe, expect, it, beforeEach } from "bun:test";
import { useCartStore, INITIAL_CART_ITEMS } from "@/lib/cart-store";

describe("useCartStore", () => {
  beforeEach(() => {
    // Reset cart to initial default items
    useCartStore.setState({
      items: [...INITIAL_CART_ITEMS],
      promoCode: "AUTUMN20",
      discountPercentage: 20,
      deliveryFee: 15,
    });
  });

  it("initializes with reference items matching the design", () => {
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
    const store = useCartStore.getState();
    const firstItemId = store.items[0].id;

    store.updateQuantity(firstItemId, 1);
    expect(useCartStore.getState().items[0].quantity).toBe(2);

    store.updateQuantity(firstItemId, -1);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it("removes an item from the cart", () => {
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
    expect(items.length).toBe(4);
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
      quantity: 2,
    });

    const items = useCartStore.getState().items;
    expect(items.length).toBe(3); // Same number of unique items
    const item = items.find((i) => i.productId === "gradient-graphic-t-shirt");
    expect(item?.quantity).toBe(3); // 1 initial + 2 added
  });

  it("applies promotional discount codes correctly", () => {
    const store = useCartStore.getState();

    // Valid code: VIP30 gives 30%
    const applied = store.applyPromo("VIP30");
    expect(applied).toBe(true);
    expect(useCartStore.getState().discountPercentage).toBe(30);

    // Subtotal 565 * 30% = 169.5 -> rounds to 170
    expect(useCartStore.getState().getDiscountAmount()).toBe(170);

    // Invalid code returns false
    const invalid = store.applyPromo("NONEXISTENT_CODE");
    expect(invalid).toBe(false);
  });

  it("clears cart and returns zero for total", () => {
    const store = useCartStore.getState();
    store.clearCart();

    expect(useCartStore.getState().items.length).toBe(0);
    expect(useCartStore.getState().getSubtotal()).toBe(0);
    expect(useCartStore.getState().getTotal()).toBe(0);
  });
});
