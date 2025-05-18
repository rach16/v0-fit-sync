"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Minus, Plus } from "lucide-react"

export function WorkoutLogForm() {
  const [workoutType, setWorkoutType] = useState("")
  const [sets, setSets] = useState([{ reps: "", weight: "" }])

  const workoutTypes = [
    { value: "upper", label: "Upper Body" },
    { value: "lower", label: "Lower Body" },
    { value: "push", label: "Push" },
    { value: "pull", label: "Pull" },
    { value: "legs", label: "Legs" },
    { value: "cardio", label: "Cardio" },
    { value: "full", label: "Full Body" },
    { value: "custom", label: "Custom" },
  ]

  const addSet = () => {
    setSets([...sets, { reps: "", weight: "" }])
  }

  const removeSet = (index: number) => {
    const newSets = [...sets]
    newSets.splice(index, 1)
    setSets(newSets)
  }

  return (
    <Card className="gradient-card">
      <CardHeader>
        <CardTitle>Log Workout</CardTitle>
        <CardDescription>Record your exercise sets and reps</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="workout-type">Workout Type</Label>
          <Select value={workoutType} onValueChange={setWorkoutType}>
            <SelectTrigger id="workout-type">
              <SelectValue placeholder="Select workout type" />
            </SelectTrigger>
            <SelectContent>
              {workoutTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="exercise-name">Exercise Name</Label>
          <Input id="exercise-name" placeholder="e.g., Bench Press" />
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

          <div className="space-y-2">
            {sets.map((set, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-8 text-center font-medium">{index + 1}</div>
                <Input
                  placeholder="Reps"
                  className="flex-1"
                  value={set.reps}
                  onChange={(e) => {
                    const newSets = [...sets]
                    newSets[index].reps = e.target.value
                    setSets(newSets)
                  }}
                />
                <Input
                  placeholder="Weight"
                  className="flex-1"
                  value={set.weight}
                  onChange={(e) => {
                    const newSets = [...sets]
                    newSets[index].weight = e.target.value
                    setSets(newSets)
                  }}
                />
                <Select defaultValue="kg">
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lb">lb</SelectItem>
                    <SelectItem value="bw">BW</SelectItem>
                  </SelectContent>
                </Select>
                {sets.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeSet(index)}>
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Remove set</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Input id="notes" placeholder="Any additional notes about this exercise" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-fitness-secondary hover:bg-fitness-secondary/90 text-white">Add Exercise</Button>
      </CardFooter>
    </Card>
  )
}
