export const tokens = {
  colors: {
    background: "#0e0e11",
    surface: "#17171d",
    surfaceHover: "#1d1d25",
    text: "#e8e8ea",
    muted: "#9a9aa4",
    primary: "#6c5ce7",
    primaryHover: "#7d6ef0",
    accent: "#a855f7",
    border: "#2a2a32",
    white: "#fff",
  },
  gradient: {
    primary: "linear-gradient(135deg, #6c5ce7 0%, #a855f7 100%)",
  },
  space: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2.5rem",
    xxl: "4rem",
  },
  radius: { sm: "0.375rem", md: "0.75rem", lg: "1.25rem", pill: "999px" },
  shadow: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
    md: "0 8px 24px rgba(0, 0, 0, 0.35)",
    lg: "0 18px 48px rgba(0, 0, 0, 0.5)",
  },
  font: {
    family: "'Inter', system-ui, sans-serif",
    size: { sm: "0.875rem", md: "1rem", lg: "1.25rem", xl: "2rem" },
    weight: { regular: 400, medium: 500, bold: 700 },
  },
  breakpoints: { tablet: "768px", desktop: "1024px" },
} as const;
