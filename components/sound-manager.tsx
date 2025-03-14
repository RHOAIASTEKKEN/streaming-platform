"use client"

interface SoundManagerProps {
  volume: number
  muted: boolean
}

// Simple audio player with fallbacks and error handling
const playAudio = (url: string, volume: number, muted: boolean) => {
  if (muted) return Promise.resolve()

  // Try multiple fallback sounds if one fails
  const fallbackUrls = [
    url,
    "https://www.soundjay.com/buttons/sounds/button-1.mp3", // Fallback 1
    "https://www.soundjay.com/buttons/sounds/button-2.mp3", // Fallback 2
    "https://www.soundjay.com/buttons/sounds/button-3.mp3", // Fallback 3
  ]

  return new Promise<void>((resolve) => {
    const tryPlaySound = (index = 0) => {
      if (index >= fallbackUrls.length) {
        console.warn("All audio fallbacks failed")
        return resolve()
      }

      const audio = new Audio(fallbackUrls[index])
      audio.volume = volume

      const onError = () => {
        console.warn(`Audio source failed: ${fallbackUrls[index]}, trying fallback`)
        audio.removeEventListener("error", onError)
        audio.removeEventListener("ended", onEnded)
        tryPlaySound(index + 1)
      }

      const onEnded = () => {
        audio.removeEventListener("error", onError)
        audio.removeEventListener("ended", onEnded)
        resolve()
      }

      audio.addEventListener("error", onError)
      audio.addEventListener("ended", onEnded)

      audio.play().catch(() => {
        onError()
      })
    }

    tryPlaySound()
  })
}

export function SoundManager({ volume, muted }: SoundManagerProps) {
  // This component doesn't need to preload sounds anymore
  return null
}

// Export functions to play sounds with error handling and fallbacks
export const playDonationSound = (amount: number, volume: number, muted: boolean) => {
  if (muted) return

  // Reliable sound URLs from SoundJay (free for commercial use)
  const donationSoundMap: Record<number, string> = {
    5: "https://www.soundjay.com/buttons/sounds/button-09a.mp3",
    10: "https://www.soundjay.com/buttons/sounds/button-10.mp3",
    20: "https://www.soundjay.com/buttons/sounds/button-14.mp3",
    50: "https://www.soundjay.com/buttons/sounds/button-19.mp3",
    100: "https://www.soundjay.com/buttons/sounds/button-21.mp3",
    200: "https://www.soundjay.com/buttons/sounds/button-27.mp3",
  }

  // Get the URL for the exact amount or find the closest tier
  let soundUrl: string

  if (amount >= 200) {
    soundUrl = donationSoundMap[200]
  } else if (amount >= 100) {
    soundUrl = donationSoundMap[100]
  } else if (amount >= 50) {
    soundUrl = donationSoundMap[50]
  } else if (amount >= 20) {
    soundUrl = donationSoundMap[20]
  } else if (amount >= 10) {
    soundUrl = donationSoundMap[10]
  } else {
    soundUrl = donationSoundMap[5]
  }

  playAudio(soundUrl, volume, muted)
}

export const playGiftSound = (giftId: number, volume: number, muted: boolean) => {
  if (muted) return

  // Reliable sound URLs from SoundJay (free for commercial use)
  const giftSoundMap: Record<number, string> = {
    1: "https://www.soundjay.com/buttons/sounds/button-42.mp3", // Super Star
    2: "https://www.soundjay.com/buttons/sounds/button-32.mp3", // Heart
    3: "https://www.soundjay.com/buttons/sounds/button-37.mp3", // Trophy
    4: "https://www.soundjay.com/buttons/sounds/button-43.mp3", // Crown - Elegant sound
  }

  const soundUrl = giftSoundMap[giftId]

  if (soundUrl) {
    playAudio(soundUrl, volume, muted)
  }
}

