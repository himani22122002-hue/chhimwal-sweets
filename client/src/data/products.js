import baall from "../assets/images/baall.png";
import singodi from "../assets/images/singodi.png";
import peda from "../assets/images/peda.png";
import jalebii from "../assets/images/jalebii.png";
import besan from "../assets/images/besan.png";
import milkCake from "../assets/images/milk cake.png";

export const products = [
  {
    id: "baal-mithai",
    name: "Baal Mithai",
    category: "Baal Mithai",
    image: baall,
    rating: 4.8,
    description: "Traditional Kumaoni sweet made from khoya, coated with sugar balls.",
    variants: [
      { weight: "250g", price: 220 },
      { weight: "500g", price: 420 },
      { weight: "1kg", price: 800 },
    ],
  },

  {
    id: "singodi",
    name: "Singodi",
    category: "Singodi",
    image: singodi,
    rating: 4.7,
    description: "Delicious khoya sweet wrapped in fragrant Malu leaf.",
    variants: [
      { weight: "6 Pieces", price: 250 },
      { weight: "12 Pieces", price: 480 },
      { weight: "24 Pieces", price: 920 },
    ],
  },

  {
    id: "peda",
    name: "Peda",
    category: "Peda",
    image: peda,
    rating: 4.6,
    description: "Soft, creamy milk fudge prepared with pure desi ghee.",
    variants: [
      { weight: "250g", price: 180 },
      { weight: "500g", price: 350 },
      { weight: "1kg", price: 680 },
    ],
  },

  {
    id: "jalebi",
    name: "Jalebi",
    category: "Jalebi",
    image: jalebii,
    rating: 4.5,
    description: "Freshly fried crispy, syrup-soaked golden spirals.",
    variants: [
      { weight: "250g", price: 150 },
      { weight: "500g", price: 280 },
      { weight: "1kg", price: 540 },
    ],
  },

  {
    id: "besan-laddu",
    name: "Besan Laddu",
    category: "Besan Laddu",
    image: besan,
    rating: 4.6,
    description: "Roasted gram flour balls enriched with nuts and desi ghee.",
    variants: [
      { weight: "250g", price: 160 },
      { weight: "500g", price: 300 },
      { weight: "1kg", price: 580 },
    ],
  },

  {
    id: "milk-sweets",
    name: "Milk Cake",
    category: "Milk Sweets",
    image: milkCake,
    rating: 4.7,
    description: "Rich, creamy traditional milk cake.",
    variants: [
      { weight: "250g", price: 200 },
      { weight: "500g", price: 380 },
      { weight: "1kg", price: 750 },
    ],
  },
];