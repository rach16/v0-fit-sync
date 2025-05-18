import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentWorkouts() {
  const workouts = [
    {
      id: 1,
      name: "Upper Body",
      date: "Today",
      time: "7:30 AM",
      duration: "65 min",
      exercises: [
        { name: "Bench Press", sets: 4, reps: "8, 8, 6, 6", weight: "80kg" },
        { name: "Pull-ups", sets: 4, reps: "10, 8, 8, 6", weight: "BW" },
        { name: "Shoulder Press", sets: 3, reps: "10, 8, 8", weight: "25kg" },
        { name: "Bicep Curls", sets: 3, reps: "12, 10, 10", weight: "15kg" },
      ],
    },
    {
      id: 2,
      name: "Lower Body",
      date: "Yesterday",
      time: "6:45 PM",
      duration: "75 min",
      exercises: [
        { name: "Squats", sets: 4, reps: "10, 8, 8, 6", weight: "100kg" },
        { name: "Romanian Deadlift", sets: 3, reps: "10, 10, 8", weight: "90kg" },
        { name: "Leg Press", sets: 3, reps: "12, 10, 10", weight: "150kg" },
        { name: "Calf Raises", sets: 4, reps: "15, 15, 12, 12", weight: "40kg" },
      ],
    },
  ]

  return (
    <Card className="gradient-card workout-card">
      <CardHeader>
        <CardTitle>Recent Workouts</CardTitle>
        <CardDescription>Your latest training sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {workouts.map((workout) => (
            <div key={workout.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{workout.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {workout.date} • {workout.time} • {workout.duration}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-fitness-secondary/10 text-fitness-secondary border-fitness-secondary/20"
                >
                  {workout.exercises.length} exercises
                </Badge>
              </div>
              <div className="space-y-1">
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{exercise.name}</span>
                    <span className="text-muted-foreground">
                      {exercise.sets} sets • {exercise.reps} • {exercise.weight}
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
