import { Box } from "@mui/material";
import { useState } from "react";

export default function SearchBar() {
  const [value, setValue] = useState("");

  return (
    <Box
      sx={{
        display: "block",
        background: "#E3E3E3",

        borderRadius: "20px",
        height: "50px",
        marginTop: "24px",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "56px 1fr 64px",
      }}
    >
      <Box
        component="label"
        htmlFor="searchbar"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M18.031 16.617L22.314 20.899L20.899 22.314L16.617 18.031C15.0237 19.3082 13.042 20.0029 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20.0029 13.042 19.3082 15.0237 18.031 16.617ZM16.025 15.875C17.2941 14.5699 18.0029 12.8204 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18C12.8204 18.0029 14.5699 17.2941 15.875 16.025L16.025 15.875V15.875Z"
            fill="#7C7C7C"
          />
        </svg>
      </Box>
      <Box
        component="input"
        id="searchbar"
        placeholder="Search notes"
        sx={{
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          maxWidth: { xs: "200px", md: "100%" },
          color: "#6B6B6B",
        }}
        className="input-type"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            background: "rgba(0, 0, 0, .08)",
            borderRadius: "10px",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:active": {
              background: "rgba(0, 0, 0, .12)",
            },
            display: value === "" ? "none" : "flex",
          }}
          onClick={() => {
            setValue("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M22.1666 7.47825L20.5216 5.83325L13.9999 12.3549L7.47825 5.83325L5.83325 7.47825L12.3549 13.9999L5.83325 20.5216L7.47825 22.1666L13.9999 15.6449L20.5216 22.1666L22.1666 20.5216L15.6449 13.9999L22.1666 7.47825Z"
              fill="#7C7C7C"
            />
          </svg>
        </Box>
      </Box>
    </Box>
  );
}
