'use client';
import React, { useEffect, useState, type ReactNode, Children } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const slotBase = [
  'w-full max-w-[85%] border border-transparent',
  'z-20 w-full max-w-[90%] border border-transparent',
  'z-40 w-full max-w-[95%] border',
  'z-20 w-full max-w-[90%] border border-transparent',
  'w-full max-w-[85%] border border-transparent',
];

interface MotionCardsProps {
  children: ReactNode;
  interval?: number;
}

export function MotionCardContent({
  children,
  className = '',
  ...props
}: {
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export default function MotionCards({
  children,
  interval = 2000,
}: MotionCardsProps) {
  const contentArray = Children.toArray(children);
  const [cards, setCards] = useState([0, 1, 2, 3, 4]);
  const [nextId, setNextId] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCards((prev) => {
        const rest = prev.slice(1);
        const newCard = nextId;
        setNextId((id) => id + 1);
        return [...rest, newCard];
      });
    }, interval);
    return () => clearInterval(intervalId);
  }, [nextId, interval]);

  return (
    <div className='flex items-center justify-center relative px-2 h-[400px] sm:h-[480px] md:h-[600px] overflow-hidden w-full'>
      <div className='flex flex-col space-y-2 relative z-10 items-center w-full justify-center h-full max-w-md mx-auto'>
        <AnimatePresence initial={false} mode='popLayout'>
          {cards.map((cardId, i) => {
            const isMiddle = i === 2;
            const currentItem =
              contentArray[cardId % contentArray.length] ||
              `Item ${cardId + 1}`;
            return (
              <motion.div
                key={cardId}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: i === 2 ? 1 : 0.6, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.8,
                  ease: 'easeInOut',
                  layout: { duration: 0.8 },
                }}
                className={`flex items-center rounded-2xl px-3 py-4 relative overflow-hidden ${slotBase[i]}`}
                style={{
                  backdropFilter: 'blur(10px)',
                }}
              >
                <motion.div
                  className='absolute inset-0 rounded-2xl -z-10'
                  initial={false}
                  animate={{
                    backgroundColor: isMiddle ? 'rgba(0, 212, 170, 0.1)' : 'rgba(13, 33, 55, 0.8)', // primary/10 vs card/80
                    borderColor: isMiddle ? '#00D4AA' : 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '1px',
                    boxShadow: isMiddle ? '0 0 30px rgba(0, 212, 170, 0.15)' : 'none',
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                  }}
                />
                <div
                  className={`w-full text-sm font-semibold relative ${isMiddle ? 'text-white' : 'text-gray-400'
                    }`}
                >
                  {currentItem}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
