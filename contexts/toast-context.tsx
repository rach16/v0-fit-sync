"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type ToastVariant = "default" | "destructive" | "success"

interface Toast {
  id: string
  title: string
  description: string
  variant?: ToastVariant
}

interface ToastContextType {
  toasts: Toast[]
  toast: (props: { title: string; description: string; variant?: ToastVariant }) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const toast = useCallback(
    ({ title, description, variant = "default" }: { title: string; description: string; variant?: ToastVariant }) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast = { id, title, description, variant }
      setToasts((prev) => [...prev, newToast])

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        dismissToast(id)
      }, 5000)
    },
    [dismissToast],
  )

  return <ToastContext.Provider value={{ toasts, toast, dismissToast }}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
