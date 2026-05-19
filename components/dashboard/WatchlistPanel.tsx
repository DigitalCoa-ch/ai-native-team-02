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
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #e5e5e5" }}>
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 500, letterSpacing: "-0.01em", color: "#000000", margin: 0 }}>
            My Watchlist
          </h3>
          <p style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676", marginTop: "0.25rem" }}>
            Track your favorite impact startups
          </p>
        </div>
        <span style={{
          padding: "0.25rem 0.75rem",
          fontSize: "0.6875rem",
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#767676",
          border: "1px solid #d4d4d4",
        }}>
          {startups.length} startups
        </span>
      </div>

      {loading ? (
        <div style={{ padding: "3rem 0", textAlign: "center", color: "#767676", fontSize: "0.8125rem" }}>
          Loading...
        </div>
      ) : startups.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6rem 0", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", backgroundColor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1rem" }}>
            📋
          </div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 500, letterSpacing: "-0.01em", color: "#000000", margin: 0 }}>
            Your watchlist is empty
          </h3>
          <p style={{ fontSize: "0.8125rem", color: "#767676", marginTop: "0.5rem", maxWidth: "400px" }}>
            Go to Discover to find startups and add them to your watchlist.
          </p>
        </div>
      ) : (
        <table className="swiss-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676", textAlign: "left", padding: "0.75rem 1rem", borderBottom: "1px solid #e5e5e5" }}>Name</th>
              <th style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676", textAlign: "left", padding: "0.75rem 1rem", borderBottom: "1px solid #e5e5e5" }}>Sector</th>
              <th style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676", textAlign: "left", padding: "0.75rem 1rem", borderBottom: "1px solid #e5e5e5" }}>Impact</th>
              <th style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676", textAlign: "left", padding: "0.75rem 1rem", borderBottom: "1px solid #e5e5e5" }}>Financial</th>
              <th style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676", textAlign: "left", padding: "0.75rem 1rem", borderBottom: "1px solid #e5e5e5" }}>Overall</th>
              <th style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676", textAlign: "left", padding: "0.75rem 1rem", borderBottom: "1px solid #e5e5e5" }}></th>
            </tr>
          </thead>
          <tbody>
            {startups.map((s) => (
              <tr key={s.id} style={{ borderBottom: "1px solid #f5f5f5" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f5f5f5"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <td style={{ padding: "1rem", fontSize: "0.8125rem", color: "#000000", fontWeight: 500 }}>
                  <a href={`/startups/${s.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {s.name}
                  </a>
                </td>
                <td style={{ padding: "1rem", fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: "#767676" }}>
                  {s.sector}
                </td>
                <td style={{ padding: "1rem", fontSize: "0.8125rem", fontWeight: 500, color: s.impactScore >= 0.7 ? "#000000" : "#767676" }}>
                  {s.impactScore != null ? `${Math.round(s.impactScore * 100)}%` : "—"}
                </td>
                <td style={{ padding: "1rem", fontSize: "0.8125rem", fontWeight: 500, color: s.financialScore >= 0.7 ? "#000000" : "#767676" }}>
                  {s.financialScore != null ? `${Math.round(s.financialScore * 100)}%` : "—"}
                </td>
                <td style={{ padding: "1rem", fontSize: "0.8125rem", fontWeight: 500, color: s.overallScore >= 0.7 ? "#000000" : "#767676" }}>
                  {s.overallScore != null ? `${Math.round(s.overallScore * 100)}%` : "—"}
                </td>
                <td style={{ padding: "1rem" }}>
                  <button style={{
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "#e63329",
                    backgroundColor: "transparent",
                    border: "1px solid #e63329",
                    cursor: "pointer",
                  }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}