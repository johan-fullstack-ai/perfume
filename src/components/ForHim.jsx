import { useProducts } from "../contexts/ProductContext";
import ProductGrid from "./ProductGrid";

export default function ForHim() {
  const { forHim } = useProducts();

  return (
    <section className="productsSection">
      <h2 className="sectionTitle">Our Products</h2>
      <h3 className="categoryTitle">For Him</h3>
      <ProductGrid products={forHim} />
    </section>
  );
}
