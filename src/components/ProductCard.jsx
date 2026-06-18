import { useCart } from "../contexts/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="productCard">
      <img
        className="productImage"
        src={product.image}
        alt={product.name}
        loading="lazy"
        width="576"
        height="768"
      />
      <div className="productInfo">
        <h4 className="productName">{product.name}</h4>
        <p className="productPrice">${product.price.toFixed(2)}</p>
        <button
          className="ctaButton addToCartButton"
          onClick={() => addToCart(product.id)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
