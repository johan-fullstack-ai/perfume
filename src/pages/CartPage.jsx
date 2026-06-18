import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  function findProduct(productId) {
    return products.find((p) => p.id === productId);
  }

  function getCartTotal() {
    return cart.reduce((total, item) => {
      const product = findProduct(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  async function handleCheckout() {
    setEmailError("");
    setCheckoutError("");

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsProcessing(true);

    const controller = new AbortController();
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      // Step 1: Create order
      const orderData = {
        customerEmail: email,
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      };

      const orderResponse = await fetch(`${apiUrl}api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
        signal: controller.signal
      });

      if (!orderResponse.ok) {
        if (orderResponse.status === 400) {
          setCheckoutError("Invalid order data. Please check your cart and try again.");
        } else if (orderResponse.status === 500) {
          setCheckoutError("Server error. Please try again later.");
        } else {
          setCheckoutError("An error occurred. Please try again.");
        }
        setIsProcessing(false);
        return;
      }

      const orderResult = await orderResponse.json();
      const orderId = orderResult.orderId;

      // Step 2: Create Stripe checkout session
      const checkoutResponse = await fetch(`${apiUrl}payments/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
        signal: controller.signal
      });

      if (!checkoutResponse.ok) {
        if (checkoutResponse.status === 400) {
          setCheckoutError("Invalid checkout session. Please try again.");
        } else if (checkoutResponse.status === 404) {
          setCheckoutError("Order not found. Please try again.");
        } else if (checkoutResponse.status === 500) {
          setCheckoutError("Server error. Please try again later.");
        } else {
          setCheckoutError("An error occurred. Please try again.");
        }
        setIsProcessing(false);
        return;
      }

      const { url } = await checkoutResponse.json();

      // Step 3: Redirect to Stripe checkout
      window.location.href = url;

    } catch (error) {
      if (error.name === "AbortError") {
        setCheckoutError("Checkout was cancelled.");
      } else {
        setCheckoutError("Unable to connect to server. Please try again later.");
      }
      setIsProcessing(false);
    }
  }

  function handleContinueShopping() {
    navigate(-1);
  }

  return (
    <section className="cartPage">
      <h2 className="sectionTitle">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="cartEmptyMessage">Your cart is empty</p>
      ) : (
        <>
          <div className="cartItems">
            {cart.map((item) => {
              const product = findProduct(item.productId);
              if (!product) return null;
              return (
                <div className="cartItem" key={item.productId}>
                  <img
                    className="cartItemImage"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="cartItemDetails">
                    <p className="cartItemName">{product.name}</p>
                    <p className="cartItemPrice">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="cartItemControls">
                    <button
                      className="quantityButton"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.productId, -1)}
                    >
                      &minus;
                    </button>
                    <span className="cartItemQuantity">{item.quantity}</span>
                    <button
                      className="quantityButton"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.productId, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="removeButton"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="cartSummary">
            <p className="cartTotal">Total: ${getCartTotal().toFixed(2)}</p>
          </div>

          <div className="cartEmailSection">
            <label htmlFor="cartEmail" className="cartEmailLabel">
              Email address for order confirmation
            </label>
            <input
              id="cartEmail"
              type="email"
              className="subscribeInput"
              placeholder="your.email@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailError("");
              }}
              required
              disabled={isProcessing}
            />
            {emailError && <p className="subscribeError">{emailError}</p>}
            {checkoutError && <p className="subscribeError">{checkoutError}</p>}
            <br /><br />
          </div>

          <div className="cartActions">
            <button 
              className="ctaButton" 
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Checkout"}
            </button>
            <button className="secondaryButton" onClick={handleContinueShopping}>
              Continue shopping
            </button>
            <button className="dangerButton" onClick={clearCart}>
              Clear cart
            </button>
          </div>
        </>
      )}
    </section>
  );
}
