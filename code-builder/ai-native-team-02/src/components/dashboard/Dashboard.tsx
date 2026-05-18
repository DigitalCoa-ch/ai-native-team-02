"use client";

import { useState } from "react";
import { DiscoverPanel } from "./DiscoverPanel";
import { WatchlistPanel } from "./WatchlistPanel";
import { InsightsPanel } from "./InsightsPanel";
import { StartupCard } from "./StartupCard";

const navItems = [
  { id: "discover", label: "Discover" },
  { id: "watchlist", label: "Watchlist" },
  { id: "insights", label: "Insights" },
] as const;

type NavId = (typeof navItems)[number]["id"];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<NavId>("discover");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 hidden md:flex flex-col">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            ImpactVest AI
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Sustainability Intelligence
          </p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                  : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Demo Investor
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                demo@impactvest.ai
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 bg-white border-b border-zinc-200 dark:border-zinc-800 dark:bg-black">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 capitalize">
            {activeTab === "discover"
              ? "Discover Startups"
              : activeTab === "watchlist"
              ? "My Watchlist"
              : "AI Insights"}
          </h2>
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="px-4 py-2 text-sm font-medium text-zinc-600 border border-zinc-300 rounded-lg hover:bg-zinc-50 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            ↻ Refresh
          </button>
        </header>

        <div className="p-6">
          {activeTab === "discover" && (
            <DiscoverPanel key={refreshKey} />
          )}
          {activeTab === "watchlist" && (
            <WatchlistPanel key={refreshKey} />
          )}
          {activeTab === "insights" && (
            <InsightsPanel key={refreshKey} />
          )}
        </div>
      </main>
    </div>
  );
}