import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import { DeleteAction, DoneAction } from "./NoteActions";
import {
  AutoHeightTextareaBody,
  AutoHeightTextareaTitle,
} from "./AutoHeightTextarea";
import { useEffect, useState, useContext } from "react"; // CHANGED: useContext is imported directly from react
import { BrainContext } from "../helpers/BrainContext";
import { useNavigate } from "react-router-dom";
import { nothingFoundSVG } from "../assets/nothingFound";
export default function Note() {
  const { id } = useParams();
  // CHANGED: useContext is called directly
  const { notes, updateNote, deleteNote } = useContext(BrainContext);
  const navigate = useNavigate();

  // ADDED: useState hooks are called before any other hook or conditional statements
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // ADDED: The note is found inside a useEffect and state is updated accordingly
  useEffect(() => {
    const note = notes.find((note) => note.id === id);
    if (note) {
      setTitle(note.title);
      setBody(note.body);
    }
    setLoading(false);
  }, [id, notes]);

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
  // Show nothing if loading
  if (loading) {
    return;
  }
  // The app will not crash if no note is available
  if (!title && !body) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          gridRow: "1/-1",
          alignItems: "center",
        }}
      >
        <div>
          <div>{nothingFoundSVG}</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p
              className="card-body"
              style={{
                color: "#6B6B6B",
                textAlign: "center",
                marginTop: "8px",
              }}
            >
              This note does not exist
            </p>
          </div>
        </div>
      </Box>
    );
  }

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
