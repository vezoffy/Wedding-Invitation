import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * FallingParticles — A continuous, looping particle system that renders
 * falling leaf and flower SVGs across the entire viewport.
 *
 * Particles spawn above the viewport and fall with:
 *   - Randomized horizontal positions
 *   - Randomized vertical speeds (8–18s per cycle)
 *   - Gentle horizontal drift (swaying left/right)
 *   - Continuous slow rotation
 *   - Randomized sizes and opacity
 *
 * Uses CSS `will-change: transform` and GPU-accelerated properties
 * (translate, rotate, opacity) for smooth 60fps on mobile.
 *
 * Always visible — behind both the envelope and invitation card.
 */

// --- ASSET IMPORTS ---
import leafMaroon from '../assets/leaf-maroon.svg';
import leafGold from '../assets/leaf-gold.svg';
import flowerMaroon from '../assets/flower-maroon.svg';
import flowerGold from '../assets/flower-gold.svg';

const PARTICLE_ASSETS = [leafMaroon, leafGold, flowerMaroon, flowerGold];

// Number of concurrent particles. Kept modest for mobile performance.
const PARTICLE_COUNT = 14;

/**
 * Pre-generate particle configs once so they remain stable across re-renders.
 * Each particle gets randomized starting position, speed, drift, size, etc.
 */
function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => {
    const asset = PARTICLE_ASSETS[i % PARTICLE_ASSETS.length];
    const size = 18 + Math.random() * 22;             // 18–40px
    const left = Math.random() * 100;                  // 0–100% horizontal
    const duration = 8 + Math.random() * 10;           // 8–18s fall time
    const delay = -(Math.random() * duration);         // Negative delay → staggered start (already mid-fall)
    const driftX = -30 + Math.random() * 60;           // ±30px horizontal sway
    const startRotation = Math.random() * 360;         // Random initial angle
    const rotationAmount = 180 + Math.random() * 360;  // 180–540° total rotation
    const opacity = 0.25 + Math.random() * 0.35;       // 0.25–0.6 (subtle, not distracting)

    return {
      id: i,
      asset,
      size,
      left,
      duration,
      delay,
      driftX,
      startRotation,
      rotationAmount,
      opacity,
    };
  });
}

export default function FallingParticles() {
  // useMemo ensures particles are only generated once per mount
  const particles = useMemo(() => generateParticles(PARTICLE_COUNT), []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: -50,           // Start above viewport
            width: p.size,
            height: p.size,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: ['0vh', '110vh'],                          // Fall from above to below viewport
            x: [0, p.driftX, 0],                          // Gentle sway
            rotate: [p.startRotation, p.startRotation + p.rotationAmount], // Continuous rotation
            opacity: [0, p.opacity, p.opacity, 0],        // Fade in at top, fade out at bottom
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
            times: undefined, // opacity uses even keyframe distribution
          }}
        >
          <img
            src={p.asset}
            alt=""
            className="w-full h-full"
            draggable={false}
          />
        </motion.div>
      ))}
    </div>
  );
}
