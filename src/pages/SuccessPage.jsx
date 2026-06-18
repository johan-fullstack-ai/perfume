import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SuccessPage() {
  const [status, setStatus] = useState("Loading...");
  const [isPaid, setIsPaid] = useState(false);
  const orderId = new URLSearchParams(window.location.search).get("orderId");
  const { clearCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  function handleCloseSuccess() {
    // Empty the parameters (?orderId=) so that the Router releases its grip on the page
    setSearchParams({});

    // Send the user to the home page seamlessly
    navigate("/", { replace: true });
  }

  useEffect(() => {
    async function fetchStatus() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await fetch(`${apiUrl}api/orders/${orderId}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            setStatus("Order not found. Please contact support.");
            return;
          }
          setStatus("Error retrieving order. Please contact support.");
          return;
        }

        const data = await res.json();
        if (data.paymentStatus === "Paid") {
          setStatus("Your heavenly scented perfumes have been ordered!");
          setIsPaid(true);
          clearCart();
          // Clear saved email from sessionStorage on successful payment
          sessionStorage.removeItem("checkoutEmail");
        } else {
          setStatus("Payment is being processed…");
          // Check again after a few seconds
          setTimeout(fetchStatus, 3000);
        }
      } catch (error) {
        setStatus("Unable to connect to server. Please try again later.");
      }
    }

    if (orderId) {
      fetchStatus();
    } else {
      setStatus("No order ID provided.");
    }
  }, [orderId]);

  return (
    <section className="cartPage">
      <div className="modalContent successModal">
        <h2 className="modalTitle">Order Confirmation</h2>
        <p className="successText">{status}</p>
        {isPaid && (
          <button className="ctaButton" onClick={handleCloseSuccess}>
            Close
          </button>
        )}
      </div>
    </section>
  );
}
