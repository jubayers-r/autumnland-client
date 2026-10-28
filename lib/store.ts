import { create } from "zustand";

/**
 * Global Client UI Store (Zustand)
 * Use for client-only transient state (e.g., sidebar toggles, modal dialogs, UI preferences).
 * For server data and API caching, use TanStack Query instead.
 */
interface AppUIState {
  sidebarOpen: boolean;
  activeModal: string | null;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useAppStore = create<AppUIState>((set) => ({
  sidebarOpen: false,
  activeModal: null,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
}));
