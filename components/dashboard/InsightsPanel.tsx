"use client";

import { useState } from "react";

const mockInsights = [
  {
    title: "Climate Tech Series B surge",
    description: "Multiple climate-focused startups are raising Series B rounds in Q2 2026, with median raises of $45M. This sector shows strong LP appetite.",
    sector: "Climate",
    confidence: 0.87,
    action: "Explore Series B climate opportunities",
  },
  {
    title: "Healthcare AI gaps in Southeast Asia",
    description: "AI-driven diagnostic tools for rural healthcare are underrepresented. Only 3 funded startups target this segment despite clear demand.",
    sector: "Healthcare",
    confidence: 0.72,
    action: "Map competitive landscape in SEA",
  },
  {
    title: "Infrastructure retrofit opportunity",
    description: "Building retrofit startups are attracting government contracts. Expect 3x funding increase by 2027 as regulations tighten.",
    sector: "Infrastructure",
    confidence: 0.79,
    action: "Monitor EU regulatory developments",
  },
  {
    title: "AgBio carbon credit platforms emerging",
    description: "New category combining regenerative agriculture with carbon credit marketplaces. Early stage but high impact potential.",
    sector: "Agriculture",
    confidence: 0.68,
    action: "Identify early leaders in the space",
  },
  {
    title: "EdTech pivot to workforce reskilling",
    description: "EdTech startups focused on K-12 are pivoting to B2B reskilling. Enterprise demand is 4x pre-pandemic levels.",
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
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #e5e5e5" }}>
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 500, letterSpacing: "-0.01em", color: "#000000", margin: 0 }}>
            AI-Generated Insights
          </h3>
          <p style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#767676", marginTop: "0.25rem" }}>
            Actionable investment intelligence
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.8125rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: "#ffffff",
            backgroundColor: "#000000",
            border: "1px solid #000000",
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.5 : 1,
          }}
        >
          {loading ? "Analyzing..." : "Refresh Insights"}
        </button>
      </div>

      {/* Insights Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: 0,
        border: "1px solid #e5e5e5",
      }}>
        {mockInsights.map((insight, i) => (
          <div
            key={i}
            style={{
              padding: "1.5rem",
              backgroundColor: "#ffffff",
              borderRight: (i + 1) % 2 !== 0 ? "1px solid #e5e5e5" : "none",
              borderBottom: i < mockInsights.length - 2 ? "1px solid #e5e5e5" : "none",
              display: "flex",
              flexDirection: "column",
              transition: "border-color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#000000")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = i < mockInsights.length - 2 ? "#e5e5e5" : "transparent")}
          >
            {/* Sector + Confidence */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{
                display: "inline-flex",
                padding: "0.125rem 0.5rem",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#767676",
                border: "1px solid #d4d4d4",
              }}>
                {insight.sector}
              </span>
              <span style={{ fontSize: "0.6875rem", color: "#767676" }}>
                {Math.round(insight.confidence * 100)}% confidence
              </span>
            </div>

            {/* Title */}
            <h4 style={{ fontSize: "1rem", fontWeight: 500, letterSpacing: "-0.01em", color: "#000000", margin: "0 0 0.75rem 0" }}>
              {insight.title}
            </h4>

            {/* Description */}
            <p style={{ fontSize: "0.8125rem", color: "#404040", lineHeight: 1.6, margin: 0, flex: 1 }}>
              {insight.description}
            </p>

            {/* Action */}
            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #f5f5f5" }}>
              <button style={{
                width: "100%",
                padding: "0.5rem 1rem",
                fontSize: "0.8125rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: "#000000",
                backgroundColor: "transparent",
                border: "1px solid #d4d4d4",
                cursor: "pointer",
                transition: "border-color 0.15s ease",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#000000")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d4d4d4")}
              >
                <span>{insight.action}</span>
                <span style={{ fontSize: "1rem" }}>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}