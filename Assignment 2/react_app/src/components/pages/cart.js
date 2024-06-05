import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchCartItems, removeFromCart, clearCart } from '../data/cart_repository';

function Cart() {

  const navigate = useNavigate();
  const [cartItems_DB, setCartItems_DB] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  //Fetch cart items from database.
  const fetchCart = async () => {
    try {
      const data = await fetchCartItems();
      setCartItems_DB(data);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
    }
  };

  //checkout validations 
  const totalAmount = (cartItems_DB.reduce((total, item) => total + item.price, 0));
  const roundedTotalAmount = totalAmount.toFixed(2);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cardNumberError, setCardNumberError] = useState('');

  function handleCheckout() {
    // Perform credit card validation, expiry date checking, and other validation here
    if (validateCardNumber(cardNumber) && checkExpiryDate(expiryDate) && validateCVV(cvv) && shippingAddress.trim() !== '') {
      // Open the modal
      setIsSubmitted(true);
    } else {
      alert('Invalid credit card details!');
    }
  }

  function validateCardNumber(cardNumber) {
    // Implement credit card number validation logic here
    if (!/^\d{16}$/.test(cardNumber)) {
      setCardNumberError('Please enter a 16-digit card number');
      return false;
    }
    setCardNumberError('');
    return true;
  }

  function checkExpiryDate(expiryDate) {
    // Implement expiry date checking logic
    const [month, year] = expiryDate.split('/');
    const currentYear = new Date().getFullYear().toString().slice(-2); // Get last two digits of current year
    return month > 0 && month <= 12 && year >= currentYear;
  }

  function validateCVV(cvv) {
    // Implement CVV validation logic
    return /^\d{3,4}$/.test(cvv);
  }

  function handleModalClose() {
    // Clear the cart when the modal is closed
    handleClearCart();
    navigate('/');
    setIsSubmitted(false);
  }

  //remove product from database
  async function handleRemoveFromCart(productId) {
    try {
      await removeFromCart(productId);
      setCartItems_DB(cartItems_DB.filter(item => item.name !== productId));
    } catch (error) {
      alert(error.message);
    }
  }

  //Clear cart in database
  const handleClearCart = async () => {
    navigate('/specials');
    try {
      await clearCart();
      
      
    } catch (error) {
      console.error("Error clearing cart: ", error);
      alert("Failed to clear cart. Please try again.");
    }
    fetchCart();
  };

  // Function to aggregate items with their quantities
  const aggregateItems = cartItems_DB.reduce((acc, item) => {
    if (acc[item.name]) {
      acc[item.name].quantity += 1;
    } else {
      acc[item.name] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});

  // Convert the aggregated items object back to an array
  const aggregatedCartItems = Object.values(aggregateItems);

  // Calculate the total quantity of all items
  const totalQuantity = aggregatedCartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container mt-5" style={{ marginBottom: 70 }}>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Shopping Cart</h2>
        </div>
        <div className="card-body">
          {cartItems_DB.length > 0 ? (
            <div className="row">
              <div className="col-md-8">
                {aggregatedCartItems.map((item, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Price: ${item.price}</p>
                      <p className="card-text">Quantity: {item.quantity}</p>
                      <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.name)}>Remove</button>
                    </div>
                  </div>
                ))}
                <button className="btn btn-warning" onClick={handleClearCart}>Clear Cart</button>
              </div>
              
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Summary</h4>
                    <p className="card-text">Total Quantity: {totalQuantity}</p>
                    <h5 className="card-title">Total Amount</h5>
                    <p className="card-text">Total: ${roundedTotalAmount}</p>
                    <div className="form-group">
                      <input type="text" className={`form-control mb-2 ${cardNumberError ? 'is-invalid' : ''}`} placeholder="Credit Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                      {cardNumberError && <div className="invalid-feedback">{cardNumberError}</div>}
                      <input type="text" className="form-control mb-2" placeholder="Expiry Date (MM/YY)" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                      <input type="text" className="form-control mb-2" placeholder="CVV" value={cvv} onChange={(e) => setCVV(e.target.value)} />
                      <textarea className="form-control mb-2" rows="3" placeholder="Shipping Address" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
                    </div>
                    <button className="btn btn-success btn-block" onClick={handleCheckout} data-toggle="modal" data-target="#checkoutModal">Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>

      <div className={`modal ${isSubmitted ? 'show' : ''}`} id="checkoutModal" tabIndex="-1" role="dialog" aria-labelledby="checkoutModalLabel" aria-modal="true" style={{ display: isSubmitted ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="checkoutModalLabel">Order Confirmation</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Your order has been successfully placed!</p>
              <p>Summary:</p>
              <ul>
                {aggregatedCartItems.map((item, index) => (
                  <li key={index}>{item.name} - ${item.price} (Quantity: {item.quantity})</li>
                ))}
                <li><strong>Total Quantity: {totalQuantity}</strong></li>
                <li><strong>Total Amount Paid: ${roundedTotalAmount}</strong></li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
