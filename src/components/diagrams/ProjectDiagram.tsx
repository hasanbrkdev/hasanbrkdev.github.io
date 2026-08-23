import { motion, useReducedMotion } from 'framer-motion'
import { accentStyles, type AccentName } from '../ui/accents'

// Editorial animated process diagrams (diagram-design skill principles):
// the static frame is complete — all nodes, labels and connectors are visible
// content. Motion is narrative: boxes appear in flow order, each arrow draws
// from its source box, and a small accent pulse travels solid edges (CSS
// dash-flow). Dashed revision edges drift backward; nothing orbits the figure.

interface DiagramNode {
  id: string
  x: number
  y: number
  w: number
  label: string
  sub?: string
  redacted?: boolean
}

interface DiagramEdge {
  from: string
  to: string
  dashed?: boolean
  loopback?: boolean
  label?: string
}

interface DiagramSpec {
  title: string
  nodes: DiagramNode[]
  edges: DiagramEdge[]
}

const NODE_H = 44

const DIAGRAMS: Record<string, DiagramSpec> = {
  lumos: {
    title: 'Lumos pipeline: topic to published video, no human in the loop',
    nodes: [
      { id: 'topic', x: 8, y: 78, w: 78, label: 'Topic' },
      { id: 'script', x: 126, y: 78, w: 96, label: 'Script', sub: 'LLM' },
      { id: 'narration', x: 268, y: 18, w: 108, label: 'Narration', sub: 'TTS' },
      { id: 'visuals', x: 268, y: 138, w: 108, label: 'Visuals', sub: 'gen video' },
      { id: 'assemble', x: 410, y: 78, w: 136, label: 'Assemble', sub: 'Remotion · FFmpeg' },
      { id: 'publish', x: 566, y: 78, w: 68, label: 'Publish' },
    ],
    edges: [
      { from: 'topic', to: 'script' },
      { from: 'script', to: 'narration' },
      { from: 'script', to: 'visuals' },
      { from: 'narration', to: 'assemble' },
      { from: 'visuals', to: 'assemble' },
      { from: 'assemble', to: 'publish' },
    ],
  },
  gia: {
    title: 'GIA visitor journey: entering a digital exhibition',
    nodes: [
      { id: 'enter', x: 8, y: 78, w: 88, label: 'Enter', sub: 'landing' },
      { id: 'wander', x: 168, y: 78, w: 116, label: 'Wander', sub: '3D exhibition' },
      { id: 'discover', x: 356, y: 78, w: 116, label: 'Discover', sub: 'curated work' },
      { id: 'reach', x: 544, y: 78, w: 90, label: 'Reach out' },
    ],
    edges: [
      { from: 'enter', to: 'wander' },
      { from: 'wander', to: 'discover' },
      { from: 'discover', to: 'reach' },
    ],
  },
  carousel: {
    title: 'Carousel platform: brief to published campaign with approval loop',
    nodes: [
      { id: 'brief', x: 8, y: 58, w: 76, label: 'Brief' },
      { id: 'queue', x: 122, y: 58, w: 92, label: 'Queue', sub: 'Supabase' },
      { id: 'generate', x: 252, y: 58, w: 104, label: 'Generate', sub: 'Claude skill' },
      { id: 'render', x: 394, y: 58, w: 96, label: 'Render', sub: 'Remotion' },
      { id: 'approve', x: 528, y: 58, w: 104, label: 'Approve', sub: 'publish' },
    ],
    edges: [
      { from: 'brief', to: 'queue' },
      { from: 'queue', to: 'generate' },
      { from: 'generate', to: 'render' },
      { from: 'render', to: 'approve' },
      { from: 'approve', to: 'generate', loopback: true, dashed: true, label: 'revise' },
    ],
  },
  reconchille: {
    title: 'Reconchille delivery loop: design, build, test, release',
    nodes: [
      { id: 'design', x: 8, y: 58, w: 92, label: 'Design' },
      { id: 'build', x: 148, y: 58, w: 92, label: 'Build' },
      { id: 'testflight', x: 288, y: 58, w: 108, label: 'TestFlight', sub: 'studio feedback' },
      { id: 'release', x: 444, y: 58, w: 92, label: 'Release', sub: 'production' },
    ],
    edges: [
      { from: 'design', to: 'build' },
      { from: 'build', to: 'testflight' },
      { from: 'testflight', to: 'release' },
      { from: 'testflight', to: 'build', loopback: true, dashed: true, label: 'iterate' },
    ],
  },
  qplace: {
    title: 'QPlace: select ≠ hydrate — the model picks widgets, deterministic code fills them',
    nodes: [
      { id: 'question', x: 8, y: 78, w: 92, label: 'Question', sub: 'intent' },
      { id: 'router', x: 140, y: 78, w: 92, label: 'Router', sub: 'on-device' },
      { id: 'select', x: 276, y: 18, w: 110, label: 'Select', sub: 'LLM · widgets' },
      { id: 'hydrate', x: 276, y: 138, w: 110, label: 'Hydrate', sub: 'deterministic' },
      { id: 'validate', x: 428, y: 78, w: 104, label: 'Validate', sub: 'gates' },
      { id: 'screen', x: 568, y: 78, w: 64, label: 'Screen' },
    ],
    edges: [
      { from: 'question', to: 'router' },
      { from: 'router', to: 'select' },
      { from: 'router', to: 'hydrate' },
      { from: 'select', to: 'validate' },
      { from: 'hydrate', to: 'validate' },
      { from: 'validate', to: 'screen' },
    ],
  },
  traveler: {
    title: 'TravelerApp discovery: a plain-language wish becomes grounded places',
    nodes: [
      { id: 'wish', x: 8, y: 58, w: 88, label: 'Wish', sub: 'natural ask' },
      { id: 'structure', x: 148, y: 58, w: 116, label: 'Structure', sub: 'Gemini · schema' },
      { id: 'ground', x: 316, y: 58, w: 112, label: 'Ground', sub: 'Google Places' },
      { id: 'surface', x: 480, y: 58, w: 100, label: 'Surface', sub: 'open now' },
    ],
    edges: [
      { from: 'wish', to: 'structure' },
      { from: 'structure', to: 'ground' },
      { from: 'ground', to: 'surface' },
    ],
  },
  koi: {
    title: 'Koi Academy: process details are under NDA',
    nodes: [
      { id: 'a', x: 40, y: 78, w: 110, label: '████████', redacted: true },
      { id: 'b', x: 250, y: 78, w: 130, label: '██████████', sub: 'confidential', redacted: true },
      { id: 'c', x: 480, y: 78, w: 110, label: '████████', redacted: true },
    ],
    edges: [
      { from: 'a', to: 'b', dashed: true },
      { from: 'b', to: 'c', dashed: true },
    ],
  },
}

export function hasDiagram(projectId: string): boolean {
  return projectId in DIAGRAMS
}

function nodeById(spec: DiagramSpec, id: string): DiagramNode {
  const node = spec.nodes.find((n) => n.id === id)
  if (!node) throw new Error(`diagram node missing: ${id}`)
  return node
}

function edgePath(spec: DiagramSpec, edge: DiagramEdge): string {
  const from = nodeById(spec, edge.from)
  const to = nodeById(spec, edge.to)
  if (edge.loopback) {
    const x1 = from.x + from.w / 2
    const y1 = from.y + NODE_H
    const x2 = to.x + to.w / 2
    const y2 = to.y + NODE_H
    const dip = y1 + 36
    return `M ${x1} ${y1} C ${x1} ${dip}, ${x2} ${dip}, ${x2} ${y2 + 6}`
  }
  const x1 = from.x + from.w
  const y1 = from.y + NODE_H / 2
  const x2 = to.x
  const y2 = to.y + NODE_H / 2
  const mid = (x1 + x2) / 2
  if (y1 === y2) return `M ${x1} ${y1} L ${x2 - 4} ${y2}`
  return `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2 - 4} ${y2}`
}

interface ProjectDiagramProps {
  projectId: string
  accent: AccentName
}

export function ProjectDiagram({ projectId, accent }: ProjectDiagramProps) {
  const spec = DIAGRAMS[projectId]
  const reduced = useReducedMotion()
  if (!spec) return null
  const stroke = accentStyles[accent].stroke
  const nodeIndex = new Map(spec.nodes.map((n, i): [string, number] => [n.id, i]))
  const maxY = Math.max(
    ...spec.nodes.map((n) => n.y + NODE_H),
    ...spec.edges.filter((e) => e.loopback).map((e) => nodeById(spec, e.from).y + NODE_H + 64),
  )

  return (
    <svg
      viewBox={`0 0 640 ${maxY + 12}`}
      className="w-full"
      role="img"
      aria-label={spec.title}
    >
      <title>{spec.title}</title>
      <defs>
        <marker
          id={`arrow-${projectId}`}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M 0 0 L 8 4 L 0 8 z" fill={stroke} opacity="0.6" />
        </marker>
      </defs>

      {spec.edges.map((edge) => {
        const sourceIndex = nodeIndex.get(edge.from) ?? 0
        const delay = 0.24 + sourceIndex * 0.16
        const d = edgePath(spec, edge)
        return (
          <g key={`${edge.from}-${edge.to}`}>
            {edge.dashed ? (
              <motion.path
                d={d}
                fill="none"
                className="diagram-dash"
                stroke={stroke}
                strokeOpacity={0.55}
                strokeWidth={1.5}
                strokeDasharray="4 5"
                markerEnd={`url(#arrow-${projectId})`}
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay, ease: 'easeOut' }}
              />
            ) : (
              <motion.path
                d={d}
                fill="none"
                stroke="#EFEEE9"
                strokeOpacity={0.32}
                strokeWidth={1.5}
                markerEnd={`url(#arrow-${projectId})`}
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay, ease: 'easeOut' }}
              />
            )}
            {!edge.dashed && !reduced && (
              <motion.g
                aria-hidden="true"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: sourceIndex * 0.16 + 0.9 }}
              >
                <path
                  d={d}
                  fill="none"
                  className="edge-flow"
                  stroke={stroke}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  style={{ animationDelay: `${sourceIndex * 0.45}s` }}
                />
              </motion.g>
            )}
            {edge.label &&
              (() => {
                const from = nodeById(spec, edge.from)
                const to = nodeById(spec, edge.to)
                const x1 = from.x + from.w / 2
                const x2 = to.x + to.w / 2
                const dip = from.y + NODE_H + 36
                return (
                  <text
                    x={(x1 + x2) / 2}
                    y={dip + 16}
                    textAnchor="middle"
                    fill="#EFEEE9"
                    opacity={0.55}
                    fontSize={12}
                    fontFamily='"Instrument Serif", serif'
                    fontStyle="italic"
                    stroke="#121211"
                    strokeWidth={4}
                    paintOrder="stroke"
                  >
                    {edge.label}
                  </text>
                )
              })()}
          </g>
        )
      })}

      {spec.nodes.map((node, i) => (
        <motion.g
          key={node.id}
          className="dg-node"
          tabIndex={0}
          initial={reduced ? false : { opacity: 0, scale: 0.94, y: 6 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: i * 0.16, ease: 'easeOut' }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <title>
            {node.label}
            {node.sub ? ` — ${node.sub}` : ''}
          </title>
          <rect
            className="dg-glow"
            x={node.x - 4}
            y={node.y - 4}
            width={node.w + 8}
            height={NODE_H + 8}
            rx={12}
            fill={stroke}
            opacity={0}
          />
          <rect
            x={node.x}
            y={node.y + 3}
            width={node.w}
            height={NODE_H}
            rx={8}
            fill="#0B0B0A"
            opacity={0.45}
          />
          <rect
            className="dg-box"
            x={node.x}
            y={node.y}
            width={node.w}
            height={NODE_H}
            rx={8}
            fill="#1C1B18"
            stroke={node.redacted ? '#EFEEE9' : stroke}
            strokeOpacity={node.redacted ? 0.25 : 0.7}
            strokeWidth={1.5}
            strokeDasharray={node.redacted ? '3 4' : undefined}
          />
          <line
            x1={node.x + 1}
            x2={node.x + node.w - 1}
            y1={node.y + 0.75}
            y2={node.y + 0.75}
            stroke="#EFEEE9"
            strokeOpacity={0.08}
          />
          {node.redacted ? (
            <motion.text
              x={node.x + node.w / 2}
              y={node.y + (node.sub ? 20 : 27)}
              textAnchor="middle"
              fill="#EFEEE9"
              fontSize={13}
              fontWeight={600}
              animate={reduced ? { opacity: 0.35 } : { opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            >
              {node.label}
            </motion.text>
          ) : (
            <text
              x={node.x + node.w / 2}
              y={node.y + (node.sub ? 20 : 27)}
              textAnchor="middle"
              fill="#EFEEE9"
              opacity={0.95}
              fontSize={13}
              fontWeight={600}
            >
              {node.label}
            </text>
          )}
          {node.sub && (
            <text
              x={node.x + node.w / 2}
              y={node.y + 34}
              textAnchor="middle"
              fill="#EFEEE9"
              opacity={0.45}
              fontSize={10}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              letterSpacing="0.08em"
              style={{ textTransform: 'uppercase' }}
            >
              {node.sub}
            </text>
          )}
        </motion.g>
      ))}
    </svg>
  )
}
