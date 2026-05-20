import { BriefingPanel } from "@/components/briefing/BriefingPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-black">
        <div className="swiss-grid">
          <div className="grid grid-cols-12 py-4 items-end">
            <div className="col-span-6">
              <div className="flex items-baseline gap-3">
                <span className="text-xl font-semibold tracking-tight text-black">
                  RiskBrief
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                  AI
                </span>
              </div>
            </div>
            <div className="col-span-6 text-right">
              <nav className="inline-flex items-center gap-6">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Briefings</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">About</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Pricing</span>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="swiss-grid py-16">
        <div className="grid grid-cols-12 gap-8">
          {/* Left column — intro */}
          <div className="col-span-4">
            <div className="sticky top-16">
              <p className="section-label mb-4">Service</p>
              <h1 className="text-3xl font-semibold text-black tracking-tight leading-tight mb-6">
                Geopolitical Risk Briefings
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                Enter any investment topic or sector. The AI searches the latest news and produces a ranked risk briefing.
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-px bg-black"></span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Powered by Gemini</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-px bg-gray-300"></span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Web search + analysis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — BriefingPanel */}
          <div className="col-span-8">
            <BriefingPanel />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-24">
        <div className="swiss-grid py-6">
          <div className="grid grid-cols-12 items-center text-xs text-gray-400">
            <div className="col-span-6">
              <span className="uppercase tracking-wider">RiskBrief AI</span>
            </div>
            <div className="col-span-6 text-right space-x-4">
              <span className="uppercase tracking-wider">Privacy</span>
              <span className="uppercase tracking-wider">Terms</span>
              <span className="uppercase tracking-wider">Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}