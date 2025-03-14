"use client"

import { useState, useEffect } from "react"

interface DonateButtonProps {
  onClick: () => void
}

export function DonateButton({ onClick }: DonateButtonProps) {
  const [stars, setStars] = useState<{ top: number; left: number; size: number; delay: number; duration: number }[]>([])

  // Generate random stars
  useEffect(() => {
    const newStars = Array.from({ length: 20 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 1,
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="button-wrapper flex justify-center items-center">
      <div className="button-box relative inline-block w-full">
        <button
          onClick={onClick}
          className="glow-button w-full bg-gradient-to-r from-[#ff00ff] to-[#ff6600] border-none text-white py-4 px-8 text-xl font-bold uppercase cursor-pointer rounded-lg transition-all duration-300 ease-in-out shadow-[0_0_10px_#ff00ff,0_0_20px_#ff6600] hover:shadow-[0_0_20px_#ff00ff,0_0_40px_#ff6600] hover:scale-105"
        >
          DONAR
        </button>

        <div className="space absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-hidden">
          {stars.map((star, index) => (
            <div
              key={index}
              className="star absolute bg-white rounded-full shadow-[0_0_5px_white] animate-twinkle"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

