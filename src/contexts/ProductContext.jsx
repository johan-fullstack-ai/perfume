import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { defaultProducts } from "../data/products";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(defaultProducts);

  function addProduct({ name, price, image, category }) {
    const newProduct = {
      id: uuidv4(),
      name,
      price: parseFloat(price),
      image,
      category,
    };
    setProducts((prev) => [...prev, newProduct]);
  }

  function removeProduct(productId) {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }

  const forHer = products.filter((p) => p.category === "forHer");
  const forHim = products.filter((p) => p.category === "forHim");

  return (
    <ProductContext.Provider
      value={{ products, forHer, forHim, addProduct, removeProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
