import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  imageSrc: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  size: string;
  color: string;
  quantity: number;
}

/**
 * Realistic default cart is empty.
 * Items are only added when the user explicitly clicks "Add to Cart".
 */
export const INITIAL_CART_ITEMS: CartItem[] = [];

/**
 * Reference items from the initial design mockup (used for testing or mock seeding).
 */
export const REFERENCE_CART_ITEMS: CartItem[] = [
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

export interface CartState {
  items: CartItem[];
  selectedItemIds: string[] | null;
  promoCode: string;
  discountPercentage: number;
  fixedDiscount: number;
  deliveryFee: number;
  _hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  applyPromo: (code: string) => boolean;
  clearCart: () => void;
  getSelectedItems: () => CartItem[];
  isItemSelected: (id: string) => boolean;
  toggleSelectItem: (id: string) => void;
  selectAllItems: () => void;
  deselectAllItems: () => void;
  toggleSelectAll: () => void;
  removeSelectedItems: () => void;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;
  getSelectedOriginalSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: INITIAL_CART_ITEMS,
      selectedItemIds: null,
      promoCode: "",
      discountPercentage: 0,
      fixedDiscount: 0,
      deliveryFee: 15,
      _hasHydrated: false,

      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),

      addItem: (newItem) => {
        const id = `${newItem.productId}-${newItem.size.toLowerCase()}-${newItem.color.toLowerCase()}`;
        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          const nextSelectedItemIds =
            state.selectedItemIds !== null && !state.selectedItemIds.includes(id)
              ? [...state.selectedItemIds, id]
              : state.selectedItemIds;

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + newItem.quantity } : i
              ),
              selectedItemIds: nextSelectedItemIds,
            };
          }
          return {
            items: [...state.items, { ...newItem, id }],
            selectedItemIds: nextSelectedItemIds,
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
          selectedItemIds:
            state.selectedItemIds !== null
              ? state.selectedItemIds.filter((itemId) => itemId !== id)
              : null,
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
        if (cleanCode === "TEST") {
          set({ promoCode: "TEST", discountPercentage: 0, fixedDiscount: 10 });
          return true;
        }
        if (cleanCode === "AUTUMN20" || cleanCode === "SAVE20") {
          set({ promoCode: cleanCode, discountPercentage: 20, fixedDiscount: 0 });
          return true;
        }
        if (cleanCode === "VIP30") {
          set({ promoCode: cleanCode, discountPercentage: 30, fixedDiscount: 0 });
          return true;
        }
        return false;
      },

      clearCart: () => {
        set({
          items: [],
          selectedItemIds: null,
          promoCode: "",
          discountPercentage: 0,
          fixedDiscount: 0,
        });
      },

      getSelectedItems: () => {
        const { items, selectedItemIds } = get();
        if (selectedItemIds === null) {
          return items;
        }
        return items.filter((item) => selectedItemIds.includes(item.id));
      },

      isItemSelected: (id: string) => {
        const { selectedItemIds } = get();
        if (selectedItemIds === null) return true;
        return selectedItemIds.includes(id);
      },

      toggleSelectItem: (id: string) => {
        set((state) => {
          const current =
            state.selectedItemIds === null ? state.items.map((i) => i.id) : state.selectedItemIds;
          const next = current.includes(id)
            ? current.filter((itemId) => itemId !== id)
            : [...current, id];
          return { selectedItemIds: next };
        });
      },

      selectAllItems: () => {
        set((state) => ({
          selectedItemIds: state.items.map((i) => i.id),
        }));
      },

      deselectAllItems: () => {
        set({ selectedItemIds: [] });
      },

      toggleSelectAll: () => {
        const { items, selectedItemIds } = get();
        const currentSelectedCount =
          selectedItemIds === null ? items.length : selectedItemIds.length;
        if (currentSelectedCount === items.length) {
          set({ selectedItemIds: [] });
        } else {
          set({ selectedItemIds: items.map((i) => i.id) });
        }
      },

      removeSelectedItems: () => {
        set((state) => {
          const selected =
            state.selectedItemIds === null ? state.items.map((i) => i.id) : state.selectedItemIds;
          const remainingItems = state.items.filter((item) => !selected.includes(item.id));
          return {
            items: remainingItems,
            selectedItemIds: null,
          };
        });
      },

      /**
       * Subtotal of selected items:
       * Sum of item.price * item.quantity.
       */
      getSubtotal: () => {
        const selected = get().getSelectedItems();
        return selected.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      /**
       * Promotional discount amount:
       * - Fixed promo (e.g. TEST = $10 flat off the entire order)
       * - Percentage promo (e.g. AUTUMN20 = 20% off selected items subtotal)
       * Fixed discount is applied ONCE per order, never multiplied per item.
       */
      getDiscountAmount: () => {
        const selected = get().getSelectedItems();
        if (selected.length === 0) return 0;

        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;

        // 1. Percentage discount from promo code (e.g. 20% off order)
        const promoDiscount =
          get().discountPercentage > 0
            ? Math.round((subtotal * get().discountPercentage) / 100)
            : 0;

        // 2. Fixed order discount from promo code (e.g. TEST = $10 flat off entire order)
        const fixedDiscount = get().fixedDiscount ?? 0;

        // Total order discount is capped at subtotal so total never goes negative
        return Math.min(subtotal, promoDiscount + fixedDiscount);
      },

      getTotal: () => {
        const selected = get().getSelectedItems();
        if (selected.length === 0) return 0;
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const discount = get().getDiscountAmount();
        return Math.max(0, subtotal - discount) + get().deliveryFee;
      },

      getSelectedOriginalSubtotal: () => {
        const selected = get().getSelectedItems();
        return selected.reduce(
          (sum, item) =>
            sum +
            (item.originalPrice && item.originalPrice > item.price
              ? item.originalPrice
              : item.price) *
              item.quantity,
          0
        );
      },
    }),
    {
      name: "autumnland_cart_storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        items: state.items,
        selectedItemIds: state.selectedItemIds,
        promoCode: state.promoCode,
        discountPercentage: state.discountPercentage,
        fixedDiscount: state.fixedDiscount,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
