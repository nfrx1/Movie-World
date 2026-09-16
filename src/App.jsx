import { useState } from "react";
import { animate, motion, useScroll, useSpring } from "motion/react";
import Navbar from "./Components/Navbar/Navbar";
import Main from "./Components/Main/Main";

function App() {
  return (
    <>
      <Navbar />
      <Main />
    </>
  );
}

export default App;
