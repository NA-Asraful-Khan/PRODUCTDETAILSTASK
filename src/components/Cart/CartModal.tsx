import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setCartOpen, clearCart } from '../../store/cartSlice';
import toast from 'react-hot-toast';
import { Modal } from '../Modal/Modal';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';

export const CartModal: React.FC = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);

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
    <Modal isOpen={isOpen} onClose={handleClose} title="Your Cart">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        {items.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>
      <CartSummary
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
        onClose={handleClose}
        onCheckout={handleCheckout}
      />
    </Modal>
  );
};