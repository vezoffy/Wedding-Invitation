import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// ============================================================================
// SVG ASSET MAP: Replace these import paths with your local particle SVGs:
//   - Leaf Maroon 1.svg
//   - Leaf Gold 2.svg
//   - Flower Maroon 3.svg
//   - Flower Gold 4.svg
// ============================================================================
import leafMaroon from '../assets/leaf-maroon.svg';
import leafGold from '../assets/leaf-gold.svg';
import flowerMaroon from '../assets/flower-maroon.svg';
import flowerGold from '../assets/flower-gold.svg';

const PARTICLE_ASSETS = [leafMaroon, leafGold, flowerMaroon, flowerGold];

// Number of concurrent particles. Optimized for fluid 60fps performance.
const PARTICLE_COUNT = 50;

/**
 * Pre-generate particle configs once so they remain stable across re-renders.
 * Each particle gets randomized starting position, speed, drift, size, etc.
 */
function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => {
    const asset = PARTICLE_ASSETS[i % PARTICLE_ASSETS.length];
    const size = 16 + Math.random() * 24;             // 16–40px
    const left = Math.random() * 100;                  // 0–100% horizontal
    const duration = 6 + Math.random() * 10;           // 6–16s fall time
    const delay = -(Math.random() * duration);         // Staggered start (already mid-fall)
    const driftX = -30 + Math.random() * 60;           // ±30px horizontal sway
    const startRotation = Math.random() * 360;         // Random initial angle
    const rotationAmount = 180 + Math.random() * 360;  // 180–540° total rotation
    const opacity = 0.25 + Math.random() * 0.35;       // 0.25–0.6 (subtle texture)

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
  // useMemo ensures particles are generated once per mount
  const particles = useMemo(() => generateParticles(PARTICLE_COUNT), []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
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
            y: ['0vh', '110vh'],                          // Fall from top to bottom of screen
            x: [0, p.driftX, 0],                          // Sway horizontal drift
            rotate: [p.startRotation, p.startRotation + p.rotationAmount], // Slow continuous rotation
            opacity: [0, p.opacity, p.opacity, 0],        // Fade in at top, fade out at bottom
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
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
