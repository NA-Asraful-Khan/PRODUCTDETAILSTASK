import React from "react";
import { CartItem as CartItemType } from "../../types/product";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <tr>
      <td>
        <img
          src={`http://localhost:5173${item.image}`}
          alt={item.name}
          className="w-20 h-20 object-cover rounded"
        />
        <h3 className="font-semibold">{item.name}</h3>
      </td>
      <td>
        <p className="text-sm text-gray-600">{item.color}</p>
      </td>
      <td>
        <p className="text-sm text-gray-600"> {item.size}</p>
      </td>
      <td>
        <p className="text-sm text-gray-600">{item.quantity}</p>
      </td>
      <td>
        <p className="font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </td>
    </tr>
  );
};
