import { useState, useEffect } from "react";
import { validateEmail } from "../utils/emailValidation";
import { createOrder, createCheckoutSession } from "../utils/orderApiService";

export function useCheckout(cart) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("checkoutEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  async function handleCheckout() {
    setEmailError("");
    setCheckoutError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsProcessing(true);

    try {
      const orderId = await createOrder(email, cart);
      const checkoutUrl = await createCheckoutSession(orderId);
      
      sessionStorage.setItem("checkoutEmail", email);
      window.location.href = checkoutUrl;
    } catch (error) {
      setCheckoutError(error.message || "Unable to connect to server. Please try again later.");
      setIsProcessing(false);
    }
  }

  function handleEmailChange(newEmail) {
    setEmail(newEmail);
    setEmailError("");
  }

  return {
    email,
    emailError,
    checkoutError,
    isProcessing,
    handleCheckout,
    handleEmailChange
  };
}
