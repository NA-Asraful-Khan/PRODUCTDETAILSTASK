import { Product } from "../types/product";
import BLUE from "../asset/blue.png";
import PURPLE from "../asset/purple.png";
import CYAN from "../asset/cyan.png";
import Black from "../asset/black.png";

export const product: Product = {
  id: "1",
  name: "Classy Modern Smart watch",
  description:
    "I must explain to you how all this mistaken idea of denoun cing ple praising pain was born and I will give you a complete account of the system, and expound the actual teaching.",
  price: 79.0,
  images: {
    purple: PURPLE,
    cyan: CYAN,
    blue: BLUE,
    black: Black,
  },
  colors: ["#816BFF", "#1FCEC9", "#4B97D3", "#3B4747"],
  productType: "Watch",
  modelNumber: "Forerunner 290XT",
  sizes: [
    { name: "S", offerprice: 69.0, oldprice: 79.0 },
    { name: "M", offerprice: 79.0, oldprice: 89.0 },
    { name: "L", offerprice: 89.0, oldprice: 99.0 },
    { name: "XL", offerprice: 89.0, oldprice: 99.0 },
  ],
};
