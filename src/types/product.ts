export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: {
    [key: string]: string;
  };
  colors: string[];
  sizes: {
    name: string;
    price: number;
  }[];
}

export interface CartItem {
  id: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}