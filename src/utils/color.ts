// Convert hex color to HSL and return lighter/darker variants for gradient stops
function hexToHSL(hex: string) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToString(h: number, s: number, l: number) {
  return `hsl(${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
}

export function generateGradient(colorHex: string): string {
  const { h, s, l } = hexToHSL(colorHex);
  // Create 3 stops: lighter, base, darker
  return `linear-gradient(135deg, ${hslToString(h, s, Math.min(l + 20, 90))}, ${hslToString(h, s, l)}, ${hslToString(h, s, Math.max(l - 20, 10))})`;
}
