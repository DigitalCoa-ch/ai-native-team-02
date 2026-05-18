"use client";

import { useState, useEffect } from "react";
import { StartupCard } from "./StartupCard";

export function WatchlistPanel() {
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/startups?limit=50")
      .then((r) => r.json())
      .then((d) => setStartups(d.startups ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            My Watchlist
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Track your favorite impact startups
          </p>
        </div>
        <span className="px-3 py-1 text-sm font-medium bg-zinc-100 text-zinc-600 rounded-full dark:bg-zinc-800 dark:text-zinc-400">
          {startups.length} startups
        </span>
      </div>

      {loading ? (
        <div className="py-12 text-center text-zinc-500 dark:text-zinc-400">
          Loading...
        </div>
      ) : startups.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl">
            📋
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Your watchlist is empty
          </h3>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
            Go to Discover to find startups and add them to your watchlist.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {startups.map((s) => (
            <StartupCard key={s.id} startup={s} />
          ))}
        </div>
      )}
    </div>
  );
}