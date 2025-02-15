import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ThikrCardProps {
  text: string;
  count: number;
  onComplete: () => void;
}

export default function ThikrCard({ text, count, onComplete }: ThikrCardProps) {
  const [remaining, setRemaining] = useState(count);

  const handleClick = () => {
    if (remaining > 0) {
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      setRemaining(prev => prev - 1);
    }
    if (remaining === 1) {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="w-full"
    >
      <Card className="p-6 shadow-lg transform-gpu hover:translate-y-[-2px] transition-transform">
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl text-center font-arabic leading-loose">{text}</p>
          <Button
            onClick={handleClick}
            className="w-20 h-20 rounded-full text-3xl relative overflow-hidden"
            disabled={remaining === 0}
          >
            <motion.span
              key={remaining}
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="absolute"
            >
              {remaining}
            </motion.span>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
