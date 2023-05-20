import { useParams } from "react-router-dom";
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

export default function Note() {
  const { id } = useParams();
  const { notes, updateNote, deleteNote } = React.useContext(BrainContext);
  const navigate = useNavigate();

  const note = notes.find((note) => note.id === id);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  const onDone = () => {
    if (title === "" && body === "") {
      navigate("/");
      return;
    }
    updateNote({ id, body, title });
    navigate("/");
  };

  const onDeleteOrExit = () => {
    deleteNote(id);
    navigate("/");
  };

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
