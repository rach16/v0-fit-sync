"use client"

import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast"
import { useToast } from "@/contexts/toast-context"

export function Toaster() {
  const { toasts, dismissToast } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4 md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast key={toast.id} variant={toast.variant}>
          <div className="flex flex-col gap-1">
            <ToastTitle>{toast.title}</ToastTitle>
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </div>
          <ToastClose onClick={() => dismissToast(toast.id)} />
        </Toast>
      ))}
    </div>
  )
}
