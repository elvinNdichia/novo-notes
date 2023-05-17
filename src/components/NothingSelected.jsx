export default function NothingSelected() {
  return (
    <div
      style={{
        gridRow: "1/-1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>{svg}</p>
    </div>
  );
}

const svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="74"
    height="74"
    viewBox="0 0 74 74"
    fill="none"
  >
    <path
      d="M22.3334 0.333496V73.6668H7.66671V59.0002H0.333374V51.6668H7.66671V40.6668H0.333374V33.3335H7.66671V22.3335H0.333374V15.0002H7.66671V0.333496H22.3334ZM66.3517 0.333496C70.3924 0.333496 73.6667 3.62616 73.6667 7.63016V66.3702C73.6667 70.3998 70.3924 73.6668 66.3517 73.6668H29.6667V0.333496H66.3517Z"
      fill="#EDECEC"
    />
  </svg>
);
