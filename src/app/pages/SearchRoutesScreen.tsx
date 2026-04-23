import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, X, ChevronRight, Star, Check } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { BottomNav } from "../components/BottomNav";

const allRoutes = [
  { id: "XO112", number: "XO:112", name: "Хонхор - Офицеруудын ордон", type: "express", stops: 22 },
  { id: "XO12", number: "XO:12", name: "Мал бордох - 5 шар", type: "regular", stops: 18 },
  { id: "XO13", number: "XO:13", name: "Баруун 4 зам - 10 хороо", type: "regular", stops: 14 },
  { id: "XO22", number: "XO:22", name: "Баянхошуу - Цагаан давхар", type: "regular", stops: 20 },
  { id: "XO45", number: "XO:45", name: "Тэргүүлэгчид - Нисэх онгоцны буудал", type: "express", stops: 16 },
  { id: "XO7", number: "XO:7", name: "Хайлааст - Яармаг", type: "regular", stops: 24 },
  { id: "XO11", number: "XO:11", name: "Дэнж уул - Баянгол", type: "regular", stops: 19 },
  { id: "XO56", number: "XO:56", name: "Баянзүрх - Амгалан", type: "regular", stops: 21 },
  { id: "XO33", number: "XO:33", name: "Чингэлтэй - Зайсан", type: "express", stops: 12 },
  { id: "XO18", number: "XO:18", name: "Улиастай зам - 3-р хороолол", type: "regular", stops: 17 },
];

const recentSearches = ["XO:112", "Сүхбаатарын талбай", "XO:7", "Яармаг"];
const filters = ["Бүгд", "Ойролцоо", "Хурдан", "Дуртай"];
const nearbyRouteIds = new Set(["XO112", "XO12", "XO7", "XO11"]);
const routeColors: Record<string, string> = {
  express: "#F47C20",
  regular: "#2563EB",
};

export function SearchRoutesScreen() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Бүгд");
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["XO112", "XO12"]));

  const normalizedQuery = query.trim().toLowerCase();
  const activeFilterIndex = filters.indexOf(activeFilter);

  const filtered = allRoutes.filter(route => {
    const matchesQuery =
      route.number.toLowerCase().includes(normalizedQuery) ||
      route.name.toLowerCase().includes(normalizedQuery);

    if (!matchesQuery) {
      return false;
    }

    if (activeFilterIndex === 1) {
      return nearbyRouteIds.has(route.id);
    }

    if (activeFilterIndex === 2) {
      return route.type === "express";
    }

    if (activeFilterIndex === 3) {
      return favorites.has(route.id);
    }

    return true;
  });

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col" style={{ height: "100%", background: "#F7F8FA" }}>
      <div style={{ height: 44, background: "#fff" }} />
      <AppBar title="Чиглэл хайх" showBack />

      {/* Search field */}
      <div className="px-4 py-3" style={{ background: "#fff", borderBottom: "1px solid #F1F3F6" }}>
        <div className="flex items-center">
          <div
            className="flex-1 flex items-center gap-2"
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
              placeholder="Чиглэл, буудал, автобус № хайх"
              autoFocus
              style={{
                flex: 1, background: "none", border: "none", outline: "none",
                fontSize: 14, color: "#111827",
              }}
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <X size={16} style={{ color: "#9CA3AF" }} />
              </button>
            )}
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {filters.map(f => {
            const active = activeFilter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                style={{
                  height: 34,
                  padding: active ? "0 14px 0 10px" : "0 14px",
                  borderRadius: 999,
                  border: active ? "1.5px solid #FDBA74" : "1.5px solid #E2E8F0",
                  background: active ? "#FFF1E7" : "#fff",
                  color: active ? "#C2410C" : "#6B7280",
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: active ? "0 4px 10px rgba(244,124,32,0.15)" : "none",
                }}
              >
                {active && <Check size={13} style={{ color: "#F47C20" }} />}
                {f}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4" style={{ scrollbarWidth: "none" }}>
        {/* Recent searches */}
        {!query && (
          <div className="pt-4">
            <div style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Сүүлийн хайлтууд</div>
            <div className="flex flex-wrap gap-2 mb-5">
              {recentSearches.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  style={{
                    height: 32,
                    padding: "0 14px",
                    borderRadius: 999,
                    border: "1.5px solid #E2E8F0",
                    background: "#fff",
                    color: "#374151",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Route results */}
        <div className="pb-4">
          {!query && <div style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Бүх чиглэлүүд</div>}
          <div className="flex items-center justify-between mb-2">
            <div style={{ fontSize: 13, color: "#6B7280", fontWeight: 600 }}>
              {filtered.length} чиглэл олдлоо
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #F1F3F6", boxShadow: "0 2px 8px rgba(17,24,39,0.04)" }}>
            {filtered.map((route, i) => (
              <div
                key={route.id}
                style={{
                  borderBottom: i < filtered.length - 1 ? "1px solid #F1F3F6" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  paddingRight: 8,
                }}
              >
                <button
                  type="button"
                  onClick={() => navigate(`/route/${route.id}`)}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 16px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{
                    minWidth: 68,
                    padding: "5px 8px",
                    borderRadius: 10,
                    background: routeColors[route.type] + "18",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: routeColors[route.type] }}>{route.number}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#111827", lineHeight: "20px" }}>{route.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span style={{ fontSize: 12, color: "#9CA3AF" }}>{route.stops} буудал</span>
                      {route.type === "express" && (
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#F47C20", background: "#FFF1E7", borderRadius: 6, padding: "1px 6px" }}>Хурдан</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: "#D1D5DB" }} />
                </button>
                <button
                  type="button"
                  aria-label={favorites.has(route.id) ? "Remove from favorites" : "Add to favorites"}
                  onClick={() => toggleFav(route.id)}
                  style={{ width: 32, height: 32, borderRadius: "50%", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Star size={16} style={{ color: favorites.has(route.id) ? "#F59E0B" : "#D1D5DB", fill: favorites.has(route.id) ? "#F59E0B" : "none" }} />
                </button>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: "32px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#374151" }}>Илэрц олдсонгүй</div>
                <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>Өөр нэр, дугаараар хайж үзнэ үү</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
