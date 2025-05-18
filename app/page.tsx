"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentWorkouts } from "@/components/recent-workouts"
import { RecentMeals } from "@/components/recent-meals"
import { NutritionSummary } from "@/components/nutrition-summary"
import { WorkoutSummary } from "@/components/workout-summary"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { EditNutritionGoals } from "@/components/edit-nutrition-goals"
import { useNutrition } from "@/contexts/nutrition-context"

export default function Dashboard() {
  const { goals, consumption, updateGoals } = useNutrition()
  const [isEditGoalsOpen, setIsEditGoalsOpen] = useState(false)

  // Calculate remaining values once
  const caloriesRemaining = useMemo(() => goals.calories - consumption.calories, [goals.calories, consumption.calories])
  const proteinRemaining = useMemo(() => goals.protein - consumption.protein, [goals.protein, consumption.protein])

  return (
    <div className="container py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Track your fitness journey and nutrition in one place.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="gradient-card nutrition-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories Today</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-fitness-primary hover:text-fitness-primary/80 hover:bg-fitness-primary/10"
              onClick={() => setIsEditGoalsOpen(true)}
            >
              <Settings className="h-4 w-4" />
              <span className="sr-only">Edit Goals</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {consumption.calories} / {goals.calories}
            </div>
            <p className="text-xs text-muted-foreground">{caloriesRemaining} calories remaining</p>
          </CardContent>
        </Card>
        <Card className="gradient-card nutrition-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protein</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {consumption.protein}g / {goals.protein}g
            </div>
            <p className="text-xs text-muted-foreground">{proteinRemaining}g remaining</p>
          </CardContent>
        </Card>
        <Card className="gradient-card workout-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workouts This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 / 5</div>
            <p className="text-xs text-muted-foreground">2 workouts remaining</p>
          </CardContent>
        </Card>
        <Card className="gradient-card workout-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="nutrition" className="space-y-4">
        <TabsList className="bg-muted/50 dark:bg-muted/20">
          <TabsTrigger
            value="nutrition"
            className="data-[state=active]:bg-fitness-primary data-[state=active]:text-white"
          >
            Nutrition
          </TabsTrigger>
          <TabsTrigger
            value="workouts"
            className="data-[state=active]:bg-fitness-secondary data-[state=active]:text-white"
          >
            Workouts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="nutrition" className="space-y-4">
          <NutritionSummary />
          <RecentMeals />
        </TabsContent>
        <TabsContent value="workouts" className="space-y-4">
          <WorkoutSummary />
          <RecentWorkouts />
        </TabsContent>
      </Tabs>

      <EditNutritionGoals
        isOpen={isEditGoalsOpen}
        onClose={() => setIsEditGoalsOpen(false)}
        currentGoals={goals}
        onSave={updateGoals}
      />
    </div>
  )
}
