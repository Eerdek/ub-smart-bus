import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, X, MapPin, ChevronRight, Navigation } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { BottomNav } from "../components/BottomNav";

const stops = [
  { id: "1", name: "Сүхбаатарын талбай", code: "SB-01", distance: "120м", routes: ["7", "11", "23", "XO:112"] },
  { id: "2", name: "Их Сургуулийн буудал", code: "IS-04", distance: "280м", routes: ["1", "5", "XO:12"] },
  { id: "3", name: "Их дэлгүүр", code: "ID-02", distance: "450м", routes: ["3", "9", "32"] },
  { id: "4", name: "10 буудал", code: "10-01", distance: "580м", routes: ["10", "22", "45"] },
  { id: "5", name: "10 ШАР БАЙР", code: "10-02", distance: "640м", routes: ["10", "XO:33"] },
  { id: "6", name: "10-р хороолол", code: "10-03", distance: "850м", routes: ["12", "18", "56"] },
  { id: "7", name: "Наадмын талбай", code: "NT-01", distance: "920м", routes: ["7", "11", "XO:112"] },
  { id: "8", name: "Нийслэлийн эмнэлэг", code: "NE-01", distance: "1.1км", routes: ["4", "8", "15"] },
  { id: "9", name: "Зайсан", code: "ZS-01", distance: "2.3км", routes: ["XO:33", "33"] },
  { id: "10", name: "Амгалан", code: "AM-01", distance: "2.8км", routes: ["XO:12", "56"] },
];

export function SearchStopsScreen() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = stops.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col" style={{ minHeight: 844, background: "#F7F8FA" }}>
      <div style={{ height: 44, background: "#fff" }} />
      <AppBar title="Буудал хайх" showBack />

      {/* Search field */}
      <div className="px-4 py-3" style={{ background: "#fff", borderBottom: "1px solid #F1F3F6" }}>
        <div
          className="flex items-center gap-2"
          style={{
            height: 44,
            background: "#F7F8FA",
            border: "1.5px solid #E2E8F0",
            borderRadius: 12,
            padding: "0 14px",
          }}
        >
          <Search size={18} style={{ color: "#9CA3AF", flexShrink: 0 }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Буудлын нэр эсвэл дугаар..."
            autoFocus
            style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, color: "#111827" }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <X size={16} style={{ color: "#9CA3AF" }} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4" style={{ scrollbarWidth: "none" }}>
        {/* Nearby header */}
        <div className="flex items-center gap-2 mb-3">
          <Navigation size={14} style={{ color: "#F47C20" }} />
          <span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {query ? "Хайлтын үр дүн" : "Ойролцоох буудлууд"}
          </span>
        </div>

        {/* Stop list */}
        <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #F1F3F6", boxShadow: "0 2px 8px rgba(17,24,39,0.04)", marginBottom: 20 }}>
          {filtered.map((stop, i) => (
            <button
              key={stop.id}
              onClick={() => navigate(`/stop/${stop.id}`)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                background: "none",
                border: "none",
                borderBottom: i < filtered.length - 1 ? "1px solid #F7F8FA" : "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "#FFF1E7",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <MapPin size={20} style={{ color: "#F47C20" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", lineHeight: "20px" }}>{stop.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span style={{ fontSize: 12, color: "#9CA3AF" }}># {stop.code}</span>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#D1D5DB", display: "inline-block" }} />
                  <span style={{ fontSize: 12, color: "#9CA3AF" }}>{stop.distance}</span>
                </div>
                <div className="flex gap-1 mt-1.5 flex-wrap">
                  {stop.routes.slice(0, 4).map(r => (
                    <span key={r} style={{ fontSize: 11, fontWeight: 600, background: "#F1F3F6", color: "#374151", borderRadius: 6, padding: "1px 6px" }}>{r}</span>
                  ))}
                  {stop.routes.length > 4 && (
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>+{stop.routes.length - 4}</span>
                  )}
                </div>
              </div>
              <ChevronRight size={16} style={{ color: "#D1D5DB", flexShrink: 0 }} />
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: "32px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📍</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#374151" }}>Буудал олдсонгүй</div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>Өөр нэр эсвэл дугаараар хайж үзнэ үү</div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
