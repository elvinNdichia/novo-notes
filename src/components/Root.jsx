import { Box } from "@mui/system";
import { Link, Outlet, useLocation } from "react-router-dom";
import { NotesPreview } from "./NotesPreview";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export function Root() {
  const location = useLocation();
  const isRightOpen = true;

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
          <NotesPreview isRightOpen={isRightOpen} key="notes-preview" />
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
            <Outlet />
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
