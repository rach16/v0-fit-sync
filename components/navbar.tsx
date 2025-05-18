"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dumbbell, Home, UtensilsCrossed, LineChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      name: "Food Log",
      href: "/food",
      icon: UtensilsCrossed,
    },
    {
      name: "Workout Log",
      href: "/workout",
      icon: Dumbbell,
    },
    {
      name: "Progress",
      href: "/progress",
      icon: LineChart,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-fitness-primary to-fitness-secondary text-white dark:from-fitness-primary/80 dark:to-fitness-secondary/80 backdrop-blur supports-[backdrop-filter]:bg-opacity-80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Dumbbell className="h-6 w-6" />
          <span className="text-xl font-bold">FitSync</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-white",
                  isActive ? "text-white" : "text-white/70",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button size="sm" className="hidden md:flex bg-fitness-accent hover:bg-fitness-accent/90 text-white">
            Profile
          </Button>
        </div>
      </div>

      <div className="md:hidden border-t border-white/10">
        <nav className="flex justify-between">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center py-2 text-xs font-medium transition-colors hover:text-white",
                  isActive ? "text-white" : "text-white/70",
                )}
              >
                <item.icon className="h-5 w-5 mb-1" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
