"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useNutrition } from "@/contexts/nutrition-context"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { useState, useMemo } from "react"
import { EditNutritionGoals } from "./edit-nutrition-goals"

export function NutritionSummary() {
  const { goals, consumption, updateGoals } = useNutrition()
  const [isEditGoalsOpen, setIsEditGoalsOpen] = useState(false)

  // Memoize nutrients array to prevent recreation on each render
  const nutrients = useMemo(
    () => [
      { name: "Calories", current: consumption.calories, target: goals.calories, unit: "kcal" },
      { name: "Protein", current: consumption.protein, target: goals.protein, unit: "g" },
      { name: "Carbs", current: consumption.carbs, target: goals.carbs, unit: "g" },
      { name: "Fat", current: consumption.fat, target: goals.fat, unit: "g" },
    ],
    [consumption, goals],
  )

  return (
    <>
      <Card className="gradient-card nutrition-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Nutrition Summary</CardTitle>
            <CardDescription>Your daily nutrition breakdown</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-fitness-primary border-fitness-primary/30 hover:bg-fitness-primary/10"
            onClick={() => setIsEditGoalsOpen(true)}
          >
            <Settings className="h-4 w-4 mr-1" />
            Edit Goals
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nutrients.map((nutrient, index) => {
              const percentage = Math.round((nutrient.current / nutrient.target) * 100)
              return (
                <div key={nutrient.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{nutrient.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {nutrient.current}
                      {nutrient.unit} / {nutrient.target}
                      {nutrient.unit}
                    </div>
                  </div>
                  <Progress
                    value={percentage}
                    className={`h-2 ${
                      index === 0
                        ? "bg-fitness-primary/20"
                        : index === 1
                          ? "bg-fitness-secondary/20"
                          : index === 2
                            ? "bg-fitness-accent/20"
                            : "bg-fitness-danger/20"
                    }`}
                    indicatorClassName={
                      index === 0
                        ? "progress-primary"
                        : index === 1
                          ? "progress-secondary"
                          : index === 2
                            ? "progress-accent"
                            : "progress-danger"
                    }
                  />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <EditNutritionGoals
        isOpen={isEditGoalsOpen}
        onClose={() => setIsEditGoalsOpen(false)}
        currentGoals={goals}
        onSave={updateGoals}
      />
    </>
  )
}
