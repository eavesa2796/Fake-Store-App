import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/HomePage";
import About from "./components/About";
import ProductListingPage from "./components/ProductListingPage";
import ProductDetailsPage from "./components/ProductDetailsPage";
import AddProductPage from "./components/AddProductPage";
import EditProductPage from "./components/EditProductPage";
import DeleteProductFunctionality from "./components/DeleteProductFunctionality";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route
          path="/delete-product"
          element={
            <DeleteProductFunctionality
              onDelete={(id) => console.log("Deleted product:", id)}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
