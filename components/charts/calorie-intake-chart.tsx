"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useNutrition } from "@/contexts/nutrition-context"

interface CalorieData {
  date: string
  calories: number
  goal: number
}

interface CalorieIntakeChartProps {
  timeRange: string
}

export function CalorieIntakeChart({ timeRange }: CalorieIntakeChartProps) {
  const { goals } = useNutrition()
  const [data, setData] = useState<CalorieData[]>([])

  useEffect(() => {
    // Generate sample data based on the selected time range
    const generateData = () => {
      const data: CalorieData[] = []
      let days = 7

      switch (timeRange) {
        case "week":
          days = 7
          break
        case "month":
          days = 30
          break
        case "quarter":
          days = 90
          break
        case "year":
          days = 365
          break
      }

      const today = new Date()
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        // Generate a random calorie value that's somewhat realistic
        // Most days should be close to the goal, with some variation
        const randomFactor = Math.random() * 0.3 + 0.85 // Between 85% and 115% of goal
        const calories = Math.round(goals.calories * randomFactor)

        data.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          calories,
          goal: goals.calories,
        })
      }

      return data
    }

    setData(generateData())
  }, [timeRange, goals.calories])

  return (
    <ChartContainer
      config={{
        calories: {
          label: "Calories",
          color: "hsl(var(--fitness-primary))",
        },
        goal: {
          label: "Goal",
          color: "hsl(var(--fitness-accent))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ReferenceLine y={goals.calories} stroke="hsl(var(--fitness-accent))" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="calories"
            stroke="var(--color-calories)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
