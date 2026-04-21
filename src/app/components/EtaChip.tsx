interface EtaChipProps {
  minutes: number;
}

export function EtaChip({ minutes }: EtaChipProps) {
  let bg = "#EAF8EF";
  let color = "#16A34A";

  if (minutes >= 4 && minutes <= 8) {
    bg = "#FFF1E7";
    color = "#F47C20";
  } else if (minutes >= 9) {
    bg = "#EAF2FF";
    color = "#2563EB";
  }

  return (
    <span
      style={{
        background: bg,
        color,
        borderRadius: 999,
        padding: "3px 10px",
        fontSize: 13,
        fontWeight: 600,
        lineHeight: "18px",
        whiteSpace: "nowrap",
      }}
    >
      {minutes} мин
    </span>
  );
}
