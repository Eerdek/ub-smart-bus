import { useState } from "react";
import { Bell, Globe, Moon, HelpCircle, Info, MessageSquare, ChevronRight, User, Shield } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { BottomNav } from "../components/BottomNav";

export function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("Монгол");

  const sections = [
    {
      title: "Тохиргоо",
      items: [
        {
          icon: Bell,
          iconBg: "#FFF1E7",
          iconColor: "#F47C20",
          label: "Мэдэгдэл",
          desc: "Автобусны хоцрогдол, мэдэгдэл",
          toggle: notifications,
          onToggle: () => setNotifications(!notifications),
        },
        {
          icon: Globe,
          iconBg: "#EAF2FF",
          iconColor: "#2563EB",
          label: "Хэл",
          desc: language,
          arrow: true,
        },
        {
          icon: Moon,
          iconBg: "#F3EEFF",
          iconColor: "#7C3AED",
          label: "Харанхуй горим",
          desc: "Тун удахгүй...",
          toggle: darkMode,
          onToggle: () => setDarkMode(!darkMode),
          disabled: true,
        },
      ],
    },
    {
      title: "Тусламж",
      items: [
        {
          icon: HelpCircle,
          iconBg: "#EAF8EF",
          iconColor: "#16A34A",
          label: "FAQ / Тусламж",
          desc: "Түгээмэл асуулт, хариулт",
          arrow: true,
        },
        {
          icon: MessageSquare,
          iconBg: "#FFF1E7",
          iconColor: "#F47C20",
          label: "Санал, гомдол",
          desc: "Бидэнтэй холбогдох",
          arrow: true,
        },
      ],
    },
    {
      title: "Аппын тухай",
      items: [
        {
          icon: Info,
          iconBg: "#EAF2FF",
          iconColor: "#2563EB",
          label: "Аппын тухай",
          desc: "Хувилбар 2.1.0",
          arrow: true,
        },
        {
          icon: Shield,
          iconBg: "#F7F8FA",
          iconColor: "#6B7280",
          label: "Нууцлалын бодлого",
          desc: "Мэдээлэл хамгаалалт",
          arrow: true,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col" style={{ height: "100%", background: "#F7F8FA" }}>
      <div style={{ height: 44, background: "#fff" }} />
      <AppBar title={"\u0411\u0443\u0441\u0430\u0434"} showBack />

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6" style={{ scrollbarWidth: "none" }}>
        {/* Profile card */}
        <div style={{ background: "linear-gradient(135deg, #F47C20 0%, #DD6D17 100%)", borderRadius: 20, padding: "20px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div className="flex items-center gap-3 relative z-10">
            <div style={{ width: 56, height: 56, borderRadius: 18, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={28} style={{ color: "#fff" }} />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Зочин хэрэглэгч</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>Нэвтрэх эсвэл бүртгүүлэх</div>
            </div>
          </div>
          <button
            style={{
              marginTop: 16,
              width: "100%",
              height: 40,
              borderRadius: 999,
              background: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              color: "#F47C20",
              position: "relative",
              zIndex: 10,
            }}
          >
            Нэвтрэх / Бүртгүүлэх
          </button>
        </div>

        {/* Settings sections */}
        {sections.map(section => (
          <div key={section.title} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              {section.title}
            </div>
            <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #F1F3F6" }}>
              {section.items.map((item: any, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 16px",
                      background: "none",
                      border: "none",
                      borderBottom: i < section.items.length - 1 ? "1px solid #F7F8FA" : "none",
                      cursor: item.disabled ? "default" : "pointer",
                      textAlign: "left",
                      opacity: item.disabled ? 0.6 : 1,
                    }}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: item.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={20} style={{ color: item.iconColor }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 1 }}>{item.desc}</div>
                    </div>
                    {item.toggle !== undefined ? (
                      <div
                        onClick={e => { e.stopPropagation(); if (!item.disabled) item.onToggle(); }}
                        style={{
                          width: 44, height: 24, borderRadius: 999,
                          background: item.toggle ? "#F47C20" : "#E5E7EB",
                          position: "relative",
                          cursor: item.disabled ? "default" : "pointer",
                          transition: "background 0.2s",
                          flexShrink: 0,
                        }}
                      >
                        <div style={{
                          position: "absolute",
                          top: 2,
                          left: item.toggle ? 22 : 2,
                          width: 20, height: 20,
                          borderRadius: "50%",
                          background: "#fff",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                          transition: "left 0.2s",
                        }} />
                      </div>
                    ) : item.arrow ? (
                      <ChevronRight size={16} style={{ color: "#D1D5DB" }} />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* App version */}
        <div style={{ textAlign: "center", paddingBottom: 8 }}>
          <div style={{ fontSize: 12, color: "#9CA3AF" }}>UB Smart Bus</div>
          <div style={{ fontSize: 11, color: "#D1D5DB", marginTop: 2 }}>Хувилбар 2.1.0 • © 2025 УБТС ОНӨААТҮГ</div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

