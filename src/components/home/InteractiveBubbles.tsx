import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  tx: number;
  ty: number;
}

export const InteractiveBubbles: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const colors = ['bg-blue-500', 'bg-orange-500'];

  // Initialize some random bubbles
  useEffect(() => {
    const initialBubbles: Bubble[] = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      // Create random positions using percentages to handle window resize better
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      tx: 0,
      ty: 0
    }));
    setBubbles(initialBubbles);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    
    // Get container bounds
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setBubbles(prev => prev.map(bubble => {
      // Bubble pos in pixels
      const bx = (bubble.x / 100) * rect.width;
      const by = (bubble.y / 100) * rect.height;

      const dx = bx - x;
      const dy = by - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 200) {
        // Repel effect
        const force = (200 - dist) / 200;
        return {
          ...bubble,
          tx: (dx / dist) * force * 100, // Move away max 100px
          ty: (dy / dist) * force * 100
        };
      }
      return { ...bubble, tx: 0, ty: 0 };
    }));
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Convert pixel coordinates to percentages
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    const newBubbles = Array.from({ length: 5 }).map(() => {
      // Small random offset
      const offsetX = (Math.random() - 0.5) * 5;
      const offsetY = (Math.random() - 0.5) * 5;
      
      return {
        id: Date.now() + Math.random(),
        x: percentX + offsetX,
        y: percentY + offsetY,
        size: Math.random() * 60 + 20, 
        color: colors[Math.floor(Math.random() * colors.length)],
        tx: (Math.random() - 0.5) * 150,
        ty: (Math.random() - 0.5) * 150
      };
    });

    setBubbles(prev => {
      const updated = [...prev, ...newBubbles];
      // Keep max 35 bubbles
      if (updated.length > 35) {
        return updated.slice(updated.length - 35);
      }
      return updated;
    });
  }, []);

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden" 
      onMouseMove={handleMouseMove} 
      onClick={handleClick}
    >
      {bubbles.map(bubble => (
        <motion.div
          key={bubble.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 0.25,
            x: bubble.tx,
            y: bubble.ty
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className={`absolute rounded-full blur-2xl ${bubble.color}`}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            transform: 'translate(-50%, -50%)' // center the bubble on its coordinate
          }}
        />
      ))}
    </div>
  );
};
