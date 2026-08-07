"use client";

import { TrendingUp, Activity, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export interface TrendPoint {
  date: string;
  reportNumber: string;
  value: number;
  unit: string;
}

export function AnalyteTrendGraph({
  testName,
  unit,
  refMin,
  refMax,
  points,
}: {
  testName: string;
  unit: string;
  refMin?: number;
  refMax?: number;
  points: TrendPoint[];
}) {
  if (!points || points.length === 0) return null;

  // Filter numeric points
  const numericPoints = points.filter((p) => typeof p.value === "number" && !isNaN(p.value));
  if (numericPoints.length < 2) return null;

  const values = numericPoints.map((p) => p.value);
  const minVal = Math.min(...values, refMin ?? Math.min(...values));
  const maxVal = Math.max(...values, refMax ?? Math.max(...values));
  const range = maxVal - minVal || 1;

  const width = 360;
  const height = 120;
  const padding = 20;

  const coordinates = numericPoints.map((p, idx) => {
    const x = padding + (idx / (numericPoints.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((p.value - minVal) / range) * (height - 2 * padding);
    return { x, y, ...p };
  });

  const pathD = coordinates.reduce(
    (acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
    ""
  );

  const firstVal = values[0];
  const lastVal = values[values.length - 1];
  const delta = lastVal - firstVal;
  const percent = firstVal ? ((delta / firstVal) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl text-slate-900 dark:text-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-extrabold flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Longitudinal Trend Curve: {testName}</span>
          </h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
            Analyte changes tracked across {numericPoints.length} consecutive laboratory visits ({unit})
          </p>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs font-black">
          {delta > 0 ? (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +{delta.toFixed(1)} (+{percent}%)
            </span>
          ) : delta < 0 ? (
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5" /> {delta.toFixed(1)} ({percent}%)
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/30 flex items-center gap-1">
              <Minus className="w-3.5 h-3.5" /> Stable (0.0%)
            </span>
          )}
        </div>
      </div>

      {/* SVG Trend Graph */}
      <div className="relative w-full bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Ref Range Overlay */}
          {refMin !== undefined && refMax !== undefined && (
            <rect
              x={padding}
              y={height - padding - ((refMax - minVal) / range) * (height - 2 * padding)}
              width={width - 2 * padding}
              height={Math.max(2, ((refMax - refMin) / range) * (height - 2 * padding))}
              className="fill-teal-500/10 dark:fill-teal-400/10 stroke-teal-500/20"
              strokeDasharray="3 3"
            />
          )}

          {/* Line Path */}
          <path
            d={pathD}
            fill="none"
            className="stroke-teal-600 dark:stroke-teal-400"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {coordinates.map((pt, i) => (
            <g key={i} className="group cursor-pointer">
              <circle
                cx={pt.x}
                cy={pt.y}
                r="5"
                className="fill-teal-500 dark:fill-teal-400 stroke-white dark:stroke-slate-900"
                strokeWidth="2"
              />
              <text
                x={pt.x}
                y={pt.y - 10}
                textAnchor="middle"
                className="text-[9px] font-bold font-mono fill-slate-800 dark:fill-slate-200 opacity-90"
              >
                {pt.value} {pt.unit}
              </text>
            </g>
          ))}
        </svg>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-2 font-medium">
          <span>Baseline: {coordinates[0]?.date}</span>
          <span>Latest: {coordinates[coordinates.length - 1]?.date}</span>
        </div>
      </div>
    </div>
  );
}
