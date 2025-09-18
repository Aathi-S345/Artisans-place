'use client';

import React from 'react';
import { useUIStore } from '@/store/uiStore'; 

export default function Modal() {
  const { isModalOpen, modalContent, closeModal } = useUIStore();

  if (!isModalOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={closeModal} // Close modal on overlay click
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-xl relative max-w-lg w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        {modalContent}
      </div>
    </div>
  );
}