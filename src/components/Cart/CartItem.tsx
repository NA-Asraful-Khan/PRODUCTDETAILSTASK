import React from 'react';
import { CartItem as CartItemType } from '../../types/product';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="flex items-center gap-4 border-b pb-4">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">
          Color: {item.color} | Size: {item.size} | Qty: {item.quantity}
        </p>
        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};