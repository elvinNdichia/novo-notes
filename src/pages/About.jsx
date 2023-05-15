import React from "react";
import { NewActions } from "../components/NewActions";
import { Box } from "@mui/system";

function About() {
  return (
    <>
      <Box style={{ height: "80px", display: "flex", alignItems: "flex-end" }}>
        <NewActions />
      </Box>
      <h1>About</h1>
      <p>
        Donec sit amet augue at enim sollicitudin porta. Praesent finibus ex
        velit, quis faucibus libero congue et. Quisque convallis eu nisl et
        congue. Vivamus eget augue quis ante malesuada ullamcorper. Sed orci
        nulla, eleifend eget dui faucibus, facilisis aliquet ante. Suspendisse
        sollicitudin nibh lacus, ut bibendum risus elementum a.
      </p>
    </>
  );
}

export default About;
