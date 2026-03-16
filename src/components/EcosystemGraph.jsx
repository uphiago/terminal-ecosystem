import { useCallback, useEffect, useState } from 'react'
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useLang } from '../LanguageContext'
import './EcosystemGraph.css'

const CATEGORY_COLORS = {
  emulator:    '#58a6ff',
  multiplexer: '#bc8cff',
  shell:       '#3fb950',
  framework:   '#ff9442',
  cli:         '#39d353',
  kernel:      '#f85149',
}

const TOOL_LINKS = {
  'Alacritty':     'https://github.com/alacritty/alacritty',
  'Kitty':         'https://github.com/kovidgoyal/kitty',
  'WezTerm':       'https://github.com/wez/wezterm',
  'Win Terminal':  'https://github.com/microsoft/terminal',
  'iTerm2':        'https://github.com/gnachman/iTerm2',
  'tmux':          'https://github.com/tmux/tmux',
  'zellij':        'https://github.com/zellij-org/zellij',
  'zsh':           'https://www.zsh.org/',
  'bash':          'https://www.gnu.org/software/bash/',
  'fish':          'https://github.com/fish-shell/fish-shell',
  'PowerShell':    'https://github.com/PowerShell/PowerShell',
  'Oh My Zsh':     'https://github.com/ohmyzsh/ohmyzsh',
  'Prezto':        'https://github.com/sorin-ionescu/prezto',
  'Starship':      'https://github.com/starship/starship',
  'Powerlevel10k': 'https://github.com/romkatv/powerlevel10k',
  'git':           'https://github.com/git/git',
  'docker':        'https://github.com/docker/docker-ce',
  'kubectl':       'https://github.com/kubernetes/kubectl',
  'vim/nvim':      'https://github.com/neovim/neovim',
  'ripgrep':       'https://github.com/BurntSushi/ripgrep',
  'terraform':     'https://github.com/hashicorp/terraform',
}

const NODE_DESCS = {
  en: {
    user:        '👤 User',
    tmux:        'sessions + splits',
    zellij:      'Rust, modern',
    zsh:         'most popular',
    bash:        'universal',
    fish:        'friendly',
    psh:         'Windows/cross',
    omz:         'plugins + themes',
    prezto:      'faster',
    starship:    'cross-shell prompt',
    p10k:        'zsh theme',
    git:         'version control',
    docker:      'containers',
    kubectl:     'kubernetes',
    vim:         'editor',
    ripgrep:     'fast search',
    terraform:   'infra as code',
  },
  'pt-BR': {
    user:        '👤 Usuário',
    tmux:        'sessões + splits',
    zellij:      'Rust, moderno',
    zsh:         'mais popular',
    bash:        'universal',
    fish:        'friendly',
    psh:         'Windows/cross',
    omz:         'plugins + temas',
    prezto:      'mais rápido',
    starship:    'cross-shell prompt',
    p10k:        'tema zsh',
    git:         'versionamento',
    docker:      'containers',
    kubectl:     'kubernetes',
    vim:         'editor',
    ripgrep:     'busca rápida',
    terraform:   'infra as code',
  },
}

function row(count, nodeW = 160, gap = 20) {
  const total = count * nodeW + (count - 1) * gap
  const startX = (1060 - total) / 2
  return Array.from({ length: count }, (_, i) => startX + i * (nodeW + gap))
}

const ROW = { emulator: 160, multiplexer: 320, shell: 480, framework: 640, cli: 800, kernel: 960 }
const eX = row(5)
const mX = row(2, 180, 40)
const sX = row(4, 170, 20)
const fX = row(4, 170, 20)
const cX = row(6, 150, 16)

function buildNodes(lang) {
  const d = NODE_DESCS[lang] || NODE_DESCS.en
  return [
    { id: 'user', type: 'category', position: { x: 430, y: 0 },
      data: { label: d.user, category: 'kernel' } },

    { id: 'alacritty', type: 'tool', position: { x: eX[0], y: ROW.emulator },
      data: { label: 'Alacritty', category: 'emulator', desc: 'GPU-accelerated' } },
    { id: 'kitty', type: 'tool', position: { x: eX[1], y: ROW.emulator },
      data: { label: 'Kitty', category: 'emulator', desc: 'GPU + protocols' } },
    { id: 'wezterm', type: 'tool', position: { x: eX[2], y: ROW.emulator },
      data: { label: 'WezTerm', category: 'emulator', desc: 'Lua config' } },
    { id: 'iterm', type: 'tool', position: { x: eX[3], y: ROW.emulator },
      data: { label: 'iTerm2', category: 'emulator', desc: 'macOS' } },
    { id: 'wt', type: 'tool', position: { x: eX[4], y: ROW.emulator },
      data: { label: 'Win Terminal', category: 'emulator', desc: 'Windows' } },

    { id: 'tmux', type: 'tool', position: { x: mX[0], y: ROW.multiplexer },
      data: { label: 'tmux', category: 'multiplexer', desc: d.tmux } },
    { id: 'zellij', type: 'tool', position: { x: mX[1], y: ROW.multiplexer },
      data: { label: 'zellij', category: 'multiplexer', desc: d.zellij } },

    { id: 'zsh', type: 'tool', position: { x: sX[0], y: ROW.shell },
      data: { label: 'zsh', category: 'shell', desc: d.zsh } },
    { id: 'bash', type: 'tool', position: { x: sX[1], y: ROW.shell },
      data: { label: 'bash', category: 'shell', desc: d.bash } },
    { id: 'fish', type: 'tool', position: { x: sX[2], y: ROW.shell },
      data: { label: 'fish', category: 'shell', desc: d.fish } },
    { id: 'psh', type: 'tool', position: { x: sX[3], y: ROW.shell },
      data: { label: 'PowerShell', category: 'shell', desc: d.psh } },

    { id: 'omz', type: 'tool', position: { x: fX[0], y: ROW.framework },
      data: { label: 'Oh My Zsh', category: 'framework', desc: d.omz } },
    { id: 'prezto', type: 'tool', position: { x: fX[1], y: ROW.framework },
      data: { label: 'Prezto', category: 'framework', desc: d.prezto } },
    { id: 'starship', type: 'tool', position: { x: fX[2], y: ROW.framework },
      data: { label: 'Starship', category: 'framework', desc: d.starship } },
    { id: 'p10k', type: 'tool', position: { x: fX[3], y: ROW.framework },
      data: { label: 'Powerlevel10k', category: 'framework', desc: d.p10k } },

    { id: 'git', type: 'tool', position: { x: cX[0], y: ROW.cli },
      data: { label: 'git', category: 'cli', desc: d.git } },
    { id: 'docker', type: 'tool', position: { x: cX[1], y: ROW.cli },
      data: { label: 'docker', category: 'cli', desc: d.docker } },
    { id: 'kubectl', type: 'tool', position: { x: cX[2], y: ROW.cli },
      data: { label: 'kubectl', category: 'cli', desc: d.kubectl } },
    { id: 'vim', type: 'tool', position: { x: cX[3], y: ROW.cli },
      data: { label: 'vim/nvim', category: 'cli', desc: d.vim } },
    { id: 'ripgrep', type: 'tool', position: { x: cX[4], y: ROW.cli },
      data: { label: 'ripgrep', category: 'cli', desc: d.ripgrep } },
    { id: 'terraform', type: 'tool', position: { x: cX[5], y: ROW.cli },
      data: { label: 'terraform', category: 'cli', desc: d.terraform } },

    { id: 'kernel', type: 'category', position: { x: 410, y: ROW.kernel },
      data: { label: '◎ Kernel / OS', category: 'kernel' } },
  ]
}

const initialEdges = [
  ...['alacritty','kitty','wezterm','iterm','wt'].map(id => ({
    id: `user-${id}`, source: 'user', target: id,
    style: { stroke: '#58a6ff', strokeWidth: 1, opacity: 0.4 }
  })),
  ...['alacritty','kitty','wezterm','iterm','wt'].map(id => ({
    id: `${id}-tmux`, source: id, target: 'tmux',
    style: { stroke: '#bc8cff', strokeWidth: 1, opacity: 0.3 }
  })),
  ...['alacritty','kitty','wezterm','iterm','wt'].map(id => ({
    id: `${id}-zellij`, source: id, target: 'zellij',
    style: { stroke: '#bc8cff', strokeWidth: 1, opacity: 0.3 }
  })),
  ...['tmux','zellij'].flatMap(mx =>
    ['zsh','bash','fish','psh'].map(sh => ({
      id: `${mx}-${sh}`, source: mx, target: sh,
      style: { stroke: '#3fb950', strokeWidth: 1, opacity: 0.3 }
    }))
  ),
  { id: 'zsh-omz',    source: 'zsh',  target: 'omz',     style: { stroke: '#ff9442', strokeWidth: 1.5, opacity: 0.5 } },
  { id: 'zsh-prezto', source: 'zsh',  target: 'prezto',  style: { stroke: '#ff9442', strokeWidth: 1.5, opacity: 0.5 } },
  { id: 'zsh-p10k',   source: 'zsh',  target: 'p10k',    style: { stroke: '#ff9442', strokeWidth: 1,   opacity: 0.4 } },
  { id: 'bash-star',  source: 'bash', target: 'starship', style: { stroke: '#ff9442', strokeWidth: 1,  opacity: 0.4 } },
  { id: 'fish-star',  source: 'fish', target: 'starship', style: { stroke: '#ff9442', strokeWidth: 1,  opacity: 0.4 } },
  { id: 'psh-star',   source: 'psh',  target: 'starship', style: { stroke: '#ff9442', strokeWidth: 1,  opacity: 0.4 } },
  ...['zsh','bash','fish','psh'].flatMap(sh =>
    ['git','docker','kubectl','vim','ripgrep','terraform'].map(cli => ({
      id: `${sh}-${cli}`, source: sh, target: cli,
      style: { stroke: '#39d353', strokeWidth: 1, opacity: 0.2 }
    }))
  ),
  ...['git','docker','kubectl','vim','ripgrep','terraform'].map(cli => ({
    id: `${cli}-kernel`, source: cli, target: 'kernel',
    style: { stroke: '#f85149', strokeWidth: 1, opacity: 0.35 }
  })),
]

function ToolNode({ data }) {
  const color = CATEGORY_COLORS[data.category] || '#7d8590'
  const url = TOOL_LINKS[data.label]
  function handleClick(e) {
    if (url) {
      e.stopPropagation()
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }
  return (
    <div
      className={`tool-node ${url ? 'has-link' : ''}`}
      style={{ '--c': color }}
      onClick={handleClick}
      title={url ? `${data.label} ↗` : data.label}
    >
      <Handle type="target" position={Position.Top} />
      <div className="tool-node-accent" />
      <div className="tool-node-inner">
        <div className="tool-node-name">
          {data.label}
          {url && <span className="node-link-icon">↗</span>}
        </div>
        {data.desc && <div className="tool-node-desc">{data.desc}</div>}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

function CategoryNode({ data }) {
  const color = CATEGORY_COLORS[data.category] || '#7d8590'
  return (
    <div className="cat-node" style={{ '--c': color }}>
      <Handle type="target" position={Position.Top} />
      <div className="cat-node-label">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

const nodeTypes = { tool: ToolNode, category: CategoryNode }

export default function EcosystemGraph() {
  const { lang, t } = useLang()
  const gt = t.graph
  const [nodes, setNodes, onNodesChange] = useNodesState(buildNodes(lang))
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  useEffect(() => {
    setNodes(buildNodes(lang))
  }, [lang])

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  return (
    <section id="graph" className="graph-section">
      <div className="section-label">{gt.label}</div>
      <h2 className="section-title">
        {gt.title} <span>{gt.titleSpan}</span>
      </h2>
      <p className="section-desc">{gt.desc}</p>

      <div className="legend">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div key={cat} className="legend-item">
            <div className="legend-dot" style={{ background: color }} />
            <span className="mono">{cat}</span>
          </div>
        ))}
      </div>

      <div className="graph-container glass-card">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.3}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="rgba(255,255,255,0.04)" gap={24} />
          <Controls />
          <MiniMap
            nodeColor={(n) => CATEGORY_COLORS[n.data?.category] || '#333'}
            maskColor="rgba(7,9,15,0.8)"
            style={{ background: 'rgba(13,17,23,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}
          />
        </ReactFlow>
      </div>
    </section>
  )
}
