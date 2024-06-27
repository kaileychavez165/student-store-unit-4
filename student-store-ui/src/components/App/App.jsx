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
  const [userInfo, setUserInfo] = useState({ name: "", dorm_number: ""});
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

  console.log(products);

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

  const getItemPrice = (productId) => {
    const foundItem = products.filter(item => item.id === parseInt(productId))[0];

    console.log(foundItem);

    return foundItem.price;
  }

  const handleOnCheckout = async () => {
    setIsCheckingOut(true);

  try {
    const orderData = {
      customer_id: parseInt(userInfo.name), 
      total_price: 0, //default price
      status: "pending",
    };

    const orderResponse = await axios.post(`${baseUrl}orders`, orderData);
    const orderId = orderResponse.data.order_id; 

    console.log('Order created without items:', orderId);

    // fix syntax?? //able to create order with items if item data is hardcoded
    const orderItems = Object.entries(cart).map(item => ({
      product_id: parseInt(item[0]),
      quantity: item[1],
      price: getItemPrice(item[0]),
    }));

    console.log(cart);
    console.log(orderItems);
    // Iterate through orderItems and print values

    const total_price = 10;
    orderData.total_price = total_price;

    await axios.post(`${baseUrl}orders/${orderId}/items`, { items: orderItems });

    setCart({}); //clear cart
    setError(null);
  } catch (error) {
    console.error("Error creating order:", error);
    setError(error.response?.data?.error || "Failed to create order");
  } finally {
    setIsCheckingOut(false);
  }
    /*setIsCheckingOut(true);

    try {
      // Prepare orderData from cart items
      const orderItems = Object.values(cart).map(item => ({
        product_id: item.id,
        price: item.price,
        quantity: item.quantity
      }));

      const orderData = {
        customer_id: parseInt(userInfo.name), // Assuming userInfo has customer details
        total_price: 10, // Implement your own function to calculate total price
        status: "pending",
        orderItems: {
          create: orderItems
        }
      };

      // Make POST request to create order
      const response = await axios.post(`${baseUrl}orders`, orderData);
      const orderId = response.data.id; // Assuming response.data contains the created order details

      console.log('Order created successfully:', orderId);

      // Handle success: Maybe navigate to a success page or show a success message
      // Reset cart after successful order creation
      setCart({});
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error creating order:", error);
      setError(error.response?.data?.error || "Failed to create order");
    } finally {
      setIsCheckingOut(false);
    } */
  }

  /* setIsCheckingOut(true); // Set checkout state to true

    try {
      // Create an order with the current cart items
      const response = await axios.post(baseUrl + "orders", { items: Object.values(cart) });

      // Handle success
      if (response.status === 201) {
        setOrder(response.data); // Set the created order state
        setCart({}); // Reset the cart
        setIsCheckingOut(false); // Reset checkout state
      } else {
        setError("Failed to create order"); // Handle other response statuses
        setIsCheckingOut(false); // Reset checkout state on error
      }
    } catch (error) {
      setError(error.message); // Handle network errors or other exceptions
      setIsCheckingOut(false); // Reset checkout state on error
    } */


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
 