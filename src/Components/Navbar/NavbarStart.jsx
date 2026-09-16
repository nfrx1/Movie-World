import React from "react";
import { motion } from "motion/react";

const NavbarStart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring" }}
      className="navbar-start"
    >
      <a
        href="/"
        className="flex items-center gap-2 text-sm md:text-2xl font-black tracking-wide text-primary hover:opacity-80 transition-opacity">
        <svg
          className="h-5 w-5 md:h-7 md:w-7 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="4" r="1" fill="currentColor" />
          <circle cx="12" cy="20" r="1" fill="currentColor" />
          <circle cx="4" cy="12" r="1" fill="currentColor" />
          <circle cx="20" cy="12" r="1" fill="currentColor" />
        </svg>
        <span className="truncate">Movie World</span>
      </a>
    </motion.div>
  );
};

export default NavbarStart;