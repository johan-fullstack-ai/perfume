import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductContext";
import { useCheckout } from "../hooks/useCheckout";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  
  const {
    email,
    emailError,
    checkoutError,
    isProcessing,
    handleCheckout,
    handleEmailChange
  } = useCheckout(cart);

  function findProduct(productId) {
    return products.find((p) => p.id === productId);
  }

  function getCartTotal() {
    return cart.reduce((total, item) => {
      const product = findProduct(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
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
              onChange={(event) => handleEmailChange(event.target.value)}
              required
              disabled={isProcessing}
            />
            {emailError && <p className="formError">{emailError}</p>}
            {checkoutError && <p className="formError">{checkoutError}</p>}
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
