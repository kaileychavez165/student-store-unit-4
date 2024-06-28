import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart";
import "./App.css";

function App() {

  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", email: ""});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  // Toggles sidebar
  const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const baseUrl = "http://localhost:3000/";

  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get(baseUrl + "products");
        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const getOrderItemPrice = (productId) => {
    const foundOrderItem = products.filter(orderItem => orderItem.id === parseInt(productId))[0];

    console.log(foundOrderItem);

    return foundOrderItem.price;
  }

  const handleOnCheckout = async () => {
    setIsCheckingOut(true);

    try {
      const orderData = {
        customer_id: parseInt(userInfo.name), 
        total_price: 0,
        status: "pending"
      };

      let orderResponse = await axios.post(`${baseUrl}orders`, orderData);
      const orderId = orderResponse.data.order_id;

      const orderItems = Object.entries(cart).map(item => ({
        product_id: parseInt(item[0]),
        quantity: item[1],
        price: getOrderItemPrice(item[0]),
      }));

      await axios.post(`${baseUrl}orders/${orderId}/items`, { items: orderItems });
      await axios.put(`${baseUrl}orders/${orderId}`, {status: "completed"});
      orderResponse = await axios.get(`${baseUrl}orders/${orderId}`);

      setOrder(orderResponse.data);
      setCart({});
      setUserInfo({ name: "", email: ""});
      setError(null);
    } catch (error) {
      console.error("Error creating order:", error);
      setError(error.response?.data?.error || "Failed to create order");
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={toggleSidebar}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
 