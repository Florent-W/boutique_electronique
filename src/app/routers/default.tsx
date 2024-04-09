import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/shop/home.page";
import ArticlePage from "../../pages/shop/article.page";
import CartPage from "../../pages/shop/cart.page";
import AccountPage from "../../pages/shop/account.page";

export default function DefaultRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/article/:id" element={<ArticlePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  );
}
