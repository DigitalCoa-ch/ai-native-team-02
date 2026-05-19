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
    <div>
      {/* Search bar */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search startups by name, sector, or keyword..."
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            fontSize: "0.8125rem",
            color: "#000000",
            backgroundColor: "#ffffff",
            border: "1px solid #d4d4d4",
            outline: "none",
            transition: "border-color 0.15s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#000000")}
          onBlur={(e) => (e.target.style.borderColor = "#d4d4d4")}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "0.8125rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: "#ffffff",
            backgroundColor: "#000000",
            border: "1px solid #000000",
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.5 : 1,
            transition: "background-color 0.15s ease",
          }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
        <button
          onClick={() => {
            setStartups([]);
            setSearched(false);
            setQuery("");
          }}
          style={{
            padding: "0.75rem 1rem",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "#767676",
            backgroundColor: "#ffffff",
            border: "1px solid #d4d4d4",
            cursor: "pointer",
            transition: "border-color 0.15s ease",
          }}
        >
          Clear
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676", marginBottom: "0.5rem" }}>
            Sector
          </label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              fontSize: "0.8125rem",
              color: "#000000",
              backgroundColor: "#ffffff",
              border: "1px solid #d4d4d4",
              outline: "none",
              cursor: "pointer",
            }}
          >
            {SECTORS.map((s) => (
              <option key={s} value={s === "All Sectors" ? "" : s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676", marginBottom: "0.5rem" }}>
            Impact Areas
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", paddingTop: "0.25rem" }}>
            {IMPACT_AREAS.map((area) => (
              <button
                key={area}
                onClick={() => handleToggleImpact(area)}
                style={{
                  padding: "0.25rem 0.75rem",
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: selectedImpact.includes(area) ? "#ffffff" : "#767676",
                  backgroundColor: selectedImpact.includes(area) ? "#000000" : "transparent",
                  border: "1px solid",
                  borderColor: selectedImpact.includes(area) ? "#000000" : "#d4d4d4",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {!searched ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6rem 0", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", backgroundColor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1rem" }}>
            🔍
          </div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 500, letterSpacing: "-0.01em", color: "#000000", margin: 0 }}>
            Discover Impact Startups
          </h3>
          <p style={{ fontSize: "0.8125rem", color: "#767676", marginTop: "0.5rem", maxWidth: "400px" }}>
            Search for sustainability-driven startups by name, sector, or impact area.
          </p>
        </div>
      ) : startups.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6rem 0", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", backgroundColor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1rem" }}>
            📭
          </div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 500, letterSpacing: "-0.01em", color: "#000000", margin: 0 }}>
            No startups found
          </h3>
          <p style={{ fontSize: "0.8125rem", color: "#767676", marginTop: "0.5rem" }}>
            Try adjusting your filters or using different keywords.
          </p>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676", marginBottom: "1rem" }}>
            {startups.length} startup{startups.length !== 1 ? "s" : ""} found
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 0,
            border: "1px solid #e5e5e5",
          }}>
            {startups.map((s, i) => (
              <div
                key={s.id}
                style={{
                  borderRight: (i + 1) % 3 !== 0 ? "1px solid #e5e5e5" : "none",
                  borderBottom: Math.ceil(startups.length / 3) * 3 > startups.length ? "1px solid #e5e5e5" : "none",
                }}
              >
                <div style={{ padding: "1.5rem", borderBottom: "1px solid #e5e5e5" }}>
                  <StartupCard startup={s} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}