import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { NutritionProvider } from "@/contexts/nutrition-context"
import { ToastProvider } from "@/contexts/toast-context"
import { ToastInitializer } from "@/components/toast-initializer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FitSync - Track Rachana's Fitness Journey",
  description: "Track your workouts and nutrition in one place",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ToastProvider>
            <NutritionProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
              </div>
              <Toaster />
              <ToastInitializer />
            </NutritionProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
