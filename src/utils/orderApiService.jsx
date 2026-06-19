const apiUrl = import.meta.env.VITE_API_URL;

function createOrderDto(email, cart) {
  return {
    customerEmail: email,
    items: cart.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }))
  };
}

export async function createOrder(email, cart) {
  const orderData = createOrderDto(email, cart);
  
  const response = await fetch(`${apiUrl}api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Invalid order data. Please check your cart and try again.");
    } else if (response.status === 500) {
      throw new Error("Server error. Please try again later.");
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }

  const result = await response.json();
  return result.orderId;
}

export async function createCheckoutSession(orderId) {
  const response = await fetch(`${apiUrl}payments/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId })
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Invalid checkout session. Please try again.");
    } else if (response.status === 404) {
      throw new Error("Order not found. Please try again.");
    } else if (response.status === 500) {
      throw new Error("Server error. Please try again later.");
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }

  const result = await response.json();
  return result.url;
}
