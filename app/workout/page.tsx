import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WorkoutLogForm } from "@/components/workout-log-form"
import { WorkoutHistory } from "@/components/workout-history"
import { Plus } from "lucide-react"

export default function WorkoutLogPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workout Log</h1>
          <p className="text-muted-foreground">Track your exercises and progress</p>
        </div>
        <Button className="bg-fitness-secondary hover:bg-fitness-secondary/90 text-white">
          <Plus className="mr-2 h-4 w-4" />
          New Workout
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <WorkoutLogForm />
        <Card className="gradient-card workout-card">
          <CardHeader>
            <CardTitle>Workout Summary</CardTitle>
            <CardDescription>Your training statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">3 workouts</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">12 workouts</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Volume</p>
                  <p className="text-2xl font-bold">24,000 kg</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Personal Records</p>
                  <p className="text-2xl font-bold">2 this month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <WorkoutHistory />
    </div>
  )
}
