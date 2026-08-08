import React from 'react';
import { motion } from 'framer-motion';

/**
 * InvitationCard — The final revealed invitation card.
 * Features corner decorations, Ganesh motif, and a content placeholder area.
 *
 * Fades in with a slight upward drift when the envelope finishes its exit.
 */

// --- ASSET IMPORTS ---
// Replace these with your own SVG paths if needed
import cornerSvg from '../assets/corner.svg';
import ganeshSvg from '../assets/ganesh.svg';

export default function InvitationCard() {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #FDFBF7 0%, #F4EFE6 50%, #FDFBF7 100%)',
        zIndex: 30,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* === Corner Decorations === */}
      {/* Top-Left */}
      <img
        src={cornerSvg}
        alt=""
        aria-hidden="true"
        className="absolute top-3 left-3 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 opacity-80"
        draggable={false}
      />
      {/* Top-Right (mirrored horizontally) */}
      <img
        src={cornerSvg}
        alt=""
        aria-hidden="true"
        className="absolute top-3 right-3 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 opacity-80"
        style={{ transform: 'scaleX(-1)' }}
        draggable={false}
      />
      {/* Bottom-Left (mirrored vertically) */}
      <img
        src={cornerSvg}
        alt=""
        aria-hidden="true"
        className="absolute bottom-3 left-3 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 opacity-80"
        style={{ transform: 'scaleY(-1)' }}
        draggable={false}
      />
      {/* Bottom-Right (mirrored both axes) */}
      <img
        src={cornerSvg}
        alt=""
        aria-hidden="true"
        className="absolute bottom-3 right-3 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 opacity-80"
        style={{ transform: 'scale(-1, -1)' }}
        draggable={false}
      />

      {/* === Card Content Area === */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-2xl px-6 py-12 sm:py-16 text-center">
        {/* Ganesh Motif */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className="mb-4 sm:mb-6"
        >
          <img
            src={ganeshSvg}
            alt="Shri Ganesh"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto"
            draggable={false}
          />
        </motion.div>

        {/* Shri Ganeshaya Namah text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-sm sm:text-base tracking-widest uppercase mb-6 sm:mb-8"
          style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-maroon)',
            letterSpacing: '0.2em',
          }}
        >
          || Shri Ganeshaya Namah ||
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
          className="w-32 sm:w-48 h-[2px] shimmer-border mb-6 sm:mb-8 rounded-full"
        />

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4"
          style={{
            fontFamily: 'var(--font-script)',
            color: 'var(--color-maroon)',
          }}
        >
          You are Cordially Invited
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
          className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10"
          style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-maroon)',
            opacity: 0.8,
          }}
        >
          to the wedding celebration of
        </motion.p>

        {/* ============================================
            PLACEHOLDER: Replace with the couple's names
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8, ease: 'easeOut' }}
          className="mb-6 sm:mb-8"
        >
          <p
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
            style={{
              fontFamily: 'var(--font-script)',
              color: 'var(--color-maroon)',
            }}
          >
            Bride
          </p>
          <p
            className="text-lg sm:text-xl my-2 sm:my-3"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-gold)',
              fontStyle: 'italic',
            }}
          >
            &amp;
          </p>
          <p
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
            style={{
              fontFamily: 'var(--font-script)',
              color: 'var(--color-maroon)',
            }}
          >
            Groom
          </p>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.3, duration: 0.6, ease: 'easeOut' }}
          className="w-24 sm:w-36 h-[2px] shimmer-border mb-6 sm:mb-8 rounded-full"
        />

        {/* ============================================
            PLACEHOLDER: Replace with date & venue
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
          className="space-y-2"
        >
          <p
            className="text-base sm:text-lg md:text-xl tracking-wide"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-maroon)',
              letterSpacing: '0.1em',
            }}
          >
            Saturday, the Fifteenth of November
          </p>
          <p
            className="text-base sm:text-lg md:text-xl tracking-wide"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-maroon)',
              letterSpacing: '0.1em',
            }}
          >
            Two Thousand and Twenty-Six
          </p>
          <p
            className="text-sm sm:text-base mt-3 sm:mt-4"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-gold)',
              fontStyle: 'italic',
            }}
          >
            at a Venue of Your Dreams
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
