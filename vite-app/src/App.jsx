import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./Pages/Home";
import ProductList from "./components/products/ProductList";
import ProductDetails from "./components/products/ProductDetails";
import Stock from "./components/products/Stock";
import EditBook from "./components/products/EditBook";
import Login from "./Pages/Login";
import AddProduct from "./components/products/AddProduct";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <div className="app-layout app-bg">
      {/* 🔹 NAVBAR ALWAYS VISIBLE */}
      <Navbar />

      {/* 🔹 PAGE CONTENT */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/:id/stock" element={<Stock />} />
          <Route path="/product/:id/edit" element={<EditBook />} />
         <Route
  path="/add"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AddProduct />
    </ProtectedRoute>
  }
/>

        </Routes>
      </div>

      {/* 🔹 FOOTER ALWAYS VISIBLE */}
      <Footer />
    </div>
  );
}

export default App;
