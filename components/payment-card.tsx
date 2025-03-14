"use client"

import { Card, CardContent } from "@/components/ui/card"

export function PaymentCard() {
  return (
    <Card className="overflow-hidden border-0">
      <CardContent className="relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-0">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-xl" />
        </div>
        <div className="z-10 flex h-full w-full items-center justify-center bg-slate-900/80">
          <div className="text-2xl font-bold text-white">Stripe</div>
        </div>
      </CardContent>
    </Card>
  )
}

