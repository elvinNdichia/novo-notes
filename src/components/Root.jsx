import { Box } from "@mui/system";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { NotesPreview } from "./NotesPreview";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect } from "react";

export function Root() {
  const { id: currentNoteId } = useParams();
  const location = useLocation();
  const currentPath = window.location.pathname;

  useEffect(() => {
    // Scroll to top when the location changes
    window.scrollTo(0, 0);
  }, [location]);

  const isRightOpen = currentNoteId || currentPath === "/notes/new";

  return (
    <div
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
        <NotesPreview isRightOpen={isRightOpen} key={location.pathname} />
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
          <Outlet key={location.pathname} />
        </Box>
      </Box>
    </div>
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
