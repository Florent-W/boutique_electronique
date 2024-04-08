import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/shop/home.page";

export default function AdminRouter() {
  return (
    <Routes>
      <Route path="/admin" element={<HomePage />} />
    </Routes>
  );
}
