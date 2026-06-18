import { useState } from "react";
import { useProducts } from "../../contexts/ProductContext";

export default function AdminProductsPage() {
  const { products, addProduct, removeProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "forHer",
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleAdd(event) {
    event.preventDefault();
    setMessage("");

    if (!formData.name.trim() || !formData.price || !formData.image.trim()) {
      setMessage("All fields are required.");
      return;
    }

    addProduct(formData);
    setMessage(`"${formData.name}" has been added.`);
    setFormData({ name: "", price: "", image: "", category: "forHer" });
  }

  return (
    <section className="adminSection">
      <h2 className="sectionTitle">Manage Products</h2>

      <div className="adminFormWrapper">
        <h3 className="categoryTitle">Add New Product</h3>
        <form className="adminForm" onSubmit={handleAdd}>
          <div className="formGroup">
            <label htmlFor="productName">Title</label>
            <input
              id="productName"
              type="text"
              name="name"
              className="formInput"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="productPrice">Price</label>
            <input
              id="productPrice"
              type="number"
              name="price"
              className="formInput"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="productImage">Image URL</label>
            <input
              id="productImage"
              type="text"
              name="image"
              className="formInput"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="productCategory">Category</label>
            <select
              id="productCategory"
              name="category"
              className="formInput"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="forHer">For Her</option>
              <option value="forHim">For Him</option>
            </select>
          </div>

          {message && <p className="formSuccess">{message}</p>}

          <button type="submit" className="ctaButton">
            Add Product
          </button>
        </form>
      </div>

      <div className="adminProductList">
        <h3 className="categoryTitle">All Products</h3>
        <div className="productGrid">
          {products.map((product) => (
            <div className="productCard" key={product.id}>
              <img
                className="productImage"
                src={
                  product.image.includes("assets") || product.image.startsWith("http")
                    ? product.image
                    : import.meta.env.BASE_URL + product.image
                }
                alt={product.name}
                loading="lazy"
                width="576"
                height="768"
              />
              <div className="productInfo">
                <h4 className="productName">{product.name}</h4>
                <p className="productPrice">${product.price.toFixed(2)}</p>
                <button
                  className="dangerButton"
                  onClick={() => removeProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
