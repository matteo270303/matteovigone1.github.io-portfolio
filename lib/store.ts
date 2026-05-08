'use client';

import { create } from 'zustand';
import type { RoomId, SectionKind } from '@/types';

/**
 * UI state shared between the 3D scene and the React overlay.
 * The 3D world writes the active room (based on player position),
 * the UI reads it. Modal opening is bidirectional.
 */
interface PortfolioState {
  activeRoom: RoomId;
  setActiveRoom: (id: RoomId) => void;

  /** ID of the section whose modal is currently open (null = closed). */
  openSection: SectionKind | null;
  openModal: (section: SectionKind) => void;
  closeModal: () => void;

  /** Teleport request – set by UI, consumed by player controller. */
  teleportTarget: RoomId | null;
  requestTeleport: (id: RoomId) => void;
  consumeTeleport: () => void;

  /** Whether the welcome overlay is visible. */
  showWelcome: boolean;
  dismissWelcome: () => void;

  /** Whether the help/controls panel is open. */
  showHelp: boolean;
  toggleHelp: () => void;

  /** Quality preset – low devices fallback. */
  quality: 'high' | 'low';
  setQuality: (q: 'high' | 'low') => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeRoom: 'living',
  setActiveRoom: (id) => set({ activeRoom: id }),

  openSection: null,
  openModal: (section) => set({ openSection: section }),
  closeModal: () => set({ openSection: null }),

  teleportTarget: null,
  requestTeleport: (id) => set({ teleportTarget: id }),
  consumeTeleport: () => set({ teleportTarget: null }),

  showWelcome: true,
  dismissWelcome: () => set({ showWelcome: false }),

  showHelp: false,
  toggleHelp: () => set((s) => ({ showHelp: !s.showHelp })),

  quality: 'high',
  setQuality: (q) => set({ quality: q }),
}));
