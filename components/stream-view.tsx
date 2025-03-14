"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Send,
  Gift,
  DollarSign,
  MessageSquare,
  Plus,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Star,
  Award,
  Crown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PaymentModal } from "@/components/payment-modal"
import { DonateButton } from "@/components/donate-button"
import { SoundControls } from "@/components/sound-controls"
import { playDonationSound, playGiftSound } from "@/components/sound-manager"
import StreamerProfile from "@/components/streamer-profile"

interface StreamViewProps {
  streamer: any
  onBack: () => void
}

export default function StreamView({ streamer, onBack }: StreamViewProps) {
  const [balance, setBalance] = useState(500)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [showRechargeOptions, setShowRechargeOptions] = useState(false)
  const [showGifts, setShowGifts] = useState(false)
  const [customDonation, setCustomDonation] = useState("")
  const [showDonations, setShowDonations] = useState(false)
  const [soundVolume, setSoundVolume] = useState(0.5)
  const [soundsMuted, setSoundsMuted] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          text: newMessage,
          user: "Usuario",
          time: new Date(),
          type: "message",
        },
      ])
      setNewMessage("")
    }
  }

  const handleDonation = (amount: number) => {
    if (amount <= balance) {
      setBalance((prev) => prev - amount)

      // Play sound based on donation amount
      playDonationSound(amount, soundVolume, soundsMuted)

      setMessages([
        ...messages,
        {
          text: `ha donado $${amount}`,
          user: "Usuario",
          time: new Date(),
          type: "donation",
          amount,
        },
      ])
    }
  }

  const handleCustomDonation = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number.parseFloat(customDonation)
    if (amount && amount <= balance) {
      handleDonation(amount)
      setCustomDonation("")
    }
  }

  const handleGiftPurchase = (gift: any) => {
    if (balance >= gift.cost) {
      setBalance((prev) => prev - gift.cost)

      // Play gift sound with specific gift ID
      playGiftSound(gift.id, soundVolume, soundsMuted)

      setMessages([
        ...messages,
        {
          text: `ha enviado un ${gift.name} ${gift.icon}`,
          user: "Usuario",
          time: new Date(),
          type: "gift",
          gift,
        },
      ])
    }
  }

  // Function to determine donation tier and styling
  const getDonationStyle = (amount: number) => {
    if (amount >= 100) {
      return {
        containerClass: "legendary-donation",
        icon: <Crown className="h-5 w-5 text-amber-400" />,
        label: "LEGENDARIO",
        bgColor: "bg-gradient-to-r from-amber-500/30 to-yellow-500/30",
      }
    } else if (amount >= 50) {
      return {
        containerClass: "epic-donation",
        icon: <Award className="h-5 w-5 text-purple-400" />,
        label: "ÉPICO",
        bgColor: "bg-gradient-to-r from-purple-600/30 to-indigo-600/30",
      }
    } else if (amount >= 20) {
      return {
        containerClass: "rare-donation",
        icon: <Star className="h-5 w-5 text-blue-400" />,
        label: "RARO",
        bgColor: "bg-gradient-to-r from-blue-600/30 to-indigo-600/30",
      }
    } else {
      return {
        containerClass: "common-donation",
        icon: <DollarSign className="h-4 w-4 text-emerald-500" />,
        label: "",
        bgColor: "bg-gradient-to-r from-emerald-600/30 to-green-600/30",
      }
    }
  }

  const gifts = [
    { id: 1, name: "Super Star", cost: 50, icon: "⭐", color: "text-yellow-400" },
    { id: 2, name: "Heart", cost: 20, icon: "❤️", color: "text-rose-500" },
    { id: 3, name: "Trophy", cost: 100, icon: "🏆", color: "text-purple-400" },
    { id: 4, name: "Crown", cost: 200, icon: "👑", color: "text-amber-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900 shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-slate-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              {streamer.name}
            </h1>
            <span className="text-sm px-2 py-1 bg-slate-800 rounded-full text-slate-300">
              {streamer.viewers.toLocaleString()} viewers
            </span>
          </div>
          <div className="flex items-center gap-3">
            <SoundControls
              onVolumeChange={(volume) => setSoundVolume(volume)}
              onMuteToggle={(muted) => setSoundsMuted(muted)}
            />
            <Button
              onClick={() => setShowRechargeOptions(!showRechargeOptions)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <DollarSign className="h-4 w-4 text-emerald-500" />
              <span className="font-bold text-emerald-500">${balance}</span>
              <Plus className="h-4 w-4 text-emerald-500" />
            </Button>
            <PaymentModal showRechargeOptions={showRechargeOptions} setShowRechargeOptions={setShowRechargeOptions} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3 space-y-6">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="w-full aspect-[16/9] bg-slate-800 flex items-center justify-center text-slate-400">
                <p>Transmisión en vivo</p>
              </div>
            </Card>

            {/* Streamer Profile */}
            <StreamerProfile streamer={streamer} />

            <Card>
              <CardHeader className="p-4">
                <Button
                  onClick={() => setShowGifts(!showGifts)}
                  variant="ghost"
                  className="w-full flex items-center justify-between p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-purple-500" />
                    <span className="font-semibold">Regalos</span>
                  </div>
                  {showGifts ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </Button>
              </CardHeader>
              {showGifts && (
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {gifts.map((gift) => (
                      <Button
                        key={gift.id}
                        onClick={() => handleGiftPurchase(gift)}
                        variant="outline"
                        className="flex flex-col items-center gap-1 h-auto py-3"
                        disabled={balance < gift.cost}
                      >
                        <span className="text-2xl">{gift.icon}</span>
                        <span className={`text-sm font-medium ${gift.color}`}>${gift.cost}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader className="p-4">
                <DonateButton onClick={() => setShowDonations(!showDonations)} />
              </CardHeader>
              {showDonations && (
                <CardContent className="p-4 pt-0 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[5, 10, 20].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleDonation(amount)}
                        className="relative overflow-hidden py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none"
                        disabled={balance < amount}
                      >
                        <span className="relative z-10">Donar ${amount}</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-pink-600/0 via-white/30 to-purple-600/0 opacity-0 hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-full group-hover:translate-x-0"></span>
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[50, 100, 200].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleDonation(amount)}
                        className={`relative overflow-hidden py-3 px-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none ${
                          amount === 50
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                            : amount === 100
                              ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
                              : "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400"
                        }`}
                        disabled={balance < amount}
                      >
                        <span className="relative z-10">Donar ${amount}</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-full group-hover:translate-x-0"></span>
                      </button>
                    ))}
                  </div>
                  <form onSubmit={handleCustomDonation} className="flex gap-3 mt-4">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <DollarSign className="h-5 w-5" />
                      </span>
                      <input
                        type="number"
                        value={customDonation}
                        onChange={(e) => setCustomDonation(e.target.value)}
                        placeholder="Monto personalizado"
                        className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                    >
                      <span>Donar</span>
                    </button>
                  </form>
                </CardContent>
              )}
            </Card>
          </div>

          <div className="lg:w-1/3">
            <Card className="h-[500px] flex flex-col">
              <CardHeader className="p-4 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  Chat en vivo
                </CardTitle>
              </CardHeader>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3" ref={chatRef}>
                  {messages.map((msg, idx) => {
                    if (msg.type === "donation") {
                      const donationStyle = getDonationStyle(msg.amount)
                      const timeBackground =
                        msg.amount >= 100
                          ? "bg-amber-900/30"
                          : msg.amount >= 50
                            ? "bg-purple-900/30"
                            : msg.amount >= 20
                              ? "bg-blue-900/30"
                              : "bg-emerald-900/30"

                      return (
                        <div
                          key={idx}
                          className={`rounded-lg p-3 ${donationStyle.containerClass} ${donationStyle.bgColor}`}
                        >
                          <div className="flex items-center gap-2">
                            {donationStyle.icon}
                            <span className="font-bold text-blue-400">{msg.user}</span>
                            <span className="text-white">ha donado</span>
                            <span className="font-bold text-lg px-2 py-0.5 rounded bg-black/30 text-white">
                              ${msg.amount}
                            </span>
                            {donationStyle.label && (
                              <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded bg-black/30">
                                {donationStyle.label}
                              </span>
                            )}
                          </div>
                          <span
                            className={`inline-block text-xs mt-1 px-2 py-0.5 rounded ${timeBackground} text-slate-300`}
                          >
                            {msg.time.toLocaleTimeString()}
                          </span>
                        </div>
                      )
                    } else if (msg.type === "gift") {
                      return (
                        <div
                          key={idx}
                          className="gift-message rounded-lg p-3 bg-gradient-to-r from-purple-950/30 to-fuchsia-900/30 border border-purple-800/20"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{msg.gift.icon}</span>
                            <span className="font-bold text-blue-400">{msg.user}</span>
                            <span className="text-white">{msg.text}</span>
                          </div>
                          <span className="inline-block text-xs mt-1 px-2 py-0.5 rounded bg-purple-900/30 text-slate-300">
                            {msg.time.toLocaleTimeString()}
                          </span>
                        </div>
                      )
                    } else {
                      return (
                        <div key={idx} className="rounded-lg p-3 bg-slate-800/50">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-blue-400">{msg.user}</span>
                            <span className="text-white">{msg.text}</span>
                          </div>
                          <span className="inline-block text-xs mt-1 px-2 py-0.5 rounded bg-slate-700/50 text-slate-400">
                            {msg.time.toLocaleTimeString()}
                          </span>
                        </div>
                      )
                    }
                  })}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

