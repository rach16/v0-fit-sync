"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface VolumeData {
  date: string
  volume: number
}

interface WorkoutVolumeChartProps {
  timeRange: string
}

export function WorkoutVolumeChart({ timeRange }: WorkoutVolumeChartProps) {
  const [data, setData] = useState<VolumeData[]>([])

  useEffect(() => {
    // Generate sample data based on the selected time range
    const generateData = () => {
      const data: VolumeData[] = []
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
      let previousVolume = 10000 // Starting volume in kg

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        // Only add volume on workout days (roughly 3-4 days per week)
        const isWorkoutDay = Math.random() > 0.5

        if (isWorkoutDay) {
          // Generate a random volume with a slight upward trend over time
          const trendFactor = 1 + (days - i) / (days * 10) // Small increase over time
          const randomFactor = Math.random() * 0.1 + 0.95 // Between 95% and 105%
          const volume = Math.round(previousVolume * randomFactor * trendFactor)

          data.push({
            date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            volume,
          })

          previousVolume = volume
        } else {
          data.push({
            date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            volume: 0,
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
        volume: {
          label: "Volume (kg)",
          color: "hsl(var(--fitness-secondary))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}kg`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="volume"
            stroke="var(--color-volume)"
            fill="var(--color-volume)"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
