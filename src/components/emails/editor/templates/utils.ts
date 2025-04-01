
/**
 * Adjusts a color's brightness by the given amount
 * @param color The color in hex format (e.g. #RRGGBB)
 * @param amount Amount to adjust brightness (-255 to 255)
 * @returns Adjusted color in hex format
 */
export const adjustColor = (color: string, amount: number): string => {
  // Only support hex colors for simplicity
  if (!color.startsWith('#')) return color;
  
  let hex = color.slice(1);
  
  // Convert to RGB
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);
  
  // Adjust the brightness
  r = Math.min(255, Math.max(0, r + amount));
  g = Math.min(255, Math.max(0, g + amount));
  b = Math.min(255, Math.max(0, b + amount));
  
  // Convert back to hex
  const newHex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  return `#${newHex}`;
};
