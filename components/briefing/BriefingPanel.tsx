"use client";

import { useState } from "react";
import type { RiskItem } from "@/lib/briefing/agent";

interface BriefingResult {
  summary: string;
  risks: RiskItem[];
  geoContext: string | null;
  sources: string[];
}

function BriefingDisplay({ result, topic, onReset }: { result: BriefingResult; topic: string; onReset: () => void }) {
  return (
    <div>
      <div className="mb-6 pb-4 border-b border-black">
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-8">
            <p className="section-label mb-1">Briefing</p>
            <h2 className="text-xl font-semibold text-black tracking-tight">{topic}</h2>
          </div>
          <div className="col-span-4 text-right">
            <span className="text-xs text-gray-500 font-mono">
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <p className="section-label mb-3">Summary</p>
        <p className="text-base text-gray-900 leading-relaxed max-w-2xl">{result.summary}</p>
      </div>

      <div className="mb-8">
        <p className="section-label mb-0 pb-3 border-b border-gray-200">Risk Analysis</p>
        <table className="swiss-table mt-0">
          <thead>
            <tr>
              <th className="w-8">#</th>
              <th>Description</th>
              <th>Impact</th>
              <th>Confidence</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {result.risks.map((risk, i) => (
              <tr key={i}>
                <td className="text-xs text-gray-400 font-mono">{String(i + 1).padStart(2, "0")}</td>
                <td className="text-sm text-gray-900">{risk.description}</td>
                <td className="text-sm text-gray-700">{risk.potentialImpact}</td>
                <td className="text-sm">
                  <span className={`font-medium font-mono text-xs ${
                    risk.confidence >= 0.7 ? "text-red-600" : risk.confidence >= 0.4 ? "text-gray-600" : "text-gray-400"
                  }`}>
                    {Math.round(risk.confidence * 100)}%
                  </span>
                </td>
                <td className="text-xs text-gray-500 uppercase tracking-wider">{risk.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {result.geoContext && (
        <div className="mb-8">
          <p className="section-label mb-3">Geopolitical Context</p>
          <p className="text-sm text-gray-700 leading-relaxed border-l-2 border-red-600 pl-4">{result.geoContext}</p>
        </div>
      )}

      {result.sources.length > 0 && (
        <div className="mb-8">
          <p className="section-label mb-3">Sources</p>
          <div className="space-y-1">
            {result.sources.map((source, i) => (
              <a key={i} href={source} target="_blank" rel="noopener noreferrer" className="block text-xs text-gray-500 hover:text-black underline truncate">
                {source}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-gray-200">
        <button onClick={onReset} className="btn-secondary text-xs">
          New Briefing
        </button>
      </div>
    </div>
  );
}

const QUICK_TOPICS = [
  "Semiconductors",
  "Oil & Gas",
  "China tech regulation",
  "US Federal Reserve",
  "European energy",
  "Emerging markets",
];

export function BriefingPanel() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BriefingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/briefings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.briefing);
    } catch (e) {
      setError("Failed to generate briefing. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setTopic("");
    setError(null);
  };

  if (result) {
    return <BriefingDisplay result={result} topic={topic} onReset={handleReset} />;
  }

  return (
    <div>
      <div className="mb-6">
        <p className="section-label mb-4">Topic</p>
        <div className="flex gap-0">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="e.g. semiconductors, European energy policy, China tech..."
            className="swiss-input flex-1 border-r-0 rounded-none"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="btn-primary rounded-none px-8 border-l-0 whitespace-nowrap"
          >
            {loading ? "Searching..." : "Generate"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}

      <div>
        <p className="section-label mb-3">Quick topics</p>
        <div className="flex flex-wrap gap-2">
          {QUICK_TOPICS.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className="text-xs text-gray-500 border border-gray-300 px-3 py-1 hover:border-black hover:text-black transition-colors uppercase tracking-wider"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
