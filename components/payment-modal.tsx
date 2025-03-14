"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { PaymentCard } from "@/components/payment-card"

interface PaymentModalProps {
  showRechargeOptions: boolean
  setShowRechargeOptions: (show: boolean) => void
}

export function PaymentModal({ showRechargeOptions, setShowRechargeOptions }: PaymentModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const packages = ["100", "150", "250", "500", "1,500", "5,000", "20,000", "100,000"]

  return (
    <Dialog open={showRechargeOptions} onOpenChange={setShowRechargeOptions}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Métodos de pago</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <PaymentCard />

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {packages.map((amount) => (
              <Button
                key={amount}
                variant={selectedPackage === amount ? "default" : "outline"}
                className={selectedPackage === amount ? "bg-primary text-primary-foreground" : ""}
                onClick={() => setSelectedPackage(amount)}
              >
                ${amount}
              </Button>
            ))}
          </div>

          <Button disabled={!selectedPackage} className="w-full">
            Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

