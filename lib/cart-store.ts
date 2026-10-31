import { create } from "zustand";

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  imageSrc: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "gradient-graphic-t-shirt-large-white",
    productId: "gradient-graphic-t-shirt",
    title: "Gradient Graphic T-shirt",
    imageSrc: "/assets/t-shirt/image 2.png",
    price: 145,
    size: "Large",
    color: "White",
    quantity: 1,
  },
  {
    id: "checkered-shirt-medium-red",
    productId: "checkered-shirt",
    title: "Checkered Shirt",
    imageSrc: "/assets/t-shirt/image 9.png",
    price: 180,
    size: "Medium",
    color: "Red",
    quantity: 1,
  },
  {
    id: "skinny-fit-jeans-large-blue",
    productId: "skinny-fit-jeans",
    title: "Skinny Fit Jeans",
    imageSrc: "/assets/t-shirt/image 8.png",
    price: 240,
    size: "Large",
    color: "Blue",
    quantity: 1,
  },
];

interface CartState {
  items: CartItem[];
  promoCode: string;
  discountPercentage: number;
  deliveryFee: number;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  applyPromo: (code: string) => boolean;
  clearCart: () => void;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: INITIAL_CART_ITEMS,
  promoCode: "AUTUMN20",
  discountPercentage: 20,
  deliveryFee: 15,

  addItem: (newItem) => {
    const id = `${newItem.productId}-${newItem.size.toLowerCase()}-${newItem.color.toLowerCase()}`;
    set((state) => {
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + newItem.quantity } : i
          ),
        };
      }
      return {
        items: [...state.items, { ...newItem, id }],
      };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id, delta) => {
    set((state) => ({
      items: state.items
        .map((item) => {
          if (item.id === id) {
            const nextQuantity = item.quantity + delta;
            return nextQuantity > 0 ? { ...item, quantity: nextQuantity } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    }));
  },

  setQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }));
  },

  applyPromo: (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "AUTUMN20" || cleanCode === "SAVE20") {
      set({ promoCode: cleanCode, discountPercentage: 20 });
      return true;
    }
    if (cleanCode === "VIP30") {
      set({ promoCode: cleanCode, discountPercentage: 30 });
      return true;
    }
    return false;
  },

  clearCart: () => {
    set({ items: [] });
  },

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getDiscountAmount: () => {
    const subtotal = get().getSubtotal();
    const discount = (subtotal * get().discountPercentage) / 100;
    return Math.round(discount);
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    const discount = get().getDiscountAmount();
    return subtotal - discount + get().deliveryFee;
  },
}));
