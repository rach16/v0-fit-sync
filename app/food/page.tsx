"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FoodLogForm } from "@/components/food-log-form"
import { FoodLogHistory } from "@/components/food-log-history"
import { Plus, Settings } from "lucide-react"
import { useNutrition } from "@/contexts/nutrition-context"
import { useState } from "react"
import { EditNutritionGoals } from "@/components/edit-nutrition-goals"

export default function FoodLogPage() {
  const { goals, consumption, updateGoals } = useNutrition()
  const [isEditGoalsOpen, setIsEditGoalsOpen] = useState(false)

  return (
    <div className="container py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Food Log</h1>
          <p className="text-muted-foreground">Track your daily nutrition intake</p>
        </div>
        <Button className="bg-fitness-accent hover:bg-fitness-accent/90 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Meal
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FoodLogForm />
        <Card className="gradient-card nutrition-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Daily Summary</CardTitle>
              <CardDescription>Your nutrition totals for today</CardDescription>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Calories</p>
                  <p className="text-2xl font-bold">
                    {consumption.calories} / {goals.calories}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Protein</p>
                  <p className="text-2xl font-bold">
                    {consumption.protein}g / {goals.protein}g
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Carbs</p>
                  <p className="text-2xl font-bold">
                    {consumption.carbs}g / {goals.carbs}g
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Fat</p>
                  <p className="text-2xl font-bold">
                    {consumption.fat}g / {goals.fat}g
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <FoodLogHistory />

      <EditNutritionGoals
        isOpen={isEditGoalsOpen}
        onClose={() => setIsEditGoalsOpen(false)}
        currentGoals={goals}
        onSave={updateGoals}
      />
    </div>
  )
}
