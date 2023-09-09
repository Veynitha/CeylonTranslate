import React from "react";
import { IoLanguage } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { MdConstruction} from "react-icons/md";





export const SidebarData = [
  {
    title: "Translater",
    path: "/",
    icon: <IoLanguage />,
    cName: "nav-text",
  },
  {
    title: "pagea",
    path: "/pagea",
    icon: <MdConstruction />,
    cName: "nav-text",
  },
  {
    title: "Image Recognition",
    path: "/imageRecognition",
    icon: <MdConstruction />,
    cName: "nav-text",
  },
  {
    title: "Home",
    path: "/home",
    icon: <MdConstruction />,
    cName: "nav-text",
  },
  {
    title: "My History",
    path: "/translatorhistory",
    icon: <FaHistory />,
    cName: "nav-text",
  },
];