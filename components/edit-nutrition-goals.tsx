"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface NutritionGoals {
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface EditNutritionGoalsProps {
  isOpen: boolean
  onClose: () => void
  currentGoals: NutritionGoals
  onSave: (updatedGoals: NutritionGoals) => void
}

export function EditNutritionGoals({ isOpen, onClose, currentGoals, onSave }: EditNutritionGoalsProps) {
  const [goals, setGoals] = useState<NutritionGoals>(currentGoals)

  // Update local state when props change and dialog is opened
  useEffect(() => {
    if (isOpen) {
      setGoals(currentGoals)
    }
  }, [isOpen, currentGoals])

  const handleChange = (field: keyof NutritionGoals, value: string) => {
    setGoals({
      ...goals,
      [field]: Number.parseInt(value) || 0,
    })
  }

  const handleSave = () => {
    onSave(goals)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Nutrition Goals</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="calories-goal">Daily Calories Target</Label>
            <Input
              id="calories-goal"
              type="number"
              value={goals.calories}
              onChange={(e) => handleChange("calories", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="protein-goal">Daily Protein Target (g)</Label>
            <Input
              id="protein-goal"
              type="number"
              value={goals.protein}
              onChange={(e) => handleChange("protein", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="carbs-goal">Daily Carbs Target (g)</Label>
            <Input
              id="carbs-goal"
              type="number"
              value={goals.carbs}
              onChange={(e) => handleChange("carbs", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fat-goal">Daily Fat Target (g)</Label>
            <Input
              id="fat-goal"
              type="number"
              value={goals.fat}
              onChange={(e) => handleChange("fat", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-fitness-primary hover:bg-fitness-primary/90 text-white" onClick={handleSave}>
            Save Goals
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
