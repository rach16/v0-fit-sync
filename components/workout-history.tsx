"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { EditExercise } from "./edit-exercise"
import { toast } from "@/hooks/use-toast"

interface ExerciseSet {
  reps: number
  weight: string
}

interface Exercise {
  id: number
  name: string
  sets: ExerciseSet[]
}

interface Workout {
  id: number
  name: string
  date: string
  time: string
  duration: string
  exercises: Exercise[]
}

export function WorkoutHistory() {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: 1,
      name: "Upper Body",
      date: "Today",
      time: "7:30 AM",
      duration: "65 min",
      exercises: [
        {
          id: 1,
          name: "Bench Press",
          sets: [
            { reps: 8, weight: "80kg" },
            { reps: 8, weight: "80kg" },
            { reps: 6, weight: "85kg" },
            { reps: 6, weight: "85kg" },
          ],
        },
        {
          id: 2,
          name: "Pull-ups",
          sets: [
            { reps: 10, weight: "BW" },
            { reps: 8, weight: "BW" },
            { reps: 8, weight: "BW" },
            { reps: 6, weight: "BW" },
          ],
        },
        {
          id: 3,
          name: "Shoulder Press",
          sets: [
            { reps: 10, weight: "25kg" },
            { reps: 8, weight: "25kg" },
            { reps: 8, weight: "25kg" },
          ],
        },
        {
          id: 4,
          name: "Bicep Curls",
          sets: [
            { reps: 12, weight: "15kg" },
            { reps: 10, weight: "15kg" },
            { reps: 10, weight: "15kg" },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Lower Body",
      date: "Yesterday",
      time: "6:45 PM",
      duration: "75 min",
      exercises: [
        {
          id: 5,
          name: "Squats",
          sets: [
            { reps: 10, weight: "100kg" },
            { reps: 8, weight: "100kg" },
            { reps: 8, weight: "110kg" },
            { reps: 6, weight: "110kg" },
          ],
        },
        {
          id: 6,
          name: "Romanian Deadlift",
          sets: [
            { reps: 10, weight: "90kg" },
            { reps: 10, weight: "90kg" },
            { reps: 8, weight: "95kg" },
          ],
        },
        {
          id: 7,
          name: "Leg Press",
          sets: [
            { reps: 12, weight: "150kg" },
            { reps: 10, weight: "150kg" },
            { reps: 10, weight: "160kg" },
          ],
        },
        {
          id: 8,
          name: "Calf Raises",
          sets: [
            { reps: 15, weight: "40kg" },
            { reps: 15, weight: "40kg" },
            { reps: 12, weight: "40kg" },
            { reps: 12, weight: "40kg" },
          ],
        },
      ],
    },
  ])

  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise)
    setIsEditDialogOpen(true)
  }

  const handleSaveExercise = (updatedExercise: Exercise) => {
    const updatedWorkouts = workouts.map((workout) => {
      const updatedExercises = workout.exercises.map((exercise) =>
        exercise.id === updatedExercise.id ? updatedExercise : exercise,
      )
      return {
        ...workout,
        exercises: updatedExercises,
      }
    })

    setWorkouts(updatedWorkouts)
    toast({
      title: "Exercise updated",
      description: `${updatedExercise.name} has been updated successfully.`,
      variant: "success",
    })
  }

  const handleDeleteExercise = (exerciseId: number) => {
    const updatedWorkouts = workouts
      .map((workout) => ({
        ...workout,
        exercises: workout.exercises.filter((exercise) => exercise.id !== exerciseId),
      }))
      .filter((workout) => workout.exercises.length > 0)

    setWorkouts(updatedWorkouts)
    toast({
      title: "Exercise deleted",
      description: "The exercise has been removed from your log.",
      variant: "destructive",
    })
  }

  return (
    <>
      <Card className="gradient-card workout-card">
        <CardHeader>
          <CardTitle>Workout History</CardTitle>
          <CardDescription>Your recent training sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {workouts.map((workout) => (
              <div key={workout.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{workout.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {workout.date} • {workout.time} • {workout.duration}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className="bg-fitness-secondary/10 text-fitness-secondary border-fitness-secondary/20"
                    >
                      {workout.exercises.length} exercises
                    </Badge>
                  </div>
                </div>

                {workout.exercises.map((exercise) => (
                  <div key={exercise.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{exercise.name}</div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-fitness-primary hover:text-fitness-primary/80 hover:bg-fitness-primary/10"
                          onClick={() => handleEditExercise(exercise)}
                        >
                          <Edit className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-fitness-danger hover:text-fitness-danger/80 hover:bg-fitness-danger/10"
                          onClick={() => handleDeleteExercise(exercise.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {exercise.sets.map((set, setIndex) => (
                        <div
                          key={setIndex}
                          className="flex flex-col items-center justify-center rounded-md border p-2 text-sm bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
                        >
                          <span className="text-muted-foreground">Set {setIndex + 1}</span>
                          <span className="font-medium">{set.reps} reps</span>
                          <span>{set.weight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <EditExercise
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        exercise={editingExercise}
        onSave={handleSaveExercise}
      />
    </>
  )
}
