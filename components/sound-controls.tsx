"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SoundControlsProps {
  onVolumeChange: (volume: number) => void
  onMuteToggle: (muted: boolean) => void
}

export function SoundControls({ onVolumeChange, onMuteToggle }: SoundControlsProps) {
  const [volume, setVolume] = useState(0.5)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    // Initialize with stored preferences if available
    const storedVolume = localStorage.getItem("donationVolume")
    const storedMuted = localStorage.getItem("donationMuted")

    if (storedVolume) {
      setVolume(Number.parseFloat(storedVolume))
    }

    if (storedMuted) {
      setMuted(storedMuted === "true")
    }
  }, [])

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    localStorage.setItem("donationVolume", newVolume.toString())
    onVolumeChange(newVolume)
  }

  const toggleMute = () => {
    const newMuted = !muted
    setMuted(newMuted)
    localStorage.setItem("donationMuted", newMuted.toString())
    onMuteToggle(newMuted)
  }

  const testSound = () => {
    if (!muted) {
      try {
        // Use a reliable test sound
        const testAudio = new Audio("https://www.soundjay.com/buttons/sounds/button-14.mp3")
        testAudio.volume = volume

        testAudio.addEventListener("error", (e) => {
          console.error("Error playing test sound:", e)

          // Try fallback sound if first one fails
          const fallbackAudio = new Audio("https://www.soundjay.com/buttons/sounds/button-1.mp3")
          fallbackAudio.volume = volume
          fallbackAudio.play().catch((err) => {
            console.error("Fallback sound also failed:", err)
          })
        })

        testAudio.play().catch((err) => {
          console.error("Failed to play test sound:", err)
        })
      } catch (error) {
        console.error("Error in testSound:", error)
      }
    }
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg">
      <Button variant="ghost" size="icon" onClick={toggleMute} className="text-slate-400 hover:text-white">
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </Button>
      <Slider value={[volume]} min={0} max={1} step={0.01} onValueChange={handleVolumeChange} className="w-24" />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={testSound} className="text-slate-400 hover:text-white">
              <Play className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Probar sonido</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

