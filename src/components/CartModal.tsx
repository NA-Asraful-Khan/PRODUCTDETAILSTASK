import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setCartOpen, clearCart } from "../store/cartSlice";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export const CartModal: React.FC = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);

  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    dispatch(clearCart());
    toast.success("Thanks for shopping with us!");
  };

  const handleClose = () => {
    dispatch(setCartOpen(false));
  };

  console.log(items);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-[651px] w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={handleClose} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto">
          <table className="w-full border-separate border-spacing-[20px]">
            <thead>
              <tr className="">
                <th className="text-left font-normal leading-[23px] text-[14px]  text-[#8091A7]">
                  Item
                </th>
                <th className="font-normal leading-[23px] text-[14px]  text-[#8091A7]">
                  Color
                </th>
                <th className="font-normal leading-[23px] text-[14px]  text-[#8091A7]">
                  Size
                </th>
                <th className="font-normal leading-[23px] text-[14px]  text-[#8091A7]">
                  Qty
                </th>
                <th className="text-right font-normal leading-[23px] text-[14px]  text-[#8091A7]">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="flex justify-start text-left items-center gap-[8px] ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[36px] h-[36px] object-cover rounded"
                    />
                    <h3 className="font-semibold">{item.name}</h3>
                  </td>
                  <td>
                    <p className="text-center text-sm text-gray-600">
                      {item.color}
                    </p>
                  </td>
                  <td>
                    <p className="text-center text-sm text-gray-600">
                      {item.size}
                    </p>
                  </td>
                  <td>
                    <p className="text-center text-sm text-gray-600">
                      {item.quantity}
                    </p>
                  </td>
                  <td>
                    <p className="text-right font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </td>
                </tr>
              ))}
              <tr className="text-[#373737] font-bold">
                <td className="text-left leading-[22px] text-[16px]">Total</td>
                <td className=""></td>
                <td className=""></td>
                <td className="leading-[34px] text-[14px] text-center">
                  {totalQuantity}
                </td>
                <td className="text-right leading-[34px] text-[18px]">
                  ${totalPrice.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex gap-4 justify-end">
            <button
              onClick={handleClose}
              className="w-[152px] px-[18px] py-[8px] rounded-md border border-[#DBDFEA]  text-[#364A63] leading-[20px] text-[13px] font-bold "
            >
              Continue Shopping
            </button>
            <button
              onClick={handleCheckout}
              className="w-[94px] px-[18px] py-[8px] rounded-md bg-[#6576FF] text-white leading-[20px] text-[13px] font-bold"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
