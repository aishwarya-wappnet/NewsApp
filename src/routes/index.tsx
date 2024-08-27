import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

import Home from "../pages/home";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { DataProvider } from "../contexts/DataContext";

const Login = lazy(() => import("../pages/Login"));
const Users = lazy(() => import("../pages/admin/Users"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Articles = lazy(() => import("../pages/admin/Articles"));

export const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <DataProvider>
            <Home />
          </DataProvider>
        }
      />
      <Route
        path="/admin-login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <PublicRoute>
              <Login />
            </PublicRoute>
          </Suspense>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <DataProvider>
              <AdminLayout />
            </DataProvider>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="users"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Users />
            </Suspense>
          }
        />
        <Route
          path="articles"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Articles />
            </Suspense>
          }
        />
      </Route>
    </Route>
  ),
  { basename: "/" }
);
