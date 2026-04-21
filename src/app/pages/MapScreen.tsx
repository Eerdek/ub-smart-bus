import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Navigation, X, Bus, MapPin, ChevronRight, Layers } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { EtaChip } from "../components/EtaChip";

const filters = ["Бүгд", "Ойролцоо", "Live автобус", "Хурдан"];

const mapStops = [
  { id: "1", name: "Сүхбаатарын талбай", x: 49, y: 48, type: "stop" },
  { id: "2", name: "Их Сургуулийн буудал", x: 35, y: 38, type: "stop" },
  { id: "3", name: "Их дэлгүүр", x: 55, y: 60, type: "stop" },
  { id: "4", name: "Наадмын талбай", x: 68, y: 45, type: "stop" },
  { id: "5", name: "Нийслэлийн эмнэлэг", x: 42, y: 62, type: "stop" },
  { id: "6", name: "Зайсан", x: 30, y: 75, type: "stop" },
];

const liveBuses = [
  { id: "b1", route: "XO:112", x: 47, y: 52, eta: 2 },
  { id: "b2", route: "11", x: 61, y: 41, eta: 6 },
  { id: "b3", route: "XO:12", x: 33, y: 66, eta: 9 },
  { id: "b4", route: "7", x: 56, y: 35, eta: 4 },
];

type SelectedStop = {
  id: string;
  name: string;
  arrivals: Array<{ route: string; destination: string; eta: number }>;
} | null;

const stopArrivals: Record<string, Array<{ route: string; destination: string; eta: number }>> = {
  "1": [
    { route: "XO:112", destination: "Офицеруудын ордон", eta: 2 },
    { route: "11", destination: "Баянгол", eta: 5 },
    { route: "23", destination: "Дэнж уул", eta: 8 },
  ],
  "2": [
    { route: "1", destination: "Зайсан", eta: 3 },
    { route: "5", destination: "Амгалан", eta: 7 },
  ],
  "3": [
    { route: "3", destination: "Налайх", eta: 4 },
    { route: "32", destination: "Баянхошуу", eta: 9 },
  ],
  "4": [
    { route: "XO:112", destination: "Офицеруудын ордон", eta: 6 },
    { route: "7", destination: "Хайлааст", eta: 11 },
  ],
  "5": [
    { route: "4", destination: "Нисэх", eta: 5 },
    { route: "8", destination: "Зайсан", eta: 12 },
  ],
  "6": [
    { route: "XO:33", destination: "Чингэлтэй", eta: 7 },
    { route: "33", destination: "Чингэлтэй", eta: 15 },
  ],
};

export function MapScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Бүгд");
  const [selectedStop, setSelectedStop] = useState<SelectedStop>(null);

  const handleStopTap = (stop: typeof mapStops[0]) => {
    setSelectedStop({
      id: stop.id,
      name: stop.name,
      arrivals: stopArrivals[stop.id] || [],
    });
  };

  return (
    <div className="flex flex-col" style={{ height: 844, background: "#F7F8FA", position: "relative" }}>
      <div style={{ height: 44, background: "transparent", position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }} />

      {/* Map background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0,
          background: "#E8EFF5",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }} />

        {/* Road lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 390 844" preserveAspectRatio="none">
          {/* Major roads */}
          <path d="M0 420 Q195 380 390 420" stroke="#C8D8E8" strokeWidth="18" fill="none" />
          <path d="M195 0 Q200 422 195 844" stroke="#C8D8E8" strokeWidth="14" fill="none" />
          <path d="M0 320 Q390 300 390 320" stroke="#C8D8E8" strokeWidth="12" fill="none" />
          <path d="M80 0 Q90 422 80 844" stroke="#D4E0EA" strokeWidth="10" fill="none" />
          <path d="M300 0 Q310 422 300 844" stroke="#D4E0EA" strokeWidth="10" fill="none" />

          {/* Route lines */}
          <path d="M50 300 Q150 380 250 400 Q320 410 380 390" stroke="#F47C20" strokeWidth="3" fill="none" strokeDasharray="8,4" opacity="0.6" />
          <path d="M30 600 Q130 500 230 430 Q300 400 370 350" stroke="#2563EB" strokeWidth="3" fill="none" strokeDasharray="8,4" opacity="0.5" />
          <path d="M100 750 Q180 650 200 500 Q210 420 220 300" stroke="#7C3AED" strokeWidth="3" fill="none" strokeDasharray="8,4" opacity="0.4" />

          {/* Block shapes */}
          <rect x="40" y="180" width="80" height="60" rx="4" fill="#D6E4ED" />
          <rect x="160" y="160" width="60" height="70" rx="4" fill="#D6E4ED" />
          <rect x="250" y="170" width="90" height="55" rx="4" fill="#D6E4ED" />
          <rect x="40" y="460" width="70" height="80" rx="4" fill="#D6E4ED" />
          <rect x="150" y="480" width="100" height="65" rx="4" fill="#D6E4ED" />
          <rect x="280" y="450" width="80" height="90" rx="4" fill="#D6E4ED" />
          <rect x="30" y="620" width="90" height="70" rx="4" fill="#D6E4ED" />
          <rect x="160" y="600" width="120" height="80" rx="4" fill="#D6E4ED" />
        </svg>

        {/* Stop markers */}
        {mapStops.map(stop => (
          <button
            key={stop.id}
            onClick={() => handleStopTap(stop)}
            style={{
              position: "absolute",
              left: `${stop.x}%`,
              top: `${stop.y}%`,
              transform: "translate(-50%, -100%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              zIndex: 5,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: selectedStop?.id === stop.id ? 36 : 28,
                height: selectedStop?.id === stop.id ? 36 : 28,
                borderRadius: "50%",
                background: selectedStop?.id === stop.id ? "#F47C20" : "#fff",
                border: `2.5px solid ${selectedStop?.id === stop.id ? "#F47C20" : "#F47C20"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                transition: "all 0.2s",
              }}>
                <MapPin size={selectedStop?.id === stop.id ? 18 : 14} style={{ color: selectedStop?.id === stop.id ? "#fff" : "#F47C20" }} />
              </div>
              <div style={{ width: 2, height: 8, background: "#F47C20" }} />
            </div>
          </button>
        ))}

        {/* Live bus markers */}
        {liveBuses.map(bus => (
          <div
            key={bus.id}
            style={{
              position: "absolute",
              left: `${bus.x}%`,
              top: `${bus.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 6,
            }}
          >
            <div style={{
              background: "#2563EB",
              borderRadius: "50%",
              width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 0 4px rgba(37,99,235,0.2)",
              border: "2px solid #fff",
            }}>
              <Bus size={14} style={{ color: "#fff" }} />
            </div>
            <div style={{
              background: "#fff",
              borderRadius: 6,
              padding: "2px 5px",
              fontSize: 10,
              fontWeight: 700,
              color: "#2563EB",
              textAlign: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              marginTop: 2,
              whiteSpace: "nowrap",
            }}>{bus.route}</div>
          </div>
        ))}

        {/* User location */}
        <div style={{ position: "absolute", left: "48%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 7 }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#2563EB", border: "3px solid #fff", boxShadow: "0 0 0 8px rgba(37,99,235,0.15)" }} />
        </div>
      </div>

      {/* Overlay controls */}
      <div style={{ position: "absolute", top: 44, left: 0, right: 0, zIndex: 20, padding: "12px 16px" }}>
        {/* Search bar */}
        <div
          className="flex items-center gap-2"
          style={{
            height: 48,
            background: "#fff",
            borderRadius: 999,
            padding: "0 16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          <Search size={18} style={{ color: "#9CA3AF" }} />
          <span style={{ flex: 1, fontSize: 14, color: "#9CA3AF" }}>Газрын зураг дээр хайх...</span>
          <Layers size={18} style={{ color: "#6B7280" }} />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mt-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                height: 32, padding: "0 14px",
                borderRadius: 999,
                border: "none",
                background: activeFilter === f ? "#F47C20" : "#fff",
                color: activeFilter === f ? "#fff" : "#374151",
                fontSize: 13, fontWeight: activeFilter === f ? 600 : 400,
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Locate me button */}
      <div style={{ position: "absolute", bottom: selectedStop ? 280 : 100, right: 16, zIndex: 20 }}>
        <button style={{
          width: 48, height: 48, borderRadius: "50%",
          background: "#fff", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        }}>
          <Navigation size={22} style={{ color: "#F47C20" }} />
        </button>
      </div>

      {/* Selected stop bottom sheet */}
      {selectedStop && (
        <div
          style={{
            position: "absolute",
            bottom: 76,
            left: 16,
            right: 16,
            background: "#fff",
            borderRadius: 20,
            padding: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            zIndex: 30,
            animation: "slideUp 0.25s ease-out",
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{selectedStop.name}</div>
              <div className="flex items-center gap-1 mt-1">
                <Navigation size={12} style={{ color: "#9CA3AF" }} />
                <span style={{ fontSize: 12, color: "#9CA3AF" }}>120м дотор</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedStop(null)}
              style={{ width: 32, height: 32, borderRadius: "50%", background: "#F7F8FA", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <X size={16} style={{ color: "#6B7280" }} />
            </button>
          </div>

          {/* Next buses */}
          <div className="flex flex-col gap-2 mb-4">
            {selectedStop.arrivals.slice(0, 2).map((arr, i) => (
              <div key={i} className="flex items-center gap-3" style={{ background: "#F7F8FA", borderRadius: 10, padding: "10px 12px" }}>
                <span style={{ fontSize: 12, fontWeight: 700, background: "#FFF1E7", color: "#F47C20", borderRadius: 6, padding: "3px 8px" }}>{arr.route}</span>
                <span style={{ flex: 1, fontSize: 13, color: "#374151", fontWeight: 500 }}>{arr.destination}</span>
                <EtaChip minutes={arr.eta} />
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate(`/stop/${selectedStop.id}`)}
            className="w-full flex items-center justify-center gap-2"
            style={{
              height: 46, background: "#F47C20", border: "none", borderRadius: 999,
              color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}
          >
            Дэлгэрэнгүй
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20 }}>
        <BottomNav />
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}