// Full class strings so Tailwind's JIT can see them.
export type AccentName = 'terracotta' | 'sage' | 'sky' | 'peach' | 'butter'

export const accentStyles: Record<
  AccentName,
  { chip: string; dot: string; text: string; soft: string }
> = {
  terracotta: {
    chip: 'bg-terracotta/15 text-terracotta',
    dot: 'bg-terracotta',
    text: 'text-terracotta',
    soft: 'bg-terracotta/10',
  },
  sage: {
    chip: 'bg-sage/20 text-sage',
    dot: 'bg-sage',
    text: 'text-sage',
    soft: 'bg-sage/10',
  },
  sky: {
    chip: 'bg-sky/25 text-sky',
    dot: 'bg-sky',
    text: 'text-sky',
    soft: 'bg-sky/10',
  },
  peach: {
    chip: 'bg-peach/25 text-terracotta',
    dot: 'bg-peach',
    text: 'text-terracotta',
    soft: 'bg-peach/10',
  },
  butter: {
    chip: 'bg-butter/30 text-ink-soft',
    dot: 'bg-butter',
    text: 'text-ink-soft',
    soft: 'bg-butter/15',
  },
}
