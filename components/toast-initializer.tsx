"use client"

import { useEffect } from "react"
import { useToast } from "@/contexts/toast-context"
import { setToastFunction } from "@/hooks/use-toast"

export function ToastInitializer() {
  const { toast } = useToast()

  useEffect(() => {
    // Set the toast function to use our context-based implementation
    setToastFunction(toast)
  }, [toast])

  return null
}
