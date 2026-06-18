import { useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import SubscribeForm from "./SubscribeForm";
import logo from "../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerInner">
        <img
          src={logo}
          alt="Perfume logo"
          className="footerLogo"
          width="40"
          height="40"
        />

        <div className="socialIcons" aria-label="Social media links">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="socialLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="socialLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>

        <p className="footerPhone">
          <a href="mailto:firstname.surname@email.com">
            firstname.surname@email.com
          </a>
        </p>

        <SubscribeForm />

        <p className="footerCopyright">
          &copy; 2026 Perfume. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
