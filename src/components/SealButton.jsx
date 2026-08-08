import React from 'react';
import { motion } from 'framer-motion';

/**
 * SealButton — The interactive wax seal that triggers the envelope opening.
 *
 * Props:
 *   - onOpen: () => void — Callback fired when the seal is clicked
 *
 * Features:
 *   - Continuous "flowy pulse" (scale 1.0 ↔ 1.1) while waiting to be tapped
 *   - Pulsing golden glow ring behind the seal
 *   - Hover: scale up + golden glow intensifies
 *   - Tap: scale down for tactile feedback
 *   - All continuous animations stop immediately when clicked (state change unmounts)
 */

// --- ASSET IMPORT ---
// Replace this with your own SVG path if needed
import sealSvg from '../assets/envelope-seal.svg';

export default function SealButton({ onOpen }) {
  return (
    <motion.button
      onClick={onOpen}
      className="relative cursor-pointer border-none bg-transparent p-0 outline-none focus:outline-none"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Tap the seal to open your invitation"
      style={{ zIndex: 20 }}
      /* ── Continuous flowy pulse ──
         Slowly breathes between scale 1.0 and 1.1 to look alive and inviting.
         Uses a smooth easeInOut for organic, non-mechanical movement. */
      animate={{
        scale: [1.0, 1.1, 1.0],
      }}
      transition={{
        scale: {
          duration: 2.0,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    >
      {/* Golden glow ring behind the seal — pulses in sync with the seal */}
      <motion.div
        className="absolute inset-[-12px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0.08) 50%, transparent 70%)',
          filter: 'blur(10px)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 2.0,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary warm glow for depth */}
      <motion.div
        className="absolute inset-[-6px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,0,0,0.15) 0%, transparent 60%)',
          filter: 'blur(6px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3, // Slight offset from primary glow for organic feel
        }}
      />

      {/* The wax seal image */}
      <motion.img
        src={sealSvg}
        alt="Wax seal"
        className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.3))',
        }}
        draggable={false}
      />
    </motion.button>
  );
}
