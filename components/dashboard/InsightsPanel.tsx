"use client";

import { useState } from "react";

const mockInsights = [
  {
    title: "Climate Tech Series B surge",
    description:
      "Multiple climate-focused startups are raising Series B rounds in Q2 2026, with median raises of $45M. This sector shows strong LP appetite.",
    sector: "Climate",
    confidence: 0.87,
    action: "Explore Series B climate opportunities",
  },
  {
    title: "Healthcare AI gaps in Southeast Asia",
    description:
      "AI-driven diagnostic tools for rural healthcare are underrepresented. Only 3 funded startups target this segment despite clear demand.",
    sector: "Healthcare",
    confidence: 0.72,
    action: "Map competitive landscape in SEA",
  },
  {
    title: "Infrastructure retrofit opportunity",
    description:
      "Building retrofit startups are attracting government contracts. Expect 3x funding increase by 2027 as regulations tighten.",
    sector: "Infrastructure",
    confidence: 0.79,
    action: "Monitor EU regulatory developments",
  },
  {
    title: "AgBio carbon credit platforms emerging",
    description:
      "New category combining regenerative agriculture with carbon credit marketplaces. Early stage but high impact potential.",
    sector: "Agriculture",
    confidence: 0.68,
    action: "Identify early leaders in the space",
  },
  {
    title: "EdTech pivot to workforce reskilling",
    description:
      "EdTech startups focused on K-12 are pivoting to B2B reskilling. Enterprise demand is 4x pre-pandemic levels.",
    sector: "Education",
    confidence: 0.81,
    action: "Evaluate reskilling platforms",
  },
];

export function InsightsPanel() {
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            AI-Generated Insights
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Actionable investment intelligence powered by autonomous agents
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900"
        >
          {loading ? "Analyzing..." : "Refresh Insights"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockInsights.map((insight, i) => (
          <div
            key={i}
            className="flex flex-col p-5 bg-white border border-zinc-200 rounded-xl dark:bg-zinc-950 dark:border-zinc-800"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-medium bg-zinc-100 text-zinc-600 rounded-full dark:bg-zinc-800 dark:text-zinc-400">
                  {insight.sector}
                </span>
                <span className="text-xs text-zinc-400">
                  {Math.round(insight.confidence * 100)}% confidence
                </span>
              </div>
            </div>
            <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              {insight.title}
            </h4>
            <p className="flex-1 text-sm text-zinc-600 dark:text-zinc-300 mb-4">
              {insight.description}
            </p>
            <button className="w-full px-3 py-2 text-sm font-medium text-zinc-900 border border-zinc-300 rounded-lg hover:bg-zinc-50 dark:text-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">
              {insight.action} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}