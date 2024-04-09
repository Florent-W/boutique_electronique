import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/shop/home.page";
import ArticlePage from "../../pages/shop/article.page";
import CartPage from "../../pages/shop/cart.page";
import AccountPage from "../../pages/shop/account.page";
import AddProductPage from "../../pages/shop/add_product.page";
import PaymentPage from "../../pages/shop/payment.page";
import CompletionPage from "../../pages/shop/completion.page";
import { ProtectedRoute } from ".";

export default function DefaultRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/add-product"
        element={<ProtectedRoute children={<AddProductPage />} />}
      />
      <Route path="/article/:id" element={<ArticlePage />} />
      <Route
        path="/cart"
        element={<ProtectedRoute children={<CartPage />} />}
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute
            children={<ProtectedRoute children={<PaymentPage />} />}
          />
        }
      />
      <Route
        path="/completion"
        element={<ProtectedRoute children={<CompletionPage />} />}
      />

      <Route
        path="/account"
        element={<ProtectedRoute children={<AccountPage />} />}
      />
    </Routes>
  );
}
