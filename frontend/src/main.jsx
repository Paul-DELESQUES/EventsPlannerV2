import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Calendar from "./pages/Calendar";
import Customers from "./pages/Customers";
import Error from "./pages/Error";
import Events from "./pages/Events";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Events />,
      },
      {
        path: "clients",
        element: <Customers />,
      },
      {
        path: "agenda",
        element: <Calendar />,
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
