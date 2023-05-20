import { Box } from "@mui/system";
import { motion } from "framer-motion";
import { DeleteAction, DoneAction } from "./NoteActions";
import {
  AutoHeightTextareaBody,
  AutoHeightTextareaTitle,
} from "./AutoHeightTextarea";
import { useState } from "react";
import { BrainContext } from "../helpers/BrainContext";
import React from "react";
import { useNavigate } from "react-router-dom";

export function NewNote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { submitNote } = React.useContext(BrainContext);

  const onDone = () => {
    if (title === "" && body === "") {
      navigate("/");
    }
    const newNoteTitle = title === "" ? "Untitled Note" : title;
    submitNote({ body, title: newNoteTitle });
    navigate("/");
  };

  const onDeleteOrExit = () => {};

  return (
    <>
      <Box
        sx={{
          padding: "48px 24px 16px 16px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <DeleteAction onDeleteOrExit={onDeleteOrExit} />
          <DoneAction onDone={onDone} />
        </div>
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
          <AutoHeightTextareaTitle title={title} setTitle={setTitle} />
          <AutoHeightTextareaBody body={body} setBody={setBody} />
        </div>
      </Box>
    </>
  );
}
