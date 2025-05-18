"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { EditFoodItem } from "./edit-food-item"
import { toast } from "@/hooks/use-toast"

interface FoodItem {
  id: number
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface Meal {
  id: number
  name: string
  time: string
  items: FoodItem[]
}

export function FoodLogHistory() {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: 1,
      name: "Breakfast",
      time: "8:30 AM",
      items: [
        { id: 1, name: "Oatmeal with Berries", calories: 320, protein: 12, carbs: 58, fat: 6 },
        { id: 2, name: "Greek Yogurt", calories: 150, protein: 15, carbs: 8, fat: 5 },
        { id: 3, name: "Black Coffee", calories: 5, protein: 0, carbs: 1, fat: 0 },
      ],
    },
    {
      id: 2,
      name: "Lunch",
      time: "1:00 PM",
      items: [
        { id: 4, name: "Grilled Chicken Salad", calories: 450, protein: 35, carbs: 25, fat: 22 },
        { id: 5, name: "Whole Grain Bread", calories: 120, protein: 4, carbs: 22, fat: 2 },
        { id: 6, name: "Apple", calories: 95, protein: 0, carbs: 25, fat: 0 },
      ],
    },
    {
      id: 3,
      name: "Snack",
      time: "4:30 PM",
      items: [
        { id: 7, name: "Protein Shake", calories: 180, protein: 25, carbs: 9, fat: 3 },
        { id: 8, name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0 },
      ],
    },
  ])

  const [editingFoodItem, setEditingFoodItem] = useState<FoodItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleEditFoodItem = (item: FoodItem) => {
    setEditingFoodItem(item)
    setIsEditDialogOpen(true)
  }

  const handleSaveFoodItem = (updatedItem: FoodItem) => {
    const updatedMeals = meals.map((meal) => {
      const updatedItems = meal.items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      return {
        ...meal,
        items: updatedItems,
      }
    })

    setMeals(updatedMeals)
    toast({
      title: "Food item updated",
      description: `${updatedItem.name} has been updated successfully.`,
      variant: "success",
    })
  }

  const handleDeleteFoodItem = (itemId: number) => {
    const updatedMeals = meals
      .map((meal) => ({
        ...meal,
        items: meal.items.filter((item) => item.id !== itemId),
      }))
      .filter((meal) => meal.items.length > 0)

    setMeals(updatedMeals)
    toast({
      title: "Food item deleted",
      description: "The food item has been removed from your log.",
      variant: "destructive",
    })
  }

  return (
    <>
      <Card className="gradient-card meal-card">
        <CardHeader>
          <CardTitle>Today's Food Log</CardTitle>
          <CardDescription>All meals and food items logged today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {meals.map((meal) => (
              <div key={meal.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{meal.name}</h4>
                    <p className="text-sm text-muted-foreground">{meal.time}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-fitness-accent/10 text-fitness-accent border-fitness-accent/20"
                  >
                    {meal.items.reduce((sum, item) => sum + item.calories, 0)} kcal
                  </Badge>
                </div>

                <div className="rounded-md border">
                  <div className="grid grid-cols-[1fr_80px_80px_80px_80px_80px] text-sm">
                    <div className="border-b p-2 font-medium">Food</div>
                    <div className="border-b p-2 font-medium text-center">Calories</div>
                    <div className="border-b p-2 font-medium text-center">Protein</div>
                    <div className="border-b p-2 font-medium text-center">Carbs</div>
                    <div className="border-b p-2 font-medium text-center">Fat</div>
                    <div className="border-b p-2 font-medium text-center">Actions</div>

                    {meal.items.map((item) => (
                      <React.Fragment key={item.id}>
                        <div className="border-b p-2">{item.name}</div>
                        <div className="border-b p-2 text-center">{item.calories}</div>
                        <div className="border-b p-2 text-center">{item.protein}g</div>
                        <div className="border-b p-2 text-center">{item.carbs}g</div>
                        <div className="border-b p-2 text-center">{item.fat}g</div>
                        <div className="border-b p-2 text-center">
                          <div className="flex justify-center space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-fitness-primary hover:text-fitness-primary/80 hover:bg-fitness-primary/10"
                              onClick={() => handleEditFoodItem(item)}
                            >
                              <Edit className="h-3.5 w-3.5" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-fitness-danger hover:text-fitness-danger/80 hover:bg-fitness-danger/10"
                              onClick={() => handleDeleteFoodItem(item.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <EditFoodItem
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        foodItem={editingFoodItem}
        onSave={handleSaveFoodItem}
      />
    </>
  )
}
