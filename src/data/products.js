import forher01 from "../assets/images/ForHer/Ring.jpg";
import forher02 from "../assets/images/ForHer/Eclipse.jpg";
import forher03 from "../assets/images/ForHer/Ember.jpg";
import forher04 from "../assets/images/ForHer/Moonslice.jpg";
import forher05 from "../assets/images/ForHer/Glow.jpg";
import forher06 from "../assets/images/ForHer/Solstice-Veil.jpg";
import forher07 from "../assets/images/ForHer/Halo-Prism.jpg";
import forher08 from "../assets/images/ForHer/Opal-Wing.jpg";

import forhim01 from "../assets/images/ForHim/Eye.jpg";
import forhim02 from "../assets/images/ForHim/Aurora-Eagle.jpg";
import forhim03 from "../assets/images/ForHim/Armorer.jpg";
import forhim04 from "../assets/images/ForHim/Knightvision.jpg";
import forhim05 from "../assets/images/ForHim/Navigator.jpg";
import forhim06 from "../assets/images/ForHim/Midnight-Herald.jpg";
import forhim07 from "../assets/images/ForHim/Dragon-Crest.jpg";
import forhim08 from "../assets/images/ForHim/Obsidian-Fury.jpg";

const forHer = [
  { id: 1, name: "Ring", price: 154.0, image: forher01, category: "forHer" },
  { id: 2, name: "Eclipse", price: 189.0, image: forher02, category: "forHer" },
  { id: 3, name: "Ember", price: 189.0, image: forher03, category: "forHer" },
  { id: 4, name: "Moonslice", price: 189.0, image: forher04, category: "forHer" },
  { id: 5, name: "Glow", price: 189.0, image: forher05, category: "forHer" },
  { id: 6, name: "Solstice Veil", price: 199.0, image: forher06, category: "forHer" },
  { id: 7, name: "Halo Prism", price: 210.0, image: forher07, category: "forHer" },
  { id: 8, name: "Opal Wing", price: 215.0, image: forher08, category: "forHer" },
];

const forHim = [
  { id: 9, name: "Eye", price: 154.0, image: forhim01, category: "forHim" },
  { id: 10, name: "Aurora Eagle", price: 189.0, image: forhim02, category: "forHim" },
  { id: 11, name: "Armorer", price: 189.0, image: forhim03, category: "forHim" },
  { id: 12, name: "Knightvision", price: 189.0, image: forhim04, category: "forHim" },
  { id: 13, name: "Navigator", price: 189.0, image: forhim05, category: "forHim" },
  { id: 14, name: "Midnight Herald", price: 199.0, image: forhim06, category: "forHim" },
  { id: 15, name: "Dragon Crest", price: 210.0, image: forhim07, category: "forHim" },
  { id: 16, name: "Obsidian Fury", price: 215.0, image: forhim08, category: "forHim" },
];

export const defaultProducts = [...forHer, ...forHim];
