"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { TrendDataPoint } from "@/types/gas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TrendChartProps {
  data: TrendDataPoint[];
  title?: string;
}

export default function TrendChart({ data, title = "Price Trend (12 Weeks)" }: TrendChartProps) {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Regular",
        data: data.map((d) => d.regular),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Premium",
        data: data.map((d) => d.premium),
        borderColor: "#8B5CF6",
        backgroundColor: "rgba(139, 92, 246, 0.05)",
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: "Diesel",
        data: data.map((d) => d.diesel),
        borderColor: "#6B7280",
        backgroundColor: "rgba(107, 114, 128, 0.05)",
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { color: "#78350F", font: { size: 12 } },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx: import("chart.js").TooltipItem<"line">) =>
            `${ctx.dataset.label}: $${(ctx.parsed.y ?? 0).toFixed(3)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#92400E", font: { size: 11 } },
        grid: { color: "#FDE68A" },
      },
      y: {
        ticks: {
          color: "#92400E",
          font: { size: 11 },
          callback: (val: string | number) => `$${Number(val).toFixed(2)}`,
        },
        grid: { color: "#FDE68A" },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl border border-amber-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-amber-900 mb-4">{title}</h3>
      <div className="h-64 md:h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
