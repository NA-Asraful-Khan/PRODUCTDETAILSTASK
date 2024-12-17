import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setCartOpen, clearCart } from '../store/cartSlice';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

export const CartModal: React.FC = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);

  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    dispatch(clearCart());
    toast.success('Thanks for shopping with us!');
  };

  const handleClose = () => {
    dispatch(setCartOpen(false));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={handleClose} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 border-b pb-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  Color: {item.color} | Size: {item.size} | Qty: {item.quantity}
                </p>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total ({totalQuantity} items):</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Continue Shopping
            </button>
            <button
              onClick={handleCheckout}
              className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};