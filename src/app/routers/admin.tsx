import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminPage } from "../../pages/admin/admin.page";
import { UsersPage } from "../../pages/admin/users.page";
import { CommandsPage } from "../../pages/admin/commands.page";
import { StatisticsPage } from "../../pages/admin/statistics.page";
import UsersModify from "../../pages/admin/users_modify.page";
import { AdminRoute } from ".";
import CommandModify from "../../pages/admin/commands_modify.page";

export default function AdminRouter() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminRoute children={<AdminPage />} />} />
      <Route
        path="/admin/users"
        element={<AdminRoute children={<UsersPage />} />}
      />
      <Route
        path="/admin/user_modify/:id"
        element={<AdminRoute children={<UsersModify />} />}
      />
      <Route
        path="/admin/commands"
        element={<AdminRoute children={<CommandsPage />} />}
      />
       <Route
        path="/admin/command_modify/:id"
        element={<AdminRoute children={<CommandModify />} />}
      />
      <Route
        path="/admin/statistics"
        element={<AdminRoute children={<StatisticsPage />} />}
      />
    </Routes>
  );
}
