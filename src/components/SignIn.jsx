import { Box } from "@mui/system";
import { motion } from "framer-motion";
import { SimpleBarTest } from "./SimpleBar";

export function SignIn({ signIn }) {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#D4DAF0",
        }}
      >
        <Box
          sx={{
            background: "#fff",
            width: "22.4rem",
            maxWidth: "calc(100% - 32px)",
            height: "22.4rem",
            padding: "16px",
          }}
        >
          <motion.div
            style={{ marginBottom: "24px" }}
            animate={{ y: 0 }}
            initial={{ y: "2rem" }}
            transition={{ delay: 0.1 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_216_206)">
                <path
                  d="M8 2V22H4V18H2V16H4V13H2V11H4V8H2V6H4V2H8ZM20.005 2C21.107 2 22 2.898 22 3.99V20.01C22 21.109 21.107 22 20.005 22H10V2H20.005Z"
                  fill="#FBC103"
                />
              </g>
              <defs>
                <clipPath id="clip0_216_206">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </motion.div>
          <motion.div
            animate={{ y: 0 }}
            initial={{ y: "2rem" }}
            transition={{ delay: 0.16 }}
          >
            <h1 className="note-title" style={{ color: "#8D8888" }}>
              Welcome to Notes
            </h1>
          </motion.div>
          <motion.div
            animate={{ y: 0 }}
            initial={{ y: "2rem" }}
            transition={{ delay: 0.2 }}
          >
            <p
              className="note-body"
              style={{ color: "rgba(0, 0, 0, .87)", marginTop: ".5rem" }}
            >
              Sign in with
            </p>
          </motion.div>
          <motion.div
            animate={{ y: 0 }}
            initial={{ y: "2rem" }}
            transition={{ delay: 0.22 }}
            onClick={signIn}
          >
            <Box
              component="button"
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "24px",
                boxShadow: "0px 1px 3px 0px #00000033",
                boxShadow: "0px 2px 1px 0px #0000001F",
                boxShadow: "0px 1px 1px 0px #00000024",
                background: "#fff",
                border: "1px solid #eee",
                height: "38px",
                position: "relative",
                width: "100%",
                cursor: "pointer",
                "&:active": {
                  background: "rgba(0, 0, 0, .04)",
                },
                borderRadius: "2rem",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginRight: "1rem", marginLeft: ".1rem" }}
              >
                <path
                  d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                  fill="#FBC02D"
                />
                <path
                  d="M3.15283 7.3455L6.43833 9.755C7.32733 7.554 9.48033 6 11.9998 6C13.5293 6 14.9208 6.577 15.9803 7.5195L18.8088 4.691C17.0228 3.0265 14.6338 2 11.9998 2C8.15883 2 4.82783 4.1685 3.15283 7.3455Z"
                  fill="#E53935"
                />
                <path
                  d="M12.0002 21.9999C14.5832 21.9999 16.9302 21.0114 18.7047 19.4039L15.6097 16.7849C14.6057 17.5454 13.3577 17.9999 12.0002 17.9999C9.39916 17.9999 7.19066 16.3414 6.35866 14.0269L3.09766 16.5394C4.75266 19.7779 8.11366 21.9999 12.0002 21.9999Z"
                  fill="#4CAF50"
                />
                <path
                  d="M21.8055 10.0415L21.7975 10H21H12V14H17.6515C17.2555 15.1185 16.536 16.083 15.608 16.7855C15.6085 16.785 15.609 16.785 15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                  fill="#1565C0"
                />
              </svg>
              Google
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  );
}
