import React from 'react';
import { motion } from 'framer-motion';

/**
 * SealButton — The interactive wax seal that triggers the envelope opening.
 *
 * Props:
 *   - onOpen: () => void — Callback fired when the seal is clicked
 *
 * Renders the wax seal SVG as a tappable button with:
 *   - Hover: scale up + golden glow
 *   - Tap: scale down for tactile feedback
 */

// --- ASSET IMPORT ---
// Replace this with your own SVG path if needed
import sealSvg from '../assets/envelope-seal.svg';

export default function SealButton({ onOpen }) {
  return (
    <motion.button
      onClick={onOpen}
      className="relative cursor-pointer border-none bg-transparent p-0 outline-none focus:outline-none"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Tap the seal to open your invitation"
      style={{ zIndex: 20 }}
    >
      {/* Golden glow ring behind the seal */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* The wax seal image */}
      <motion.img
        src={sealSvg}
        alt="Wax seal"
        className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 seal-hover-glow"
        draggable={false}
      />
    </motion.button>
  );
}
