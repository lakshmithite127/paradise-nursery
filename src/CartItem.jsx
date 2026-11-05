import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const numericCost = parseFloat(item.cost.replace('$', ''));
      return total + numericCost * item.quantity;
    }, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon: Checkout functionality will be implemented soon!');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item, index) => {
            const unitPrice = parseFloat(item.cost.replace('$', ''));
            const subtotal = (unitPrice * item.quantity).toFixed(2);
            return (
              <div key={index} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Unit Price: {item.cost}</p>
                  <p>Subtotal: ${subtotal}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <button className="delete-btn" onClick={() => handleRemove(item)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="cart-actions">
        <button className="continue-shopping-btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="checkout-btn" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;