"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useNutrition } from "@/contexts/nutrition-context"

interface MacroData {
  date: string
  protein: number
  carbs: number
  fat: number
}

interface MacronutrientChartProps {
  timeRange: string
}

export function MacronutrientChart({ timeRange }: MacronutrientChartProps) {
  const { goals } = useNutrition()
  const [data, setData] = useState<MacroData[]>([])

  useEffect(() => {
    // Generate sample data based on the selected time range
    const generateData = () => {
      const data: MacroData[] = []
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

        // Generate random macro values that are somewhat realistic
        const proteinFactor = Math.random() * 0.3 + 0.85 // Between 85% and 115% of goal
        const carbsFactor = Math.random() * 0.3 + 0.85
        const fatFactor = Math.random() * 0.3 + 0.85

        data.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          protein: Math.round(goals.protein * proteinFactor),
          carbs: Math.round(goals.carbs * carbsFactor),
          fat: Math.round(goals.fat * fatFactor),
        })
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
  }, [timeRange, goals])

  return (
    <ChartContainer
      config={{
        protein: {
          label: "Protein",
          color: "hsl(var(--fitness-secondary))",
        },
        carbs: {
          label: "Carbs",
          color: "hsl(var(--fitness-primary))",
        },
        fat: {
          label: "Fat",
          color: "hsl(var(--fitness-accent))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}g`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="protein" fill="var(--color-protein)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="carbs" fill="var(--color-carbs)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="fat" fill="var(--color-fat)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
