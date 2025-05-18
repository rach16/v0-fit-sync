"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface FrequencyData {
  day: string
  workouts: number
}

interface WorkoutFrequencyChartProps {
  timeRange: string
}

export function WorkoutFrequencyChart({ timeRange }: WorkoutFrequencyChartProps) {
  const [data, setData] = useState<FrequencyData[]>([])

  useEffect(() => {
    // Generate sample data based on the selected time range
    const generateData = () => {
      if (timeRange === "week") {
        // For week view, show workouts by day of week
        return [
          { day: "Mon", workouts: 1 },
          { day: "Tue", workouts: 0 },
          { day: "Wed", workouts: 1 },
          { day: "Thu", workouts: 0 },
          { day: "Fri", workouts: 1 },
          { day: "Sat", workouts: 0 },
          { day: "Sun", workouts: 0 },
        ]
      } else {
        // For other time ranges, show workouts per week
        const data: FrequencyData[] = []
        let weeks = 4

        switch (timeRange) {
          case "month":
            weeks = 4
            break
          case "quarter":
            weeks = 12
            break
          case "year":
            weeks = 52
            break
        }

        for (let i = 0; i < weeks; i++) {
          // Generate a random number of workouts per week (between 3 and 5)
          const workouts = Math.floor(Math.random() * 3) + 3

          data.push({
            day: `Week ${i + 1}`,
            workouts,
          })
        }

        return data
      }
    }

    setData(generateData())
  }, [timeRange])

  return (
    <ChartContainer
      config={{
        workouts: {
          label: "Workouts",
          color: "hsl(var(--fitness-secondary))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={[0, "dataMax + 1"]}
            allowDecimals={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="workouts" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.workouts > 0 ? "var(--color-workouts)" : "rgba(0, 0, 0, 0.1)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
