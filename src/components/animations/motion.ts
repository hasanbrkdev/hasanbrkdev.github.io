import type React from 'react'
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_PANEL = [0.2, 0.7, 0.2, 1] as const
export const EASE_INOUT = [0.76, 0, 0.24, 1] as const
export const VIEWPORT = { once: true, margin: '-80px' } as const

/** Kart/A4 tilt. Hook'lar koşulsuz çağrılır; guard handler içindedir. */
export function useTilt(max = 3) {
  const reduced = useReducedMotion()
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 })
  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max)
  }
  function onPointerLeave() {
    rx.set(0)
    ry.set(0)
  }
  return { rotateX: rx, rotateY: ry, onPointerMove, onPointerLeave }
}
