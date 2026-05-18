"use client";

import { useState } from "react";
import type { Startup } from "@/types";

const IMPACT_COLORS: Record<string, string> = {
  high: "text-green-600 dark:text-green-400",
  medium: "text-amber-600 dark:text-amber-400",
  low: "text-red-600 dark:text-red-400",
};

function getScoreColor(score?: number | null) {
  if (score === null || score === undefined) return "text-zinc-400";
  if (score >= 0.7) return IMPACT_COLORS.high;
  if (score >= 0.4) return IMPACT_COLORS.medium;
  return IMPACT_COLORS.low;
}

interface StartupCardProps {
  startup: Startup;
  onAddToWatchlist?: (id: string) => void;
}

export function StartupCard({ startup, onAddToWatchlist }: StartupCardProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    onAddToWatchlist?.(startup.id);
  };

  return (
    <div className="flex flex-col p-5 bg-white border border-zinc-200 rounded-xl hover:border-zinc-300 transition-colors dark:bg-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-700">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 truncate">
            {startup.name}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {startup.sector} · {startup.industry}
          </p>
        </div>
        {startup.logoUrl ? (
          <img
            src={startup.logoUrl}
            alt={startup.name}
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 ml-3"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg flex-shrink-0 ml-3">
            🌱
          </div>
        )}
      </div>

      <p className="flex-1 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3 mb-4">
        {startup.description}
      </p>

      {startup.impactArea && startup.impactArea.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {startup.impactArea.slice(0, 4).map((area) => (
            <span
              key={area}
              className="px-2 py-0.5 text-xs font-medium bg-green-50 text-green-700 rounded-full dark:bg-green-900/30 dark:text-green-400"
            >
              {area}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Impact</p>
          <p className={`text-sm font-semibold ${getScoreColor(startup.impactScore)}`}>
            {startup.impactScore != null
              ? `${Math.round(startup.impactScore * 100)}%`
              : "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Financial</p>
          <p className={`text-sm font-semibold ${getScoreColor(startup.financialScore)}`}>
            {startup.financialScore != null
              ? `${Math.round(startup.financialScore * 100)}%`
              : "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Overall</p>
          <p className={`text-sm font-semibold ${getScoreColor(startup.overallScore)}`}>
            {startup.overallScore != null
              ? `${Math.round(startup.overallScore * 100)}%`
              : "—"}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <a
          href={`/startups/${startup.id}`}
          className="flex-1 text-center px-3 py-2 text-sm font-medium text-zinc-900 border border-zinc-300 rounded-lg hover:bg-zinc-50 dark:text-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          View Details
        </a>
        <button
          onClick={handleSave}
          disabled={saved}
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            saved
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900"
          }`}
        >
          {saved ? "✓ Saved" : "+ Watch"}
        </button>
      </div>
    </div>
  );
}