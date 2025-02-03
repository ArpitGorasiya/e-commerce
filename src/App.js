import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      {/* <DataProvider> */}
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<ProductDetails />} />
          <Route path="/" element={<Cart />} /> */}
        {/* <Route path="/" element={<MainPage />} /> */}
        {/* <Route path="/cart" element={<AddToCards />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
      {/* </DataProvider> */}
    </BrowserRouter>
  );
}

export default App;
