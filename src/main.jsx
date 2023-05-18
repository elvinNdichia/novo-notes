import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage.jsx";
import Note from "./components/Note.jsx";
import NothingSelected from "./components/NothingSelected.jsx";
import { NewNote } from "./components/NewNote.jsx";
import { AnimatePresence } from "framer-motion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "notes/new", element: <NewNote /> },
      { path: "note/:id", element: <Note /> },
      { index: true, element: <NothingSelected /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
