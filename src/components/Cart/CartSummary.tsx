import React from 'react';

interface CartSummaryProps {
  totalQuantity: number;
  totalPrice: number;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  totalQuantity,
  totalPrice,
  onClose,
  onCheckout,
}) => {
  return (
    <div className="mt-6 border-t pt-4">
      <div className="flex justify-between mb-4">
        <span className="font-semibold">Total ({totalQuantity} items):</span>
        <span className="font-bold">${totalPrice.toFixed(2)}</span>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onClose}
          className="flex-1 px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Continue Shopping
        </button>
        <button
          onClick={onCheckout}
          className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};