import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminPage } from "../../pages/admin/admin.page";
import { UsersPage } from "../../pages/admin/users.page";

export default function AdminRouter() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/users" element={<UsersPage />} />
    </Routes>
  );
}
