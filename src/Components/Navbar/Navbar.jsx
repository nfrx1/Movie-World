import React from "react";
import { motion } from "motion/react";
import NavbarStart from "./NavbarStart";
import NavbarEnd from "./NavbarEnd";

const Navbar = () => {
  return (
    <nav
      className="navbar bg-base-100 border-b border-base-200 shadow-sm px-4 sm:px-6 md:px-8 py-3 flex-wrap gap-y-2"
    >
      <NavbarStart />
      <NavbarEnd />
    </nav>
  );
};

export default Navbar;