"use client";

import { useState } from "react";
import { DiscoverPanel } from "./DiscoverPanel";
import { WatchlistPanel } from "./WatchlistPanel";
import { InsightsPanel } from "./InsightsPanel";

const NAV_ITEMS = [
  { id: "discover", label: "Discover" },
  { id: "watchlist", label: "Watchlist" },
  { id: "insights", label: "Insights" },
] as const;

type NavId = (typeof NAV_ITEMS)[number]["id"];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<NavId>("discover");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", color: "#000000" }}>
      <header style={{
        borderBottom: "1px solid #e5e5e5",
        padding: "0 2rem",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        backgroundColor: "#ffffff",
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
          <span style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.02em", color: "#000000" }}>
            ImpactVest
          </span>
          <span style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#767676" }}>
            AI
          </span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "0" }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                padding: "0.5rem 1.5rem",
                fontSize: "0.8125rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: activeTab === item.id ? "#000000" : "#767676",
                borderBottom: activeTab === item.id ? "1px solid #000000" : "1px solid transparent",
                background: "none",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                cursor: "pointer",
                transition: "color 0.15s ease",
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676" }}>
            Demo Investor
          </span>
        </div>
      </header>

      <main style={{ padding: "3rem 2rem", maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span className="section-label">
            {activeTab === "discover" ? "Discover" : activeTab === "watchlist" ? "Watchlist" : "Insights"}
          </span>
        </div>

        {activeTab === "discover" && <DiscoverPanel />}
        {activeTab === "watchlist" && <WatchlistPanel />}
        {activeTab === "insights" && <InsightsPanel />}
      </main>
    </div>
  );
}
