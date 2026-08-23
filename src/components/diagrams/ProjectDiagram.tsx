import { motion, useReducedMotion } from 'framer-motion'
import { accentStyles, type AccentName } from '../ui/accents'

// Editorial animated process diagrams (diagram-design skill principles):
// the static frame is complete — all nodes, labels and connectors are visible
// content; motion is a staggered reveal plus one decorative flow token.

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
  /** Fixed path for the decorative flow token (aria-hidden). */
  tokenPath?: string
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
      { id: 'assemble', x: 422, y: 78, w: 116, label: 'Assemble', sub: 'Remotion · FFmpeg' },
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
    tokenPath:
      'M 12 100 L 122 100 C 244 100, 146 40, 268 40 L 376 40 C 500 40, 400 100, 480 100 L 630 100',
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
    tokenPath: 'M 12 100 L 630 100',
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
    tokenPath: 'M 12 80 L 630 80',
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
    tokenPath: 'M 12 80 L 530 80',
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
    const dip = y1 + 40
    return `M ${x1} ${y1} C ${x1} ${dip}, ${x2} ${dip}, ${x2} ${y2 + 4}`
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
  const maxY = Math.max(
    ...spec.nodes.map((n) => n.y + NODE_H),
    ...spec.edges.filter((e) => e.loopback).map((e) => nodeById(spec, e.from).y + NODE_H + 48),
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
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#EFEEE9" opacity="0.45" />
        </marker>
      </defs>

      {spec.edges.map((edge, i) => (
        <g key={`${edge.from}-${edge.to}`}>
          <motion.path
            d={edgePath(spec, edge)}
            fill="none"
            stroke="#EFEEE9"
            strokeOpacity={0.3}
            strokeWidth={1.5}
            strokeDasharray={edge.dashed ? '4 5' : undefined}
            markerEnd={`url(#arrow-${projectId})`}
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
          />
          {edge.label && (
            <text
              x={(nodeById(spec, edge.from).x + nodeById(spec, edge.to).x + nodeById(spec, edge.to).w) / 2}
              y={nodeById(spec, edge.from).y + NODE_H + 36}
              textAnchor="middle"
              fill="#EFEEE9"
              opacity="0.45"
              fontSize="10"
              fontStyle="italic"
            >
              {edge.label}
            </text>
          )}
        </g>
      ))}

      {spec.nodes.map((node, i) => (
        <motion.g
          key={node.id}
          initial={reduced ? false : { opacity: 0.12, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
        >
          <rect
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
          <text
            x={node.x + node.w / 2}
            y={node.y + (node.sub ? 19 : 26)}
            textAnchor="middle"
            fill="#EFEEE9"
            opacity={node.redacted ? 0.35 : 0.95}
            fontSize="11.5"
            fontWeight="700"
          >
            {node.label}
          </text>
          {node.sub && (
            <text
              x={node.x + node.w / 2}
              y={node.y + 33}
              textAnchor="middle"
              fill="#EFEEE9"
              opacity="0.45"
              fontSize="9"
            >
              {node.sub}
            </text>
          )}
        </motion.g>
      ))}

      {/* Decorative flow token — one per figure, quiet loop */}
      {spec.tokenPath && !reduced && (
        <circle r={3.5} fill={stroke} aria-hidden="true" focusable="false">
          <animateMotion dur="5s" repeatCount="indefinite" path={spec.tokenPath} />
        </circle>
      )}
    </svg>
  )
}
