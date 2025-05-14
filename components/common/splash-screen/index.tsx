import { motion } from "framer-motion";
import React from "react";
// import { Logo } from "../logo";

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[1400] grid place-content-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* <Logo /> */}
        <p>ERP System</p>
      </motion.div>
    </div>
  );
}
