import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./protected/PrivateRoutes";

import Login from "./auth/Login";
import AddRole from "./pages/roles/AddRole";
import RoleList from "./pages/roles/RoleList";
import EditRole from "./pages/roles/EditRole";
import UserList from "./pages/users/UserList";
import EditUser from "./pages/users/EditUser";
import AddUser from "./pages/users/AddUser";
import UsersRole from "./pages/usersrole/UsersRole";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import AddCustomer from "./pages/customer/AddCustomer.jsx";
import Customers from "./pages/customer/Customers.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route index path="/Login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<App />}>
                    <Route path="/dashboard/roles" element={<RoleList />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/add-user" element={<AddUser />} />
                    <Route path="/dashboard/add-role" element={<AddRole />} />
                    <Route path="/dashboard/edit-role/:id" element={<EditRole />} />
                    <Route path="/dashboard/users" element={<UserList />} />
                    <Route path="/dashboard/usersrole" element={<UsersRole />} />
                    <Route path="/dashboard/edit-user/:id" element={<EditUser />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/customers/add" element={<AddCustomer />} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
);
