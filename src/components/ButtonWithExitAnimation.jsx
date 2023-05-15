import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ButtonWithExitAnimation = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleClick = () => {
    setIsButtonVisible(false);
  };

  return (
    <AnimatePresence>
      {isButtonVisible && (
        <motion.button
          initial={{ y: -32 }}
          animate={{ y: 0 }}
          exit={{ y: -32 }}
          transition={{ duration: 0.3 }}
          onClick={handleClick}
          className="routing-animated"
        >
          Click to remove
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ButtonWithExitAnimation;
