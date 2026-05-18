"use client";

import { useState } from "react";
import { StartupCard } from "./StartupCard";

const SECTORS = [
  "All Sectors",
  "Climate",
  "Healthcare",
  "Education",
  "Infrastructure",
  "Fintech",
  "Energy",
  "Agriculture",
  "Manufacturing",
  "Logistics",
];

const IMPACT_AREAS = [
  "Carbon Reduction",
  "Clean Energy",
  "Water Conservation",
  "Healthcare Access",
  "Education Equity",
  "Financial Inclusion",
  "Biodiversity",
  "Circular Economy",
];

export function DiscoverPanel() {
  const [query, setQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [selectedImpact, setSelectedImpact] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [startups, setStartups] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const handleToggleImpact = (area: string) => {
    setSelectedImpact((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("query", query);
      if (selectedSector !== "All Sectors") params.set("sector", selectedSector);

      const res = await fetch(`/api/startups?${params}`);
      const data = await res.json();
      setStartups(data.startups ?? []);
      setSearched(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search startups by name, sector, or keyword..."
          className="flex-1 px-4 py-2.5 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-2.5 text-sm font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900"
        >
          {loading ? "Searching..." : "Search"}
        </button>
        <button
          onClick={() => {
            setStartups([]);
            setSearched(false);
            setQuery("");
          }}
          className="px-4 py-2.5 text-sm text-zinc-600 border border-zinc-300 rounded-lg hover:bg-zinc-50 dark:text-zinc-400 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          Clear
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Sector
          </label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          >
            {SECTORS.map((s) => (
              <option key={s} value={s === "All Sectors" ? "" : s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Impact Areas
          </label>
          <div className="flex flex-wrap gap-2">
            {IMPACT_AREAS.map((area) => (
              <button
                key={area}
                onClick={() => handleToggleImpact(area)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                  selectedImpact.includes(area)
                    ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                    : "border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {!searched ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl">
            🔍
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Discover Impact Startups
          </h3>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
            Search for sustainability-driven startups by name, sector, or impact
            area. Our AI agents will analyze and score each opportunity.
          </p>
        </div>
      ) : startups.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl">
            📭
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            No startups found
          </h3>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Try adjusting your filters or using different keywords.
          </p>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            Found {startups.length} startup{startups.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {startups.map((s) => (
              <StartupCard key={s.id} startup={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}