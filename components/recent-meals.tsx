"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNutrition } from "@/contexts/nutrition-context"
import { useEffect, useState } from "react"

export function RecentMeals() {
  const { updateConsumption } = useNutrition()

  // Move meals to state to prevent recreation on each render
  const [meals] = useState([
    {
      id: 1,
      name: "Breakfast",
      time: "8:30 AM",
      items: [
        { name: "Oatmeal with Berries", calories: 320, protein: 12 },
        { name: "Greek Yogurt", calories: 150, protein: 15 },
        { name: "Black Coffee", calories: 5, protein: 0 },
      ],
    },
    {
      id: 2,
      name: "Lunch",
      time: "1:00 PM",
      items: [
        { name: "Grilled Chicken Salad", calories: 450, protein: 35 },
        { name: "Whole Grain Bread", calories: 120, protein: 4 },
        { name: "Apple", calories: 95, protein: 0 },
      ],
    },
    {
      id: 3,
      name: "Snack",
      time: "4:30 PM",
      items: [
        { name: "Protein Shake", calories: 180, protein: 25 },
        { name: "Banana", calories: 105, protein: 1 },
      ],
    },
  ])

  // Calculate total consumption from meals only once on component mount
  useEffect(() => {
    const totalCalories = meals.reduce(
      (sum, meal) => sum + meal.items.reduce((mealSum, item) => mealSum + item.calories, 0),
      0,
    )

    const totalProtein = meals.reduce(
      (sum, meal) => sum + meal.items.reduce((mealSum, item) => mealSum + (item.protein || 0), 0),
      0,
    )

    // Estimate carbs and fat based on typical macronutrient ratios
    const totalCarbs = 180 // This would be calculated from actual data
    const totalFat = 60 // This would be calculated from actual data

    updateConsumption({
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
    })
  }, [updateConsumption]) // Only run once on mount and when updateConsumption changes

  return (
    <Card className="gradient-card meal-card">
      <CardHeader>
        <CardTitle>Recent Meals</CardTitle>
        <CardDescription>Your logged meals for today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {meals.map((meal) => (
            <div key={meal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{meal.name}</h4>
                  <p className="text-sm text-muted-foreground">{meal.time}</p>
                </div>
                <Badge variant="outline" className="bg-fitness-accent/10 text-fitness-accent border-fitness-accent/20">
                  {meal.items.reduce((sum, item) => sum + item.calories, 0)} kcal
                </Badge>
              </div>
              <div className="space-y-1">
                {meal.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="text-muted-foreground">
                      {item.calories} kcal / {item.protein}g protein
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
