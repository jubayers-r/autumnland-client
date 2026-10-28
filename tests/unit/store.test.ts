import { describe, expect, it, beforeEach } from "bun:test";
import { useAppStore } from "@/lib/store";

describe("useAppStore (Zustand client state)", () => {
  beforeEach(() => {
    // Reset store state before each test
    useAppStore.setState({ sidebarOpen: false, activeModal: null });
  });

  it("initializes with sidebar closed and no active modal", () => {
    const state = useAppStore.getState();
    expect(state.sidebarOpen).toBe(false);
    expect(state.activeModal).toBeNull();
  });

  it("toggles sidebar open state", () => {
    expect(useAppStore.getState().sidebarOpen).toBe(false);

    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(true);

    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(false);
  });

  it("sets sidebar explicitly", () => {
    useAppStore.getState().setSidebarOpen(true);
    expect(useAppStore.getState().sidebarOpen).toBe(true);

    useAppStore.getState().setSidebarOpen(false);
    expect(useAppStore.getState().sidebarOpen).toBe(false);
  });

  it("opens and closes modals", () => {
    useAppStore.getState().openModal("confirm-action");
    expect(useAppStore.getState().activeModal).toBe("confirm-action");

    useAppStore.getState().closeModal();
    expect(useAppStore.getState().activeModal).toBeNull();
  });
});
