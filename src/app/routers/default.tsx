import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/shop/home.page";

export default function DefaultRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
