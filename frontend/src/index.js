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
import Imt2Txt from './components/Img-2-Txt'
import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload";

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
        path: "pdf-Translation",
        element: <FileUpload />,
      },
      {
        path: "imageRecognition",
        element: <Imt2Txt />,
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