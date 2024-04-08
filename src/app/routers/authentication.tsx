import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/shop/home.page";

export default function AuthenticationRouter() {
  return (
    <Routes>
      <Route path="/login" element={<HomePage />} />
      {/* register, login, ... */}
    </Routes>
  );
}
