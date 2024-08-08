import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import ProductList from "./components/prouductlist/productList";
import Login from "./components/pages/login";
import Cart from "./components/pages/cart";
import Register from "./components/pages/RegisterForm";
import NotFound from "./components/pages/notfound";
import Banner from "./components/banner/banner";
import { useTheme } from './context/ThemeContext';
import "./components/navbar/navbar.css";  // Import the navbar CSS
import "./context/themecontext.css";  // Import the theme context CSS


import "./index.css";

const Products = React.lazy(() => import("./components/Products/Product"));

function App() {
  const location = useLocation();
  // const { theme, toggleTheme } = useTheme();

  return (
    <div className="">
      <Navbar /> 
 
      {location.pathname === "/" && <Banner />}
      <Suspense fallback={<h3>Loading pages...</h3>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProductList />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/product/:id" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

     

    </div>



  );
}

export default App;
