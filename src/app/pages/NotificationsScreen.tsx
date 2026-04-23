import { useState } from "react";
import { Bell, Bus, TriangleAlert, CircleCheck, Clock3 } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { BottomNav } from "../components/BottomNav";

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  type: "alert" | "info" | "eta";
  unread: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "XO:112 чиглэл сааталтай",
    body: "18:00 - 19:30 цагт хөдөлгөөн удаашралтай байна.",
    time: "2 мин өмнө",
    type: "alert",
    unread: true,
  },
  {
    id: "n2",
    title: "Таны дуртай буудал дээр автобус ирлээ",
    body: "Сүхбаатарын талбай буудалд 11 чиглэл ирсэн байна.",
    time: "8 мин өмнө",
    type: "eta",
    unread: true,
  },
  {
    id: "n3",
    title: "Системийн шинэчлэл амжилттай",
    body: "Газрын зураг болон хайлтын хурд сайжирлаа.",
    time: "1 цаг өмнө",
    type: "info",
    unread: false,
  },
];

const metaByType = {
  alert: { icon: TriangleAlert, bg: "#FFF1E7", color: "#F47C20" },
  info: { icon: CircleCheck, bg: "#EAF8EF", color: "#16A34A" },
  eta: { icon: Bus, bg: "#EAF2FF", color: "#2563EB" },
} as const;

export function NotificationsScreen() {
  const [items, setItems] = useState(initialNotifications);

  const unreadCount = items.filter(item => item.unread).length;

  const markAllRead = () => {
    setItems(prev => prev.map(item => ({ ...item, unread: false })));
  };

  return (
    <div className="flex flex-col" style={{ height: "100%", background: "#F7F8FA" }}>
      <div style={{ height: 44, background: "#fff" }} />
      <AppBar title="Мэдэгдэл" showBack showNotification={false} />

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-5" style={{ scrollbarWidth: "none" }}>
        <div
          className="flex items-center justify-between"
          style={{ background: "#fff", border: "1px solid #F1F3F6", borderRadius: 14, padding: "12px 14px", marginBottom: 12 }}
        >
          <div className="flex items-center gap-2">
            <Bell size={16} style={{ color: "#F47C20" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
              {unreadCount} уншаагүй мэдэгдэл
            </span>
          </div>
          <button
            type="button"
            onClick={markAllRead}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#F47C20" }}
          >
            Бүгдийг уншсан болгох
          </button>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #F1F3F6" }}>
          {items.map((item, index) => {
            const meta = metaByType[item.type];
            const Icon = meta.icon;
            return (
              <div
                key={item.id}
                style={{
                  padding: "14px 16px",
                  borderBottom: index < items.length - 1 ? "1px solid #F7F8FA" : "none",
                  background: item.unread ? "#FFFBF8" : "#fff",
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-start gap-3" style={{ flex: 1 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: meta.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} style={{ color: meta.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="flex items-center gap-2">
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{item.title}</div>
                        {item.unread && (
                          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F47C20", flexShrink: 0 }} />
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: "#6B7280", lineHeight: "18px", marginTop: 2 }}>{item.body}</div>
                      <div className="flex items-center gap-1 mt-2">
                        <Clock3 size={12} style={{ color: "#9CA3AF" }} />
                        <span style={{ fontSize: 11, color: "#9CA3AF" }}>{item.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
