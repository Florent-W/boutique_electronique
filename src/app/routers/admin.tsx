import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminPage } from "../../pages/admin/admin.page";
import { UsersPage } from "../../pages/admin/users.page";
import { CommandsPage } from "../../pages/admin/commands.page";
import { StatisticsPage } from "../../pages/admin/statistics.page";
import UsersModify from "../../pages/admin/users_modify.page";
import { AdminRoute } from ".";

export default function AdminRouter() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminRoute children={<AdminPage />} />} />
      <Route
        path="/admin/users"
        element={<AdminRoute children={<UsersPage />} />}
      />
      <Route
        path="/admin/users_modify"
        element={<AdminRoute children={<UsersModify />} />}
      />
      <Route
        path="/admin/commands"
        element={<AdminRoute children={<CommandsPage />} />}
      />
      <Route
        path="/admin/statistics"
        element={<AdminRoute children={<StatisticsPage />} />}
      />
    </Routes>
  );
}
