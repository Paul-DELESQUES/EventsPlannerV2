import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthContext";

import App from "./App";
import Dashboard from "./layout/Dashboard";
import Calendar from "./pages/Calendar";
import Error from "./pages/Error";
import Events from "./pages/Events";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Providers from "./pages/Providers";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/connexion",
        element: <Login />,
      },
      {
        path: "/inscription",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "agenda",
            element: (
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            ),
          },
          {
            path: "evenements",
            element: (
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            ),
          },
          {
            path: "prestataires",
            element: (
              <ProtectedRoute>
                <Providers />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
