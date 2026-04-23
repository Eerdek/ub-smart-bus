import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { BottomNav } from "../components/BottomNav";
import { Info, CreditCard, Banknote, Users, FileText } from "lucide-react";

const tabs = [
  { id: "card", label: "Карт", icon: CreditCard },
  { id: "cash", label: "Бэлэн", icon: Banknote },
  { id: "discount", label: "Хөнгөлөлт", icon: Users },
  { id: "terms", label: "Нөхцөл", icon: FileText },
];

const cardFares = [
  { type: "Насанд хүрэгч", card: "UB Citizen Card", price: "500₮", note: "Ердийн тариф" },
  { type: "Оюутан", card: "Оюутны карт", price: "300₮", note: "Оюутны карт байх шаардлагатай" },
  { type: "Ахмад настан", card: "Хөнгөлөлтийн карт", price: "200₮", note: "65+ нас, тусгай баримт" },
  { type: "Хөгжлийн бэрхшээлтэй", card: "Хөнгөлөлтийн карт", price: "0₮", note: "Тусгай зориулалт" },
];

const cashFares = [
  { type: "Насанд хүрэгч", price: "700₮", note: "Тасалбар авна" },
  { type: "Хүүхэд (6-аас доош)", price: "0₮", note: "Үнэгүй" },
];

const discounts = [
  { category: "Оюутан", discount: "40%", requirement: "Оюутны унэмлэх + Оюутны карт", color: "#2563EB" },
  { category: "Ахмад настан", discount: "60%", requirement: "65+ нас, иргэний үнэмлэх", color: "#16A34A" },
  { category: "Хөгжлийн бэрхшээлтэй", discount: "100%", requirement: "Тусгай хөнгөлөлтийн карт", color: "#7C3AED" },
  { category: "Цэргийн алба хаагч", discount: "50%", requirement: "Цэргийн үнэмлэх", color: "#F47C20" },
];

export function FareScreen() {
  const [activeTab, setActiveTab] = useState("card");

  return (
    <div className="flex flex-col" style={{ height: "100%", background: "#F7F8FA" }}>
      <div style={{ height: 44, background: "#fff" }} />
      <AppBar title="Төлбөрийн мэдээлэл" showBack />

      {/* Tab bar */}
      <div
        className="flex px-4 py-3 gap-2 overflow-x-auto"
        style={{ background: "#fff", borderBottom: "1px solid #F1F3F6", scrollbarWidth: "none" }}
      >
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                height: 36, padding: "0 14px",
                borderRadius: 999,
                border: active ? "none" : "1.5px solid #E2E8F0",
                background: active ? "#F47C20" : "#fff",
                color: active ? "#fff" : "#6B7280",
                fontSize: 13, fontWeight: active ? 600 : 400,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6" style={{ scrollbarWidth: "none" }}>
        {/* Notice box */}
        <div style={{
          background: "#EAF2FF", borderRadius: 14, padding: "12px 14px",
          border: "1px solid #BFDBFE", display: "flex", gap: 10, marginBottom: 16,
        }}>
          <Info size={18} style={{ color: "#2563EB", flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1D4ED8" }}>Анхаарах зүйл</div>
            <div style={{ fontSize: 12, color: "#3B82F6", marginTop: 3, lineHeight: "17px" }}>
              Төлбөрийн нөхцөл, хөнгөлөлтийн ангилал нь картын төрлөөс хамаарч өөр байна.
            </div>
          </div>
        </div>

        {activeTab === "card" && (
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Картын тариф</div>
            <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #F1F3F6" }}>
              {/* Header */}
              <div className="grid grid-cols-3 px-4 py-2.5" style={{ background: "#F7F8FA", borderBottom: "1px solid #F1F3F6" }}>
                {["Зорчигч", "Карт", "Үнэ"].map(h => (
                  <span key={h} style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF" }}>{h}</span>
                ))}
              </div>
              {cardFares.map((f, i) => (
                <div key={i} className="grid grid-cols-3 px-4 py-3.5 items-center" style={{ borderBottom: i < cardFares.length - 1 ? "1px solid #F7F8FA" : "none" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{f.type}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{f.note}</div>
                  </div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{f.card}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#F47C20" }}>{f.price}</div>
                </div>
              ))}
            </div>

            {/* Payment methods */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Төлбөрийн хэрэгслүүд</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "UB Citizen Card", emoji: "💳", color: "#EAF2FF", textColor: "#2563EB" },
                  { name: "Бэлэн мөнгө", emoji: "💵", color: "#FFF1E7", textColor: "#F47C20" },
                ].map(m => (
                  <div key={m.name} style={{ background: "#fff", borderRadius: 14, padding: "14px", border: "1px solid #F1F3F6", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{m.emoji}</div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{m.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "cash" && (
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Бэлэн мөнгөний тариф</div>
            <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #F1F3F6" }}>
              {cashFares.map((f, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-4" style={{ borderBottom: i < cashFares.length - 1 ? "1px solid #F7F8FA" : "none" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{f.type}</div>
                    <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{f.note}</div>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#F47C20" }}>{f.price}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#FDECEC", borderRadius: 14, padding: "12px 14px", border: "1px solid #FCA5A5", marginTop: 14, display: "flex", gap: 10 }}>
              <span>⚠️</span>
              <div style={{ fontSize: 12, color: "#991B1B", lineHeight: "17px" }}>
                Бэлэн мөнгө төлбөр нь картын тарифаас өндөр байна. Хямдралтай хүрэхийн тулд карт ашиглахыг зөвлөж байна.
              </div>
            </div>
          </div>
        )}

        {activeTab === "discount" && (
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Хөнгөлөлтийн ангилал</div>
            <div className="flex flex-col gap-3">
              {discounts.map((d, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "16px", border: "1px solid #F1F3F6" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{d.category}</span>
                    <span style={{ fontSize: 20, fontWeight: 800, color: d.color }}>{d.discount}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: "#F1F3F6", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: d.discount, background: d.color, borderRadius: 999 }} />
                  </div>
                  <div className="flex items-center justify-between" style={{ marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600 }}>0%</span>
                    <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600 }}>100%</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 8 }}>{d.requirement}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "terms" && (
          <div className="flex flex-col gap-3">
            {[
              { title: "Нэг удаагийн дамжлага", body: "Буудал дамжсан тохиолдолд шилжилтийн 30 минутын дотор дахин карт уншуулбал тариф хэрэглэгдэхгүй." },
              { title: "Картын хугацаа", body: "Картын үлдэгдэл дуусмагц дахин цэнэглэх шаардлагатай. Хэрэглэгдэх хугацаа нь картыг олгосон огноосоо 2 жил." },
              { title: "Буцаалт", body: "Алдаагаар дебит хийгдсэн тохиолдолд 72 цагийн дотор ТЕГ-ийн лавлах утас 1800-1888-д мэдэгдэнэ үү." },
              { title: "Карт алдсан үед", body: "Карт алдсан тохиолдолд нэн даруй блоклуулах боломжтой. Утас: 1800-1888." },
            ].map((t, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "16px", border: "1px solid #F1F3F6" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{t.title}</div>
                <div style={{ fontSize: 13, color: "#6B7280", lineHeight: "19px" }}>{t.body}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
