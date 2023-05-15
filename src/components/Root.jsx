import { Box } from "@mui/system";
import { Link, Outlet, useLocation } from "react-router-dom";
import { NotesPreview } from "./NotesPreview";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
  useOutlet,
} from "react-router-dom";
import "../transition-group-styles.css";

/* Transition group start */
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Container, Navbar, Nav } from "react-bootstrap";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { createRef } from "react";

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
/* Transition group end */

export function Root() {
  const location = useLocation();
  const isRightOpen = true;

  /* Transition group start */
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  const navBar = (
    <Navbar bg="light">
      <Nav className="mx-auto">
        {routes.map((route) => (
          <Nav.Link
            key={route.path}
            as={NavLink}
            to={route.path}
            className={({ isActive }) => (isActive ? "active" : undefined)}
            end
          >
            {route.name}
          </Nav.Link>
        ))}
      </Nav>
    </Navbar>
  );
  /* Transition group end */

  return (
    <AnimatePresence mode="wait">
      <motion.div
        transition={{ duration: 1 }}
        style={{
          background: "rgba(76, 102, 192, 0.24)",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            background: "#fff",
            width: "100%",
            maxWidth: "900px",
            height: { xs: "100%", lg: "95%" },
            maxHeight: { xs: "100%", lg: "812px" },
            display: "grid",
            position: "relative",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            "& > div": {
              height: "100%",
            },
          }}
        >
          <NotesPreview
            navBar={navBar}
            isRightOpen={isRightOpen}
            key="notes-preview"
          />
          <Box
            sx={{
              display: {
                xs: isRightOpen ? "grid" : "none",
                md: "grid",
              },
              gridTemplateRows: "96px 1fr",
              position: "relative",
              minHeight: "0px",
              "& >div": {
                minHeight: "0px",
              },
            }}
          >
            <Container className="container">
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  nodeRef={nodeRef}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  {(state) => (
                    <div ref={nodeRef} className="page">
                      {currentOutlet}
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </Container>
            {/*
            <Outlet />
          */}
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}

/*export function Root() {
  return (
    <>
      Welcome to the Root{" "}
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Logout
      </button>
    </>
  );
}
*/
