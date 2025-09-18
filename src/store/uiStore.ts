import { create } from 'zustand';
import React from 'react';

interface UIState {
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isModalOpen: false,
  modalContent: null,
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));