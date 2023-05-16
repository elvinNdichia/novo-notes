import React, { useEffect } from "react";
import { BrainContext } from "../helpers/BrainContext";
import { Box, CircularProgress } from "@mui/material";

export function Card({ title, body, time }) {
  return (
    <Box
      sx={{
        padding: "17px 16px 13px 12px",
        background:
          "linear-gradient(180deg, rgba(5, 189, 214, 0.86) 0%, #4C66C0 100%)",
        borderRadius: "8px",
        color: "rgba(255, 255, 255, .98)",
        cursor: "pointer",
      }}
    >
      <h2 className="card-title">{title}</h2>
      <div style={{ height: "54px", overflow: "hidden" }}>
        <p className="card-body">{getLimitedString(body)}</p>
      </div>
      <p>...</p>
      <p
        className="card-time"
        style={{ color: "rgba(255, 255, 255, .6)", marginTop: "20px" }}
      >
        {formatDate(time)}
      </p>
    </Box>
  );
}

export function CardUnselected() {
  return (
    <Box
      sx={{
        padding: "17px 16px 13px 12px",
        background: "rgba(76, 102, 192, .12)",
        //background:
        // "linear-gradient(180deg, rgba(5, 189, 214, 0.08) 0%, rgba(76, 102, 192, .24) 100%)",
        borderRadius: "8px",
        color: "rgba(0, 0, 0, .98)",
        cursor: "pointer",

        "&:active": {
          background: "rgba(76, 102, 192, .16)",
        },
      }}
    >
      <h2 className="card-title">English</h2>
      <div>
        <p className="card-body">
          The quick brown fox jumps over the lazy dog. The quick brown fox
          jumps...
        </p>
      </div>
      <p className="card-time" style={{ color: "rgba(0, 0, 0, .6)" }}>
        16:30
      </p>
    </Box>
  );
}

export function Cards() {
  const { notes, getNotes, loading, search } = React.useContext(BrainContext);

  useEffect(() => {
    getNotes();
  }, []);

  console.log("Here are the notes: ", notes);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingTop: "8px",
        }}
      >
        <CircularProgress style={{ color: "#FBC103" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
        gridGap: "1rem",
        gap: "1frem",
      }}
    >
      {notes.map((note) => {
        return (
          <Card
            key={note.id}
            title={note.title}
            time={note.time}
            body={note.body}
          />
        );
      })}
    </Box>
  );
}

// Helper functions for this
function getLimitedString(str) {
  if (str.length <= 120) {
    return str;
  } else {
    return str.substring(0, 120) + "...";
  }
}

function formatDate(timestamp) {
  const seconds = timestamp.seconds;
  const date = new Date(seconds * 1000);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
