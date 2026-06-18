import { useNavigate } from "react-router-dom";

export default function CancelPage() {
  const navigate = useNavigate();

  function handleReturnToCart() {
    navigate("/cart");
  }

  return (
    <section className="cartPage">
      <div className="modalContent">
        <h2 className="modalTitle">Payment Cancelled</h2>
        <p className="successText">Your order was not completed. You can return to your cart to try again.</p>
        <button className="ctaButton" onClick={handleReturnToCart}>
          Return to Cart
        </button>
      </div>
    </section>
  );
}
