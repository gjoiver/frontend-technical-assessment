export const tokens = {
  colors: {
    background: "#0e0e11",
    surface: "#17171d",
    text: "#e8e8ea",
    muted: "#9a9aa4",
    primary: "#6c5ce7",
    border: "#2a2a32",
    white: "#fff",
  },
  space: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2.5rem",
  },
  radius: { sm: "0.375rem", md: "0.75rem", lg: "1.25rem" },
  font: {
    family: "'Inter', system-ui, sans-serif",
    size: { sm: "0.875rem", md: "1rem", lg: "1.25rem", xl: "2rem" },
    weight: { regular: 400, medium: 500, bold: 700 },
  },
  breakpoints: { tablet: "768px", desktop: "1024px" },
} as const;
