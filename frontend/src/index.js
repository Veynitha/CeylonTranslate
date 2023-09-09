import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";


import Translatertestpage from "./pages/Translationsarindu";
import TranslatorHistory from "./pages/TranslatorHistory";
import Home from "./pages/Home";
import PageA from "./pages/PageA";
import PageB from "./pages/PageB";
import Navbar from "./components/Navbar";


import Edit from "./components/Historyedit"

const AppLayout = () => (
  <>
    <Navbar/>
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element:<Translatertestpage />
      },
      {
        path: "pagea",
        element: <PageA />,
      },
      {
        path: "pageb",
        element: <PageB />,
      },
      {
        path: "home",
        element: <Home/>,
      },
      {
        path: "translatorhistory",
        element: <TranslatorHistory />,
      },
      {
        path: "historyedit/:Id",
        element: <Edit />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);