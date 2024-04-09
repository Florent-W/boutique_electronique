import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminPage } from "../../pages/admin/admin.page";
import { UsersPage } from "../../pages/admin/users.page";
import { CommandsPage } from "../../pages/admin/commands.page";
import { StatisticsPage } from "../../pages/admin/statistics.page";

export default function AdminRouter() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/users" element={<UsersPage />} />
      <Route path="/admin/commands" element={<CommandsPage />} />
      <Route path="/admin/statistics" element={<StatisticsPage />} />
    </Routes>
  );
}
