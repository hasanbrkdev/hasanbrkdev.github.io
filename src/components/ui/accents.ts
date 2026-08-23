// Full class strings so Tailwind's JIT can see them. Dark editorial palette.
export type AccentName = 'amber' | 'moss' | 'skyblue' | 'rose' | 'gold'

export const accentStyles: Record<
  AccentName,
  { chip: string; dot: string; text: string; soft: string; stroke: string }
> = {
  amber: {
    chip: 'bg-amber/15 text-amber',
    dot: 'bg-amber',
    text: 'text-amber',
    soft: 'bg-amber/10',
    stroke: '#E8A44C',
  },
  moss: {
    chip: 'bg-moss/15 text-moss',
    dot: 'bg-moss',
    text: 'text-moss',
    soft: 'bg-moss/10',
    stroke: '#8FA98B',
  },
  skyblue: {
    chip: 'bg-skyblue/15 text-skyblue',
    dot: 'bg-skyblue',
    text: 'text-skyblue',
    soft: 'bg-skyblue/10',
    stroke: '#7FAEA3',
  },
  rose: {
    chip: 'bg-rose/15 text-rose',
    dot: 'bg-rose',
    text: 'text-rose',
    soft: 'bg-rose/10',
    stroke: '#D98E73',
  },
  gold: {
    chip: 'bg-gold/15 text-gold',
    dot: 'bg-gold',
    text: 'text-gold',
    soft: 'bg-gold/10',
    stroke: '#D9B96E',
  },
}
