import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Dashboard from "./layout/Dashboard";
import Calendar from "./pages/Calendar";
import Error from "./pages/Error";
import Events from "./pages/Events";
import LandingPage from "./pages/LandingPage";
import Providers from "./pages/Providers";

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
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "agenda",
            element: <Calendar />,
          },
          {
            path: "evenements",
            element: <Events />,
          },
          {
            path: "prestataires",
            element: <Providers />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
