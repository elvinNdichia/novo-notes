import { createRef } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

const routes = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    nodeRef: createRef(),
  },
  { path: "/about", name: "About", element: <About />, nodeRef: createRef() },
  {
    path: "/contact",
    name: "Contact",
    element: <Contact />,
    nodeRef: createRef(),
  },
];
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes.map((route) => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);

/* const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "notes/new", element: <>This is the Child or the / root</> },
    ],
  },
]);
*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
