import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SealButton from './SealButton';
import EnvelopeFlap from './EnvelopeFlap';
import SparkleEffect from './SparkleEffect';
import InvitationCard from './InvitationCard';
import FallingParticles from './FallingParticles';

// ============================================================================
// SVG ASSET MAP: Replace these import paths with your local SVG files
// ============================================================================
import envelopeBodySvg from '../assets/envelope-closed.svg';
import grandBorderSvg from '../assets/Detailed-Grand-Border.svg';

/**
 * EnvelopeLanding — Main orchestrator component for the wedding invitation landing page.
 *
 * Scaled & proportioned so all elements (Grand Border, Envelope, Particles, & Card)
 * fit comfortably inside the viewport across mobile and desktop devices.
 */

/* ─── Animation Timing Constants ─── */
const TIMING = {
  SEAL_FADE_MS: 300,            // How long the seal takes to fade out
  FLAP_OPEN_DELAY_MS: 200,      // Delay before flap starts opening
  SPARKLE_DELAY_MS: 400,        // Delay before sparkle burst fires
  ENVELOPE_EXIT_DELAY_MS: 1400, // When envelope starts sliding off
  CARD_REVEAL_DELAY_MS: 1800,   // When invitation card begins fading in
};

export default function EnvelopeLanding() {
  const [state, setState] = useState('sealed');
  // "sealed" | "opening" | "transitioning" | "revealed"

  /**
   * Triggered when the user taps the wax seal.
   * Stops seal pulse immediately and kicks off the multi-step opening sequence.
   */
  const handleOpen = useCallback(() => {
    if (state !== 'sealed') return;

    // 1. Trigger opening state (seal fades, 3D flap flips 180°, sparkle bursts)
    setState('opening');

    // 2. Slide envelope down off-screen
    setTimeout(() => {
      setState('transitioning');
    }, TIMING.ENVELOPE_EXIT_DELAY_MS);

    // 3. Reveal the main invitation card
    setTimeout(() => {
      setState('revealed');
    }, TIMING.CARD_REVEAL_DELAY_MS);
  }, [state]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* ═══════════════════════════════════════════
          LAYER 0: Base Background Gradient
          ═══════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #FDFBF7 0%, #F4EFE6 50%, #FDFBF7 100%)',
        }}
      />

      {/* ═══════════════════════════════════════════
          LAYER 1: Detailed Grand Border (Always On)
          Mapped SVG: Detailed-Grand-Border.svg
          Scaled with inset padding so it neatly frames the screen.
          ═══════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        <img
          src={grandBorderSvg}
          alt="Detailed Grand Frame Border"
          className="w-full h-full object-fill opacity-90"
          draggable={false}
        />
      </div>

      {/* ═══════════════════════════════════════════
          LAYER 2: Continuous Falling Particles (Always On)
          Renders above grand border but behind envelope (zIndex: 2).
          ═══════════════════════════════════════════ */}
      <FallingParticles />

      {/* ═══════════════════════════════════════════
          LAYER 10: Envelope Assembly (States: sealed, opening, transitioning)
          Scaled to fit easily within the grand border framing.
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {state !== 'revealed' && (
          <motion.div
            key="envelope-assembly"
            className="absolute inset-0 flex flex-col items-center justify-center p-4"
            style={{ zIndex: 10 }}
            // Exit transition: smooth slide down off bottom of screen
            exit={{
              y: '120vh',
              opacity: 0,
              transition: {
                duration: 0.75,
                ease: [0.55, 0, 1, 0.45],
              },
            }}
          >
            {/* — Scaled Envelope Container — */}
            <div
              className="relative"
              style={{
                width: 'min(72vw, 320px)',
                height: 'min(54vw, 240px)',
              }}
            >
              {/* Envelope Body (Mapped SVG: Envelope Closed.svg) */}
              <img
                src={envelopeBodySvg}
                alt="Closed Invitation Envelope"
                className="absolute inset-0 w-full h-full"
                draggable={false}
              />

              {/* Envelope Top Flap (Separate SVG layer for 3D rotateX transform) */}
              <EnvelopeFlap isOpen={state === 'opening' || state === 'transitioning'} />

              {/* Sparkle / Confetti Burst (Mapped SVG: Sparkle Envelope.svg) */}
              <SparkleEffect isActive={state === 'opening' || state === 'transitioning'} />

              {/* Maroon Wax Seal (Mapped SVG: Envelope Seal.svg) */}
              <AnimatePresence>
                {state === 'sealed' && (
                  <motion.div
                    key="seal"
                    className="absolute flex items-center justify-center"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 20,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    }}
                  >
                    <SealButton onOpen={handleOpen} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* — Instructional Text — */}
            <AnimatePresence>
              {state === 'sealed' && (
                <motion.p
                  key="instruction-text"
                  className="mt-6 sm:mt-8 text-center animate-gentle-pulse select-none"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-maroon)',
                    fontSize: 'clamp(0.8rem, 2.2vw, 1.0rem)',
                    letterSpacing: '0.08em',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: { duration: 0.3 },
                  }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Tap the seal to open your invitation
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          LAYER 30: Revealed Invitation Card
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {state === 'revealed' && (
          <InvitationCard key="invitation-card" />
        )}
      </AnimatePresence>
    </div>
  );
}
