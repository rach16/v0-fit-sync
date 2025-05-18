"use client"

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react"
import { toast } from "@/hooks/use-toast"

export interface NutritionGoals {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface NutritionConsumption {
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface NutritionContextType {
  goals: NutritionGoals
  consumption: NutritionConsumption
  updateGoals: (newGoals: NutritionGoals) => void
  updateConsumption: (newConsumption: NutritionConsumption) => void
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined)

export function NutritionProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<NutritionGoals>({
    calories: 2200,
    protein: 150,
    carbs: 220,
    fat: 70,
  })

  const [consumption, setConsumption] = useState<NutritionConsumption>({
    calories: 1850,
    protein: 120,
    carbs: 180,
    fat: 60,
  })

  // Memoize the update functions to prevent unnecessary re-renders
  const updateGoals = useCallback((newGoals: NutritionGoals) => {
    setGoals(newGoals)
    toast({
      title: "Nutrition goals updated",
      description: "Your daily nutrition targets have been updated.",
      variant: "success",
    })
  }, [])

  const updateConsumption = useCallback((newConsumption: NutritionConsumption) => {
    setConsumption(newConsumption)
  }, [])

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      goals,
      consumption,
      updateGoals,
      updateConsumption,
    }),
    [goals, consumption, updateGoals, updateConsumption],
  )

  return <NutritionContext.Provider value={contextValue}>{children}</NutritionContext.Provider>
}

export function useNutrition() {
  const context = useContext(NutritionContext)
  if (context === undefined) {
    throw new Error("useNutrition must be used within a NutritionProvider")
  }
  return context
}
