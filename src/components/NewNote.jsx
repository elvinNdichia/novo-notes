import { Box } from "@mui/system";
import { motion } from "framer-motion";
import { NewActions } from "./NewActions";

export function NewNote() {
  return (
    <>
      <Box
        sx={{
          padding: "48px 24px 16px 16px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <NewActions />
      </Box>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            overflow: "auto",
            display: "block",
            padding: "0 24px",
          }}
        >
          <Box
            className="note-title"
            sx={{
              display: "block",
              color: "#8D8888",
              border: "none",
              minHeight: "auto",
            }}
            contentEditable
          >
            Title
          </Box>
          <Box
            className="note-body"
            sx={{
              width: "100%",
              minHeight: "80pxpx",
              overflowX: "hidden",
              overflowY: "auto",
            }}
            contentEditable
          >
            Body
          </Box>
        </div>
      </Box>
    </>
  );
}
