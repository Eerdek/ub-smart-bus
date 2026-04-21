import { useNavigate, useLocation } from "react-router";
import { Home, Search, MapPin, Star, MoreHorizontal } from "lucide-react";

const tabs = [
  { icon: Home, label: "Нүүр", path: "/home" },
  { icon: Search, label: "Хайх", path: "/search-routes" },
  { icon: MapPin, label: "Газрын зураг", path: "/map" },
  { icon: Star, label: "Дуртай", path: "/favorites" },
  { icon: MoreHorizontal, label: "Бусад", path: "/settings" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="flex items-center"
      style={{
        background: "#fff",
        borderTop: "1px solid #E2E8F0",
        height: 76,
        boxShadow: "0 -4px 24px rgba(17,24,39,0.06)",
      }}
    >
      {tabs.map(({ icon: Icon, label, path }) => {
        const active = location.pathname === path || (path === "/search-routes" && location.pathname === "/search-stops");
        return (
          <button
            key={path}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2"
            onClick={() => navigate(path)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <Icon
              size={22}
              strokeWidth={active ? 2.5 : 1.8}
              style={{ color: active ? "#F47C20" : "#9CA3AF" }}
            />
            <span
              style={{
                fontSize: 11,
                color: active ? "#F47C20" : "#9CA3AF",
                fontWeight: active ? 600 : 400,
                lineHeight: "16px",
                letterSpacing: "0.01em",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
