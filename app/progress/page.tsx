"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalorieIntakeChart } from "@/components/charts/calorie-intake-chart"
import { MacronutrientChart } from "@/components/charts/macronutrient-chart"
import { WorkoutVolumeChart } from "@/components/charts/workout-volume-chart"
import { WorkoutFrequencyChart } from "@/components/charts/workout-frequency-chart"
import { BodyStatsChart } from "@/components/charts/body-stats-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="container py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Progress Tracking</h1>
          <p className="text-muted-foreground">Visualize your nutrition and fitness journey</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
            <SelectItem value="quarter">Last 3 Months</SelectItem>
            <SelectItem value="year">Last 12 Months</SelectItem>
          </SelectContent>
        </Select>
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
          <TabsTrigger value="body" className="data-[state=active]:bg-fitness-accent data-[state=active]:text-white">
            Body Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nutrition" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="gradient-card nutrition-card">
              <CardHeader>
                <CardTitle>Daily Calorie Intake</CardTitle>
                <CardDescription>Track your calorie consumption over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <CalorieIntakeChart timeRange={timeRange} />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card nutrition-card">
              <CardHeader>
                <CardTitle>Macronutrient Distribution</CardTitle>
                <CardDescription>Track your protein, carbs, and fat intake</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <MacronutrientChart timeRange={timeRange} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workouts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="gradient-card workout-card">
              <CardHeader>
                <CardTitle>Workout Volume</CardTitle>
                <CardDescription>Track your total weight lifted over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <WorkoutVolumeChart timeRange={timeRange} />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card workout-card">
              <CardHeader>
                <CardTitle>Workout Frequency</CardTitle>
                <CardDescription>Track your workout consistency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <WorkoutFrequencyChart timeRange={timeRange} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="body" className="space-y-4">
          <Card className="gradient-card meal-card">
            <CardHeader>
              <CardTitle>Body Measurements</CardTitle>
              <CardDescription>Track changes in your body composition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BodyStatsChart timeRange={timeRange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
