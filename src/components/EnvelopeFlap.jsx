import React from 'react';
import { motion } from 'framer-motion';

/**
 * EnvelopeFlap — The top triangular flap of the envelope.
 * Rendered as a separate layer so it can be animated independently
 * with CSS 3D transforms (rotateX) for a realistic fold-back effect.
 *
 * Props:
 *   - isOpen: boolean — Whether the flap should be in the "open" (flipped) state
 */

// --- ASSET IMPORT ---
// Replace this with your own SVG path if needed
import flapSvg from '../assets/envelope-flap.svg';

export default function EnvelopeFlap({ isOpen }) {
  return (
    <div
      className="absolute top-0 left-0 w-full perspective-800"
      style={{
        /* The flap height is ~55% of the envelope's total height
           (165 / 300 of the original viewBox) */
        height: '55%',
        zIndex: isOpen ? 5 : 15,
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'top center',
          backfaceVisibility: 'hidden',
        }}
        animate={{
          rotateX: isOpen ? 180 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 14,
          duration: 0.8,
        }}
      >
        <img
          src={flapSvg}
          alt=""
          className="w-full h-full"
          draggable={false}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}
