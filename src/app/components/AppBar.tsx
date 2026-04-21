import { useNavigate } from "react-router";
import { ArrowLeft, Bell } from "lucide-react";

interface AppBarProps {
  title: string;
  showBack?: boolean;
  rightContent?: React.ReactNode;
  transparent?: boolean;
}

export function AppBar({ title, showBack = false, rightContent, transparent = false }: AppBarProps) {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center px-4"
      style={{
        height: 56,
        background: transparent ? "transparent" : "#fff",
        borderBottom: transparent ? "none" : "1px solid #F1F3F6",
        position: "sticky",
        top: 44,
        zIndex: 40,
      }}
    >
      {showBack ? (
        <button
          className="flex items-center justify-center rounded-full"
          style={{ width: 40, height: 40, background: "#F7F8FA", border: "none", cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} style={{ color: "#111827" }} />
        </button>
      ) : (
        <div style={{ width: 40 }} />
      )}

      <span
        className="flex-1 text-center"
        style={{ fontSize: 18, fontWeight: 600, color: "#111827", lineHeight: "24px" }}
      >
        {title}
      </span>

      {rightContent || (
        <button
          className="flex items-center justify-center rounded-full"
          style={{ width: 40, height: 40, background: "#F7F8FA", border: "none", cursor: "pointer" }}
        >
          <Bell size={20} style={{ color: "#6B7280" }} />
        </button>
      )}
    </div>
  );
}