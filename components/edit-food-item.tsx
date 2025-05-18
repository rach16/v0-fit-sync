"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FoodItem {
  id: number
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface EditFoodItemProps {
  isOpen: boolean
  onClose: () => void
  foodItem: FoodItem | null
  onSave: (updatedItem: FoodItem) => void
}

export function EditFoodItem({ isOpen, onClose, foodItem, onSave }: EditFoodItemProps) {
  const [editedItem, setEditedItem] = useState<FoodItem | null>(foodItem)

  // Update the local state when the foodItem prop changes
  if (foodItem && (!editedItem || editedItem.id !== foodItem.id)) {
    setEditedItem(foodItem)
  }

  if (!editedItem) return null

  const handleChange = (field: keyof FoodItem, value: string | number) => {
    setEditedItem({
      ...editedItem,
      [field]: typeof value === "string" && field !== "name" ? Number.parseFloat(value) || 0 : value,
    })
  }

  const handleSave = () => {
    onSave(editedItem)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Food Item</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-food-name">Food Name</Label>
            <Input id="edit-food-name" value={editedItem.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-calories">Calories</Label>
              <Input
                id="edit-calories"
                type="number"
                value={editedItem.calories}
                onChange={(e) => handleChange("calories", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-protein">Protein (g)</Label>
              <Input
                id="edit-protein"
                type="number"
                value={editedItem.protein}
                onChange={(e) => handleChange("protein", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-carbs">Carbs (g)</Label>
              <Input
                id="edit-carbs"
                type="number"
                value={editedItem.carbs}
                onChange={(e) => handleChange("carbs", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-fat">Fat (g)</Label>
              <Input
                id="edit-fat"
                type="number"
                value={editedItem.fat}
                onChange={(e) => handleChange("fat", e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-fitness-accent hover:bg-fitness-accent/90 text-white" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
