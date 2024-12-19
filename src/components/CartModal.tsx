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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-[651px] w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#364A63]">Your Cart</h2>
          <button onClick={handleClose} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-[4fr,1fr,1fr,1fr,1fr] gap-4 pb-2 border-b text-gray-600">
          <div className="text-left font-normal leading-[23px] text-[14px]  text-[#8091A7]">
            Item
          </div>
          <div className="font-normal text-center leading-[23px] text-[14px]  text-[#8091A7]">
            Color
          </div>
          <div className="font-normal text-center leading-[23px] text-[14px]  text-[#8091A7]">
            Size
          </div>
          <div className="font-normal text-center leading-[23px] text-[14px]  text-[#8091A7]">
            Qnt
          </div>
          <div className="text-right font-normal leading-[23px] text-[14px]  text-[#8091A7]">
            Price
          </div>
        </div>
        <div id="cartItems" className="max-h-[60vh] overflow-y-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[4fr,1fr,1fr,1fr,1fr] gap-4 py-4 border-b items-center"
            >
              <div className="flex justify-start text-left items-center gap-[8px] ">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[36px] h-[36px] object-cover rounded"
                />
                <h3 className=" text-[#364A63] leading-[23px] text-[14px] font-normal ">
                  {item.name}
                </h3>
              </div>
              <p className="text-center capitalize text-[#364A63] leading-[23px] text-[14px] font-normal ">
                {item.color}
              </p>
              <p className="text-center text-[#364A63] leading-[23px] text-[14px] font-bold ">
                {item.size}
              </p>
              <p className="text-center text-[#364A63] leading-[23px] text-[14px] font-bold ">
                {item.quantity}
              </p>
              <p className="text-right text-[#364A63] leading-[23px] text-[14px] font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div id="cartSummary" className="mt-4">
          <div className="grid grid-cols-[4fr,1fr,1fr,1fr,1fr] gap-4 py-4 ">
            <p className="text-left leading-[22px] text-[16px] text-[#364A63] font-bold">
              Total
            </p>
            <p></p>
            <p></p>
            <p className="leading-[34px] text-[14px] text-center text-[#364A63] font-bold">
              ${totalQuantity}
            </p>
            <p className="text-right leading-[34px] text-[18px] text-[#364A63] font-bold">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-end gap-4 mt-6">
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
