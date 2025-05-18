"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface BodyStatsData {
  date: string
  weight: number
  bodyFat?: number
  muscleMass?: number
}

interface BodyStatsChartProps {
  timeRange: string
}

export function BodyStatsChart({ timeRange }: BodyStatsChartProps) {
  const [data, setData] = useState<BodyStatsData[]>([])

  useEffect(() => {
    // Generate sample data based on the selected time range
    const generateData = () => {
      const data: BodyStatsData[] = []
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
      let currentWeight = 80 // Starting weight in kg
      let currentBodyFat = 18 // Starting body fat percentage
      let currentMuscleMass = 35 // Starting muscle mass in kg

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        // Only record measurements every few days
        if (i % 7 === 0 || i === 0) {
          // Generate values with a slight trend (weight decreasing, muscle increasing)
          const weightTrend = 1 - (days - i) / (days * 50) // Small decrease over time
          const fatTrend = 1 - (days - i) / (days * 40) // Slightly faster decrease
          const muscleTrend = 1 + (days - i) / (days * 60) // Small increase over time

          const randomFactor = Math.random() * 0.01 + 0.995 // Tiny random fluctuation

          currentWeight = Math.round(currentWeight * weightTrend * randomFactor * 10) / 10
          currentBodyFat = Math.round(currentBodyFat * fatTrend * randomFactor * 10) / 10
          currentMuscleMass = Math.round(currentMuscleMass * muscleTrend * randomFactor * 10) / 10

          data.push({
            date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            weight: currentWeight,
            bodyFat: currentBodyFat,
            muscleMass: currentMuscleMass,
          })
        }
      }

      // For longer time ranges, show fewer data points to avoid overcrowding
      if (days > 30) {
        const sampledData = []
        const sampleRate = Math.ceil(days / 30)
        for (let i = 0; i < data.length; i += sampleRate) {
          sampledData.push(data[i])
        }
        return sampledData
      }

      return data
    }

    setData(generateData())
  }, [timeRange])

  return (
    <ChartContainer
      config={{
        weight: {
          label: "Weight (kg)",
          color: "hsl(var(--fitness-accent))",
        },
        bodyFat: {
          label: "Body Fat (%)",
          color: "hsl(var(--fitness-danger))",
        },
        muscleMass: {
          label: "Muscle Mass (kg)",
          color: "hsl(var(--fitness-secondary))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={["dataMin - 5", "dataMax + 5"]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={[0, 40]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="weight"
            stroke="var(--color-weight)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="bodyFat"
            stroke="var(--color-bodyFat)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="muscleMass"
            stroke="var(--color-muscleMass)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
