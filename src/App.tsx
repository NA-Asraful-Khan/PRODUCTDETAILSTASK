import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCartOpen } from "./store/cartSlice";
import { CartModal } from "./components/CartModal";
import { product } from "./data/product";
import { RootState } from "./store/store";
import { Heart, Minus, Plus, Star, StarHalf } from "lucide-react";
import { Toaster } from "react-hot-toast";

function ProductPage() {
  console.log(window.location);
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedImage, setSelectedImage] = useState("purple");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].name);
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector((state: RootState) => state.cart.items);

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
        color: colors
          .filter((color) => color.hex === selectedColor)
          .map((color) => color.name)[0],
        size: selectedSize,
        quantity,
        price: size.offerprice,
        image: `${window.location}${product.images[selectedImage]}`,
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
                src={`${window.location}${product.images[selectedImage]}`}
                alt={product.name}
                className="w-full h-auto max-w-[630px] max-h-[720px] object-cover"
              />
            </div>

            <div className="lg:flex-1 p-8 lg:min-lg:w-[630px] flex flex-col justify-between">
              <h1 className="text-[30px] md:text-[40px] text-[#364A63] leading-[44px] font-bold tracking-[-1.2px] my-[12px]">
                {product.name}
              </h1>
              <div className="flex items-center gap-[4.5px] mb-[4px]">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <div className="flex w-[20px]  h-[20px]">
                  <div className="relative">
                    <StarHalf className="absolute top-0 left-0 w-5 h-5 text-yellow-400 fill-current" />
                    <StarHalf className="absolute top-0 left-0 w-5 h-5 text-yellow-400 scale-x-[-1]" />
                  </div>
                </div>
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="ml-2 text-sm text-[#8091A7]">(2 Reviews)</span>
              </div>
              <div className="flex gap-[5px] pt-[20px]">
                <p className="text-[#8091A7] leading-[30px] text-[20px] font-normal line-through">
                  $
                  {product.sizes
                    .find((s) => s.name === selectedSize)
                    ?.oldprice.toFixed(2)}
                </p>
                <p className="text-[#6576FF] leading-[30px] text-[24px] font-bold">
                  $
                  {product.sizes
                    .find((s) => s.name === selectedSize)
                    ?.offerprice.toFixed(2)}
                </p>
              </div>
              <p className="text-[#8091A7] font-normal text-[18px] mt-[20px] leading-[30px]">
                {product.description}
              </p>
              <div className="flex gap-[43px] mt-[20px]">
                <div>
                  <h3 className="text-[#8091A7] text-[14px]  leading-[23px] font-normal">
                    Type
                  </h3>
                  <p className="text-[#364A63] text-[16px]  leading-[23px] font-bold">
                    {product.productType}
                  </p>
                </div>
                <div>
                  <h3 className="text-[#8091A7] text-[14px]  leading-[23px] font-normal">
                    Model Number
                  </h3>
                  <p className="text-[#364A63] text-[16px]  leading-[23px] font-bold">
                    {product.modelNumber}
                  </p>
                </div>
              </div>
              <div className="mt-[20px]">
                <h2 className=" text-[#364A63] mb-[10px] font-bold text-[18px] leading-[20px]">
                  Band Color
                </h2>
                <div className="flex space-x-3">
                  {colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => handleColor(color)}
                      className="w-[16px] h-[16px]  rounded-full"
                      style={{
                        backgroundColor: color.hex,
                        boxShadow:
                          selectedColor === color.hex
                            ? `0 0 0 3px #ffffff, 0 0 0 5px ${color.hex}` // White gap + outer ring
                            : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-[20px]">
                <h2 className=" text-[#364A63] mb-[10px] font-bold text-[18px] leading-[20px]">
                  Wrist Size
                </h2>
                <div className="flex space-x-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`px-4 py-2 text-sm rounded-md border font-bold ${
                        selectedSize === size.name
                          ? "border-[#6576FF] text-[#6576FF]"
                          : "border-[#DBDFEA] text-[#364A63] hover:bg-gray-300"
                      }`}
                    >
                      {size.name}{" "}
                      <span className="text-[#8091A7] font-normal">
                        ${size.offerprice}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Set Quantity and Add to Cart */}
              <div className="flex justify-start items-center gap-[12px] text-[18px] mt-[20px]">
                {/* Set Quantity */}
                <div className="flex items-center text-[#8091A7] w-[130px] ">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-[8px] w-[35px] h-[36px]  py-[2px] rounded-l border  border-[#DBDFEA]"
                  >
                    <Minus />
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
                    <Plus />
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
