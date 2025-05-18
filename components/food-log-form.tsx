"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FoodLogForm() {
  const [mealType, setMealType] = useState("")

  const mealTypes = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
    { value: "snack", label: "Snack" },
  ]

  return (
    <Card className="gradient-card">
      <CardHeader>
        <CardTitle>Log Food</CardTitle>
        <CardDescription>Add a new food item to your daily log</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="meal-type">Meal Type</Label>
          <Select value={mealType} onValueChange={setMealType}>
            <SelectTrigger id="meal-type">
              <SelectValue placeholder="Select meal type" />
            </SelectTrigger>
            <SelectContent>
              {mealTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="food-name">Food Name</Label>
          <Input id="food-name" placeholder="e.g., Grilled Chicken Breast" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="serving-size">Serving Size</Label>
            <Input id="serving-size" placeholder="e.g., 100" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serving-unit">Unit</Label>
            <Select defaultValue="g">
              <SelectTrigger id="serving-unit">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="g">grams (g)</SelectItem>
                <SelectItem value="oz">ounces (oz)</SelectItem>
                <SelectItem value="ml">milliliters (ml)</SelectItem>
                <SelectItem value="cup">cup</SelectItem>
                <SelectItem value="tbsp">tablespoon</SelectItem>
                <SelectItem value="tsp">teaspoon</SelectItem>
                <SelectItem value="serving">serving</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="calories">Calories</Label>
            <Input id="calories" type="number" placeholder="e.g., 165" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="protein">Protein (g)</Label>
            <Input id="protein" type="number" placeholder="e.g., 31" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="carbs">Carbs (g)</Label>
            <Input id="carbs" type="number" placeholder="e.g., 0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fat">Fat (g)</Label>
            <Input id="fat" type="number" placeholder="e.g., 3.6" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-fitness-accent hover:bg-fitness-accent/90 text-white">Add Food</Button>
      </CardFooter>
    </Card>
  )
}
