import { useProducts } from "../contexts/ProductContext";
import ProductGrid from "./ProductGrid";

export default function ForHer() {
  const { forHer } = useProducts();

  return (
    <section className="productsSection">
      <h2 className="sectionTitle">Our Products</h2>
      <h3 className="categoryTitle">For Her</h3>
      <ProductGrid products={forHer} />
    </section>
  );
}
