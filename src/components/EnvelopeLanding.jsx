import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SealButton from './SealButton';
import EnvelopeFlap from './EnvelopeFlap';
import SparkleEffect from './SparkleEffect';
import InvitationCard from './InvitationCard';
import FallingParticles from './FallingParticles';

// --- ASSET IMPORT ---
// Replace this with your own SVG path if needed
import envelopeBodySvg from '../assets/envelope-closed.svg';

/**
 * EnvelopeLanding — The main orchestrator for the 4-state animation sequence.
 *
 * States:
 *   "sealed"        → Envelope + seal visible, pulsing instruction text
 *   "opening"       → Seal fades, flap flips open (3D), sparkle burst fires
 *   "transitioning" → Envelope slides down off screen
 *   "revealed"      → Invitation card fades in
 *
 * The FallingParticles component runs continuously across ALL states,
 * providing an always-on atmospheric background of falling leaves and flowers.
 */

/* ─── Animation Timing Constants ─── */
const TIMING = {
  SEAL_FADE_MS: 300,         // How long the seal takes to fade out
  FLAP_OPEN_DELAY_MS: 200,   // Delay before flap starts opening
  SPARKLE_DELAY_MS: 400,     // Delay before sparkle burst fires
  ENVELOPE_EXIT_DELAY_MS: 1400, // When envelope starts sliding off
  CARD_REVEAL_DELAY_MS: 1800,   // When invitation card begins fading in
};

export default function EnvelopeLanding() {
  const [state, setState] = useState('sealed');
  // "sealed" | "opening" | "transitioning" | "revealed"

  /**
   * Triggered when the user taps the wax seal.
   * Kicks off the chain of timed state transitions.
   */
  const handleOpen = useCallback(() => {
    if (state !== 'sealed') return;

    // 1. Start the opening animation
    setState('opening');

    // 2. After sparkle + flap finish, slide envelope away
    setTimeout(() => {
      setState('transitioning');
    }, TIMING.ENVELOPE_EXIT_DELAY_MS);

    // 3. After envelope exits, reveal the card
    setTimeout(() => {
      setState('revealed');
    }, TIMING.CARD_REVEAL_DELAY_MS);
  }, [state]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* ═══════════════════════════════════════════
          Background — Soft cream gradient
          ═══════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #FDFBF7 0%, #F4EFE6 50%, #FDFBF7 100%)',
        }}
      />

      {/* ═══════════════════════════════════════════
          Continuous Falling Particles (Always On)
          Renders behind all foreground elements (z-index: 1).
          Shows leaves and flowers drifting down continuously.
          ═══════════════════════════════════════════ */}
      <FallingParticles />

      {/* ═══════════════════════════════════════════
          Envelope Assembly (States: sealed, opening, transitioning)
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {state !== 'revealed' && (
          <motion.div
            key="envelope-assembly"
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ zIndex: 10 }}
            // Exit animation: slide down off screen
            exit={{
              y: '120vh',
              opacity: 0,
              transition: {
                duration: 0.7,
                ease: [0.55, 0, 1, 0.45],
              },
            }}
          >
            {/* — Envelope Container — */}
            <div
              className="relative"
              style={{
                width: 'min(80vw, 400px)',
                height: 'min(60vw, 300px)',
              }}
            >
              {/* Envelope Body (without top flap) */}
              <img
                src={envelopeBodySvg}
                alt="Invitation envelope"
                className="absolute inset-0 w-full h-full"
                draggable={false}
              />

              {/* Envelope Top Flap (separate layer for 3D animation) */}
              <EnvelopeFlap isOpen={state === 'opening' || state === 'transitioning'} />

              {/* Sparkle / Confetti Burst */}
              <SparkleEffect isActive={state === 'opening' || state === 'transitioning'} />

              {/* Wax Seal (centered on envelope) */}
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

            {/* — Instruction Text — */}
            <AnimatePresence>
              {state === 'sealed' && (
                <motion.p
                  key="instruction-text"
                  className="mt-8 sm:mt-10 text-center animate-gentle-pulse select-none"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-maroon)',
                    fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
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
          Invitation Card (State: revealed)
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {state === 'revealed' && (
          <InvitationCard key="invitation-card" />
        )}
      </AnimatePresence>
    </div>
  );
}
