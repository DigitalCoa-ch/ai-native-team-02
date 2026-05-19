"use client";

import { useState } from "react";
import type { Startup } from "@/types";

function getScoreColor(score?: number | null) {
  if (score === null || score === undefined) return "#767676";
  if (score >= 0.7) return "#000000";
  if (score >= 0.4) return "#404040";
  return "#767676";
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
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e5e5",
        padding: "1.5rem",
        transition: "border-color 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#000000")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
    >
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 500, letterSpacing: "-0.01em", color: "#000000", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {startup.name}
          </h3>
          <p style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#767676", margin: "0.25rem 0 0 0" }}>
            {startup.sector} · {startup.industry}
          </p>
        </div>
        {startup.logoUrl ? (
          <img
            src={startup.logoUrl}
            alt={startup.name}
            style={{ width: "40px", height: "40px", objectFit: "cover", marginLeft: "0.75rem", flexShrink: 0 }}
          />
        ) : (
          <div style={{
            width: "40px", height: "40px", backgroundColor: "#f5f5f5",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginLeft: "0.75rem", flexShrink: 0, fontSize: "1rem"
          }}>
            🌱
          </div>
        )}
      </div>

      {/* Description */}
      <p style={{ fontSize: "0.8125rem", color: "#404040", lineHeight: 1.5, marginBottom: "1rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {startup.description}
      </p>

      {/* Impact Areas */}
      {startup.impactArea && startup.impactArea.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1rem" }}>
          {startup.impactArea.slice(0, 4).map((area) => (
            <span key={area} style={{
              display: "inline-flex", alignItems: "center",
              padding: "0.125rem 0.5rem",
              fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.04em",
              color: "#e63329", border: "1px solid #e63329",
              textTransform: "uppercase"
            }}>
              {area}
            </span>
          ))}
        </div>
      )}

      {/* Scores */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #f5f5f5" }}>
        <div>
          <p style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676", margin: "0 0 0.25rem 0" }}>Impact</p>
          <p style={{ fontSize: "0.875rem", fontWeight: 500, color: getScoreColor(startup.impactScore), margin: 0 }}>
            {startup.impactScore != null ? `${Math.round(startup.impactScore * 100)}%` : "—"}
          </p>
        </div>
        <div>
          <p style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676", margin: "0 0 0.25rem 0" }}>Financial</p>
          <p style={{ fontSize: "0.875rem", fontWeight: 500, color: getScoreColor(startup.financialScore), margin: 0 }}>
            {startup.financialScore != null ? `${Math.round(startup.financialScore * 100)}%` : "—"}
          </p>
        </div>
        <div>
          <p style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676", margin: "0 0 0.25rem 0" }}>Overall</p>
          <p style={{ fontSize: "0.875rem", fontWeight: 500, color: getScoreColor(startup.overallScore), margin: 0 }}>
            {startup.overallScore != null ? `${Math.round(startup.overallScore * 100)}%` : "—"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <a
          href={`/startups/${startup.id}`}
          style={{
            flex: 1, textAlign: "center", padding: "0.5rem 1rem",
            fontSize: "0.8125rem", fontWeight: 500, letterSpacing: "0.02em",
            color: "#000000", border: "1px solid #d4d4d4",
            transition: "border-color 0.15s ease",
            display: "inline-block",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#000000")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d4d4d4")}
        >
          View Details
        </a>
        <button
          onClick={handleSave}
          disabled={saved}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.8125rem", fontWeight: 500, letterSpacing: "0.02em",
            color: saved ? "#e63329" : "#ffffff",
            backgroundColor: saved ? "transparent" : "#000000",
            border: saved ? "1px solid #e63329" : "1px solid #000000",
            cursor: saved ? "default" : "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {saved ? "✓ Saved" : "+ Watch"}
        </button>
      </div>
    </div>
  );
}