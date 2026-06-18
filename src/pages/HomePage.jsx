import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero image.jpg";

export default function HomePage() {
  return (
    <>
      <section className="heroSection">
        <img
          src={heroImage}
          alt="Beautifully decorated cakes"
          className="heroImage"
        />
        <div className="heroOverlay"></div>
        <div className="heroContent">
          <h1 className="heroHeading">Perfume</h1>
          <p className="heroSubheading">For Her &amp; For Him!</p>
          <Link to="/products" className="ctaButton">
            View Products
          </Link>
        </div>
      </section>

      <section className="aboutSection">
        <p className="aboutText">
          We believe that a fragrance is more than just a scent. It is an invisible wardrobe, a silent introduction, and a powerful extension of your identity. Born from a passion for high-class parfumerie, our house creates liquid art designed for those who command presence without saying a word.
        </p>
      </section>
    </>
  );
}
