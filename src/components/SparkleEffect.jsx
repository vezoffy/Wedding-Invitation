import React from 'react';
import { motion } from 'framer-motion';

/**
 * SparkleEffect — A confetti/sparkle burst that scales up and rotates
 * from the center of the envelope when it opens.
 *
 * Props:
 *   - isActive: boolean — Whether the sparkle animation should play
 */

// --- ASSET IMPORT ---
// Replace this with your own SVG path if needed
import sparkleSvg from '../assets/sparkle-envelope.svg';

export default function SparkleEffect({ isActive }) {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 25 }}
      initial={{ scale: 0, opacity: 0, rotate: 0 }}
      animate={{
        scale: [0, 1.5, 1.5],
        opacity: [0, 1, 0],
        rotate: [0, 15, 15],
      }}
      transition={{
        duration: 1.2,
        times: [0, 0.5, 1],
        ease: 'easeOut',
      }}
    >
      <img
        src={sparkleSvg}
        alt=""
        className="w-full h-full max-w-[350px] max-h-[350px] sm:max-w-[450px] sm:max-h-[450px]"
        draggable={false}
        aria-hidden="true"
      />
    </motion.div>
  );
}
