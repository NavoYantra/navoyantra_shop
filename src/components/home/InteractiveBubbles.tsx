import React, { useState, useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const colors = ['bg-blue-500', 'bg-orange-500'];

  // Initialize some random bubbles
  useEffect(() => {
    const initialBubbles: Bubble[] = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i,
      // Create random positions using percentages to handle window resize better
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      tx: 0,
      ty: 0
    }));
    setBubbles(initialBubbles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      
      const rect = containerRef.current.getBoundingClientRect();
      // Check if mouse is near or inside the hero section
      if (clientY > rect.bottom + 100 || clientY < rect.top - 100) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      setBubbles(prev => prev.map(bubble => {
        const bx = (bubble.x / 100) * rect.width;
        const by = (bubble.y / 100) * rect.height;

        const dx = bx - x;
        const dy = by - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 250) {
          const force = (250 - dist) / 250;
          return {
            ...bubble,
            tx: (dx / dist) * force * 120, 
            ty: (dy / dist) * force * 120
          };
        }
        // Slowly return to original pos
        return { ...bubble, tx: bubble.tx * 0.9, ty: bubble.ty * 0.9 };
      }));

      // Occasionally spawn a bubble on mouse move to increase density locally
      if (Math.random() < 0.1) {
        setBubbles(prev => {
          if (prev.length > 100) return prev; // cap density
          
          const newBubble = {
            id: Date.now() + Math.random(),
            x: (x / rect.width) * 100 + (Math.random() - 0.5) * 5,
            y: (y / rect.height) * 100 + (Math.random() - 0.5) * 5,
            size: Math.random() * 15 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            tx: (Math.random() - 0.5) * 50,
            ty: (Math.random() - 0.5) * 50
          };
          return [...prev, newBubble];
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      
      const rect = containerRef.current.getBoundingClientRect();
      // Only spawn if clicked inside hero section
      if (clientY > rect.bottom || clientY < rect.top) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      const newBubbles = Array.from({ length: 5 }).map(() => {
        const offsetX = (Math.random() - 0.5) * 8;
        const offsetY = (Math.random() - 0.5) * 8;
        
        return {
          id: Date.now() + Math.random(),
          x: percentX + offsetX,
          y: percentY + offsetY,
          size: Math.random() * 15 + 5, 
          color: colors[Math.floor(Math.random() * colors.length)],
          tx: (Math.random() - 0.5) * 200,
          ty: (Math.random() - 0.5) * 200
        };
      });

      setBubbles(prev => {
        const updated = [...prev, ...newBubbles];
        if (updated.length > 80) {
          return updated.slice(updated.length - 80);
        }
        return updated;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none" 
    >
      {bubbles.map(bubble => {
        // Generate random drift values for the free movement animation
        const driftX = (Math.random() - 0.5) * 100;
        const driftY = (Math.random() - 0.5) * 100;
        const duration = Math.random() * 10 + 10;

        return (
          <motion.div
            key={bubble.id}
            className="absolute"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
            }}
            animate={{
              x: [0, driftX, 0],
              y: [0, driftY, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 0.4,
                x: bubble.tx,
                y: bubble.ty
              }}
              transition={{ type: "spring", mass: 2, stiffness: 30, damping: 30 }}
              className={`rounded-full ${bubble.color} mix-blend-screen`}
              style={{
                width: bubble.size,
                height: bubble.size,
                transform: 'translate(-50%, -50%)' // center the bubble on its coordinate
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
