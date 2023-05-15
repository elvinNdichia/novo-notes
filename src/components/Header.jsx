import { Box } from "@mui/system";
import { UserContext } from "../App";
import React from "react";

export function Header() {
  const user = React.useContext(UserContext);
  console.log("From context: ", user);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clipPath="url(#clip0_183_196)">
          <path
            d="M8 2V22H4V18H2V16H4V13H2V11H4V8H2V6H4V2H8ZM20.005 2C21.107 2 22 2.898 22 3.99V20.01C22 21.109 21.107 22 20.005 22H10V2H20.005Z"
            fill="#FBC103"
          />
        </g>
        <defs>
          <clipPath id="clip0_183_196">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <Box
        sx={{
          overflow: "auto",
          borderRadius: "40px",
          width: "40px",
          height: "40px",
          border: "1px solid #eee",
          cursor: "pointer",
        }}
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        <img src={user.photoURL} width="40px" height="40px" />
      </Box>
    </Box>
  );
}
