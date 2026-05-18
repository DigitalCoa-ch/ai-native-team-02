export interface Startup {
  id: string;
  name: string;
  slug: string;
  website?: string;
  description: string;
  longDescription?: string;
  sector: string;
  industry: string;
  impactArea: string[];
  hq?: string;
  foundedYear?: number;
  size?: string;
  logoUrl?: string;
  crunchbaseId?: string;
  impactScore?: number;
  financialScore?: number;
  overallScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Analysis {
  id: string;
  startupId: string;
  agentRole: AgentRole;
  output: AgentOutput;
  confidence?: number;
  sources: string[];
  createdAt: Date;
}

export interface AgentOutput {
  summary: string;
  keyFindings: string[];
  riskFactors?: string[];
  recommendations?: string[];
  metrics?: Record<string, number | string>;
}

export type AgentRole =
  | "discovery"
  | "impact_analysis"
  | "financial_analysis"
  | "monitor"
  | "summarizer"
  | "insight";

export interface FundingEvent {
  id: string;
  startupId: string;
  round: string;
  amount?: number;
  currency: string;
  date: Date;
  source?: string;
}

export interface Alert {
  id: string;
  investorId: string;
  rule: AlertRule;
  isActive: boolean;
  lastFired?: Date;
  createdAt: Date;
}

export interface AlertRule {
  type: "funding" | "impact" | "news" | "score_change";
  targetStartupId?: string;
  sector?: string;
  threshold?: number;
  message: string;
}

export interface Investor {
  id: string;
  email: string;
  name: string;
  firm?: string;
  role: string;
}

export interface AgentRun {
  id: string;
  agentRole: AgentRole;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  status: "RUNNING" | "COMPLETED" | "FAILED";
  error?: string;
  startedAt: Date;
  completedAt?: Date;
}