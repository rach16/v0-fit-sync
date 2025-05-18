"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Minus, Plus } from "lucide-react"

interface ExerciseSet {
  reps: number
  weight: string
}

interface Exercise {
  id: number
  name: string
  sets: ExerciseSet[]
}

interface EditExerciseProps {
  isOpen: boolean
  onClose: () => void
  exercise: Exercise | null
  onSave: (updatedExercise: Exercise) => void
}

export function EditExercise({ isOpen, onClose, exercise, onSave }: EditExerciseProps) {
  const [editedExercise, setEditedExercise] = useState<Exercise | null>(exercise)

  // Update the local state when the exercise prop changes
  if (exercise && (!editedExercise || editedExercise.id !== exercise.id)) {
    setEditedExercise(exercise)
  }

  if (!editedExercise) return null

  const handleNameChange = (value: string) => {
    setEditedExercise({
      ...editedExercise,
      name: value,
    })
  }

  const handleSetChange = (index: number, field: keyof ExerciseSet, value: string | number) => {
    const updatedSets = [...editedExercise.sets]
    if (field === "reps") {
      updatedSets[index] = {
        ...updatedSets[index],
        reps: typeof value === "string" ? Number.parseInt(value) || 0 : value,
      }
    } else {
      updatedSets[index] = {
        ...updatedSets[index],
        weight: value.toString(),
      }
    }

    setEditedExercise({
      ...editedExercise,
      sets: updatedSets,
    })
  }

  const addSet = () => {
    setEditedExercise({
      ...editedExercise,
      sets: [...editedExercise.sets, { reps: 0, weight: "0" }],
    })
  }

  const removeSet = (index: number) => {
    const updatedSets = [...editedExercise.sets]
    updatedSets.splice(index, 1)
    setEditedExercise({
      ...editedExercise,
      sets: updatedSets,
    })
  }

  const handleSave = () => {
    onSave(editedExercise)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Exercise</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-exercise-name">Exercise Name</Label>
            <Input
              id="edit-exercise-name"
              value={editedExercise.name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Sets</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSet}
                className="text-fitness-secondary border-fitness-secondary/30 hover:bg-fitness-secondary/10"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Set
              </Button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {editedExercise.sets.map((set, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-8 text-center font-medium">{index + 1}</div>
                  <Input
                    placeholder="Reps"
                    className="flex-1"
                    type="number"
                    value={set.reps}
                    onChange={(e) => handleSetChange(index, "reps", e.target.value)}
                  />
                  <Input
                    placeholder="Weight"
                    className="flex-1"
                    value={set.weight}
                    onChange={(e) => handleSetChange(index, "weight", e.target.value)}
                  />
                  {editedExercise.sets.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSet(index)}
                      className="text-fitness-danger hover:text-fitness-danger/80 hover:bg-fitness-danger/10"
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Remove set</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-fitness-secondary hover:bg-fitness-secondary/90 text-white" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
