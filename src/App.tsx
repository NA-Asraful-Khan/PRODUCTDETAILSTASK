import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCartOpen } from "./store/cartSlice";
import { CartModal } from "./components/CartModal";
import { product } from "./data/product";
import { RootState } from "./store/store";
import { Heart, Star, StarHalf } from "lucide-react";
import { Toaster } from "react-hot-toast";

function ProductPage() {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedImage, setSelectedImage] = useState("purple");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].name);
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log(product.images.purple);
  const colors = [
    { name: "purple", hex: "#816BFF" },
    { name: "cyan", hex: "#1FCEC9" },
    { name: "blue", hex: "#4B97D3" },
    { name: "black", hex: "#3B4747" },
  ];

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleAddToCart = () => {
    const size = product.sizes.find((s) => s.name === selectedSize)!;
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        color: selectedColor,
        size: selectedSize,
        quantity,
        price: size.price,
        image: product.images[selectedColor],
      })
    );
  };

  const handleColor = (color: { name: string; hex: string }) => {
    setSelectedColor(color.hex);
    setSelectedImage(color.name);
  };

  return (
    <div className="mx-auto bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:max-h-[720px] max-w-[1320px] mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="lg:flex ">
            <div className="lg:flex-1 w-full">
              <img
                src={`http://localhost:5173${product.images[selectedImage]}`}
                alt={product.name}
                className="w-full h-auto max-w-[630px] max-h-[720px] object-cover"
              />
            </div>

            <div className="lg:flex-1 p-8 lg:min-lg:w-[630px]">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <StarHalf className="w-5 h-5 text-yellow-400" />
                <span className="ml-2 text-sm text-gray-500">(2 Reviews)</span>
              </div>
              <p className="text-xl font-bold text-blue-600 mb-4">
                $
                {product.sizes
                  .find((s) => s.name === selectedSize)
                  ?.price.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-8">{product.description}</p>
              <div className="mb-8">
                <h2 className="text-sm font-medium text-gray-900 mb-4">
                  Band Color
                </h2>
                <div className="flex space-x-3">
                  {colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => handleColor(color)}
                      className="w-8 h-8 rounded-full"
                      style={{
                        backgroundColor: color.hex,
                        boxShadow:
                          selectedColor === color.hex
                            ? `0 0 0 4px #ffffff, 0 0 0 6px ${color.hex}` // White gap + outer ring
                            : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <h2 className="text-sm font-medium text-gray-900 mb-4">
                  Wrist Size
                </h2>
                <div className="flex space-x-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`px-4 py-2 text-sm font-medium rounded-md border ${
                        selectedSize === size.name
                          ? "border-[#6576FF] text-[#6576FF]"
                          : "border-[#DBDFEA] text-[#364A63] hover:bg-gray-300"
                      }`}
                    >
                      {size.name}{" "}
                      <span className="text-[#8091A7]">${size.price}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Set Quantity and Add to Cart */}
              <div className="flex justify-start items-center gap-[12px] text-[18px]">
                {/* Set Quantity */}
                <div className="flex items-center text-[#8091A7] w-[130px] ">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-[8px] w-[35px] h-[36px]  py-[2px] rounded-l border  border-[#DBDFEA]"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-[60px] h-[36px] px-[26px] py-[3px] text-black leading-[23px] text-[14px] text-center border-t border-b border-[#DBDFEA]"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-[8px]  py-[2px]  w-[35px] h-[36px]  rounded-r border border-[#DBDFEA]"
                  >
                    +
                  </button>
                </div>
                {/*Add to Cart */}
                <div className="flex ">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#6576FF] rounded hover:bg-[#596dff]"
                  >
                    <p className="text-white px-[18px]  py-[8px]  text-[13px] leading-[20px]">
                      Add to Cart
                    </p>
                  </button>
                </div>

                <div className="text-[18px]">
                  <Heart className=" w-[20px] h-[20px] text-[#6576FF] leading-[15px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[92px]"></div>
      <div className="w-full flex justify-center">
        <button
          onClick={() => dispatch(setCartOpen(true))}
          className="w-[139px] h-[42px] border bg-[#FFBB5A] text-[#364A63] rounded-full font-semibold hover:bg-[#fcbe68] "
        >
          Checkout
          <span className=" bg-white text-black rounded ml-[10px] w-6 h-6 px-[6px] py-[2px] text-[12px]">
            {totalCartItems}
          </span>
        </button>
      </div>

      <CartModal />
      <Toaster position="top-center" />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ProductPage />
    </Provider>
  );
}

export default App;
