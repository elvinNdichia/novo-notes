import { Box } from "@mui/material";

export function Card() {
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
      <h2 className="card-title">English</h2>
      <p className="card-body">
        The quick brown fox jumps over the lazy dog. The quick brown fox
        jumps...
      </p>
      <p className="card-time" style={{ color: "rgba(255, 255, 255, .6)" }}>
        16:30
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
      <p className="card-body">
        The quick brown fox jumps over the lazy dog. The quick brown fox
        jumps...
      </p>
      <p className="card-time" style={{ color: "rgba(0, 0, 0, .6)" }}>
        16:30
      </p>
    </Box>
  );
}

export function Cards() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "1rem",
        gap: "1frem",
      }}
    >
      <Card />
      <CardUnselected />
      <CardUnselected />
      <CardUnselected />
      <CardUnselected />
      <CardUnselected />
      <CardUnselected />
      <CardUnselected />
      <CardUnselected />
    </Box>
  );
}
