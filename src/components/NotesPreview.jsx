import { Box } from "@mui/material";
import SearchBar from "./SearchBar";
import { Cards } from "./Card";
import { Link } from "react-router-dom";
import { Header } from "./Header";

export function NotesPreview({ isRightOpen, navBar }) {
  return (
    <Box
      sx={{
        borderRight: { xs: "none", md: "1px solid #EDECEC" },
        display: { xs: isRightOpen ? "none" : "grid", md: "grid" },
        padding: "24px  26px 0 24px",
        position: "relative",
        gridTemplateRows: "8rem 1fr",
        position: "relative",
        minHeight: "0px",
        "& >div": {
          minHeight: "0px",
        },
      }}
    >
      <Box>
        <Header />
        {navBar}
        {/* search bar */}
        <SearchBar />
      </Box>

      <Box sx={{ position: "relative", willChange: "transform" }}>
        <Box
          sx={{
            height: "100%",
            overflow: "auto",
            display: "block",
          }}
        >
          <Cards />
          <Link to="notes/new">
            <Box
              aria-label="add"
              sx={{
                position: "fixed",
                bottom: "30px",
                right: "24px",
                background: "#FBC103",
                width: "54px",
                height: "54px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "100px",
                cursor: "pointer",
                boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
                "&:active": { background: "#e3ae03" },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M7.5 7.75V0.25H10V7.75H17.5V10.25H10V17.75H7.5V10.25H0V7.75H7.5Z"
                  fill="white"
                />
              </svg>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
