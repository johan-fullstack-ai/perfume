import { useProducts } from "../contexts/ProductContext";
import ProductGrid from "../components/ProductGrid";

export default function ForHerPage() {
  const { forHer } = useProducts();

  return (
    <section className="productsSection">
      <h2 className="sectionTitle">Our Products</h2>
      <h3 className="categoryTitle">For Her</h3>
      <ProductGrid products={forHer} />
    </section>
  );
}
