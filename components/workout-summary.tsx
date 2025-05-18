import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function WorkoutSummary() {
  const workoutStats = [
    { name: "Weekly Workouts", current: 3, target: 5 },
    { name: "Monthly Volume", current: 24000, target: 30000, unit: "kg" },
    { name: "Personal Records", current: 2, target: 3, period: "this month" },
  ]

  return (
    <Card className="gradient-card workout-card">
      <CardHeader>
        <CardTitle>Workout Summary</CardTitle>
        <CardDescription>Your workout progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workoutStats.map((stat, index) => {
            const percentage = Math.round((stat.current / stat.target) * 100)
            return (
              <div key={stat.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{stat.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.current}
                    {stat.unit || ""} / {stat.target}
                    {stat.unit || ""} {stat.period ? `(${stat.period})` : ""}
                  </div>
                </div>
                <Progress
                  value={percentage}
                  className={`h-2 ${index === 0 ? "bg-fitness-secondary/20" : index === 1 ? "bg-fitness-primary/20" : "bg-fitness-accent/20"}`}
                  indicatorClassName={
                    index === 0 ? "progress-secondary" : index === 1 ? "progress-primary" : "progress-accent"
                  }
                />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
