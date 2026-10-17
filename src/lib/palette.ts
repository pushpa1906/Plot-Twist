export interface PaletteColor {
  name: string
  hex: string
}

// Six book-themed accent colors the marketer can choose from.
export const PALETTE: readonly PaletteColor[] = [
  { name: 'Library Burgundy', hex: '#7f1d1d' },
  { name: 'Forest Green', hex: '#166534' },
  { name: 'Midnight Blue', hex: '#1e3a8a' },
  { name: 'Parchment Gold', hex: '#fbbf24' },
  { name: 'Plum Ink', hex: '#6b21a8' },
  { name: 'Teal Cover', hex: '#0f766e' },
]
