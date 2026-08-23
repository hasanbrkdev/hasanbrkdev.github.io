import type { Profile } from './schema'

// Single source of truth for the whole site AND the resume PDF.
// A tailoring workflow edits this file per job application; every change is a
// dedicated `content:` commit so any version can be restored with git.
export const profile: Profile = {
  identity: {
    name: 'Hasan Burak Özdemir',
    firstName: 'Hasan',
    title: 'Software & AI Engineer',
    location: 'İzmir, Turkey (GMT+3)',
    email: 'hasan_burak1999@hotmail.com',
    github: 'https://github.com/hasanbrkdev',
    linkedin: 'https://www.linkedin.com/in/hasan-burak-%C3%B6zdemir-494b002b1/',
  },

  hero: {
    tagline:
      'Hasan is an İzmir-based software & AI engineer building AI-native products — autonomous media pipelines, creative platforms and full-stack systems shaped by an electronics engineer’s eye for architecture.',
    cta: 'See the work',
  },

  about: {
    label: 'About',
    headingSegments: [
      { text: 'I am Hasan Burak,' },
      { text: 'an electronics engineer turned AI builder.', serif: true },
      { text: 'I design systems where models, media and code meet.' },
    ],
    body:
      'Over the last year I have been building AI-native products in an active partnership with Ege Özçelik — from autonomous video-generation pipelines at Lumos to creative platforms like GIA Creative Studio. My electrical engineering background taught me to think in systems; shipping real products taught me to think in users.',
  },

  stats: [
    { value: '7+', label: 'years of hands-on coding' },
    { value: '10+', label: 'products & pipelines built' },
    { value: '30+', label: 'repositories on GitHub' },
  ],

  specialities: [
    {
      id: 'ai-orchestration',
      title: 'AI Orchestration & Agentic Systems',
      blurb: 'Pipelines that think — and run unattended.',
      points: [
        'Agentic workflows built on Claude & GPT tooling',
        'Prompt systems, evaluation loops and guardrails',
        'Unattended batch automation at production scale',
      ],
      icon: 'brain',
      accent: 'amber',
    },
    {
      id: 'fullstack',
      title: 'Full-Stack Product Engineering',
      blurb: 'From schema to screen, shipped and maintained.',
      points: [
        'React, Next.js & TypeScript front-ends',
        'Supabase & Postgres back-ends with RLS discipline',
        'Testing, CI and GitHub-native delivery',
      ],
      icon: 'layers',
      accent: 'moss',
    },
    {
      id: 'generative-media',
      title: 'Generative Media Pipelines',
      blurb: 'Programmatic video, rendered like a studio.',
      points: [
        'Remotion-based programmatic video production',
        'Image & video model pipelines (Seedance, diffusion)',
        'Script-to-screen publishing automation',
      ],
      icon: 'clapperboard',
      accent: 'skyblue',
    },
  ],

  projects: [
    {
      id: 'lumos',
      name: 'Mindplace · Lumos Generative AI',
      tagline: 'Multi-agent film & animation platform',
      description:
        'A multi-agent AI platform for film and animation production — an LLM brain plans, a role-assigned agent crew executes, and a model-agnostic dispatcher drives 8+ image and video engines. The Lumos channel runs on it: videos produced script-to-screen with no human in the loop.',
      role: 'Agentic pipelines & studio modules',
      stack: ['Multi-agent orchestration', 'LLM planner / executor', 'Vision QC', 'Next.js', 'Python', 'Remotion', 'FFmpeg'],
      period: '2025 — Present',
      accent: 'gold',
      badge: 'Building',
      detail: [
        'In the agent-driven flows (VisualStoryteller, CortexStoryteller) a Supervisor compiles the brief into an execution plan, then an executor coordinates a role-assigned crew — Creative Director, Writer, Art Director, Director, Composer and a QC agent — with dependency resolution, parallel groups and per-keyframe Vision QC.',
        'The Studio modules are smaller agentic pipelines of their own, like Moodboard’s composer→critic loop. Underneath both, a model-agnostic dispatcher maps one prompt surface onto 8+ generative engines — manifest-driven and capability-gated, never branching on model id.',
      ],
      roleBullets: [
        'Studio module pipelines — Moodboard, Cartoon, Idea Visualizer and education-content generators',
        'Autonomous publishing pipeline for the Lumos channel: script → narration → visuals → edit → upload',
        'Prompt systems, LLM memory and per-keyframe QC loops',
        'Unattended batch automation for overnight production runs',
      ],
      links: [
        { label: 'mindplace.app', url: 'https://www.mindplace.app' },
        { label: 'Lumos on YouTube', url: 'https://www.youtube.com/@LumosGenerativeAI' },
      ],
    },
    {
      id: 'qplace',
      name: 'QPlace',
      tagline: 'Intent-to-interface place discovery',
      description:
        'A place-discovery system where one natural-language question comes in and what returns over the wire is not a screen but a selection: which widgets from a fixed 16-entry catalog, in what order, at what weight. Server-driven UI under a hard authority boundary.',
      role: 'AI selection layer & validation',
      stack: ['Server-driven UI', 'Schema-constrained LLM selection', 'Intent routing', 'Gemini 2.5 Flash', 'Supabase Edge Functions', 'Swift / SwiftUI'],
      period: '2026 — Now building',
      accent: 'amber',
      badge: 'Now building',
      detail: [
        'The load-bearing constraint is select ≠ hydrate: the model writes the query and picks the widgets, while deterministic code hydrates every payload from retrieved data — the model is structurally unable to emit a coordinate, an identifier or a URL. Every proposal runs a validator; nothing left falls back to a known-good recipe.',
        'Around that sits a routed turn pipeline: a heuristic intent router classifies the turn, a four-level depth ladder governs how much session state it may move, and a composer resolves widgets, transitions and next moves. Model calls are placed, not sprinkled.',
      ],
      roleBullets: [
        'Two-person build with Ege Özçelik under Reconchille Studios',
        'Schema-constrained LLM selection & prompt engineering in edge functions',
        'Validator / judging layer — contract-test suite over the composition gates',
      ],
      links: [{ label: 'Explore QPlace', url: 'https://www.reconchillestudios.com/apps/qplace' }],
    },
    {
      id: 'traveler',
      name: 'TravelerApp · Pacer',
      tagline: 'Two companion iOS apps, live on the App Store',
      description:
        'Two shipped iOS apps built as real field tools. TravelerApp turns a plain-language wish — “a quiet cafe to read in” — into grounded, geo-fenced discoveries; Pacer is the field-analytics half, turning raw GPS into clean stored routes with HealthKit sync.',
      role: 'AI discovery pipeline & retrieval',
      stack: ['Geo-temporal LLM prompting', 'Places-grounded retrieval', 'Structured LLM output', 'Supabase Edge Functions', 'Swift / SwiftUI', 'Kalman filtering'],
      period: '2024 — Present',
      accent: 'skyblue',
      detail: [
        'Explore is an AI-orchestrated discovery pipeline — a two-stage Gemini flow in an edge function: the model first translates the wish into structured, schema-constrained category queries, which are then grounded against Google Places and geo-fenced before anything reaches the screen.',
        'Prompt and context are engineered like infrastructure: every request carries location, time of day, weekday and season, so a late-night ask surfaces places that are open now. Pacer runs raw GPS through a Kalman filter and Ramer–Douglas–Peucker simplification into stored encoded polylines.',
      ],
      roleBullets: [
        'Two-person build with Ege Özçelik under Reconchille Studios',
        'AI discovery pipeline: prompt design, structured output contracts, retrieval grounding',
        'Context engineering — geo-temporal request enrichment',
      ],
      links: [
        { label: 'TravelerApp on the App Store', url: 'https://apps.apple.com/us/app/travelerapp/id6761769561' },
        { label: 'Pacer on the App Store', url: 'https://apps.apple.com/us/app/pacer-by-travelerapp/id6773798438' },
      ],
    },
    {
      id: 'carousel',
      name: 'Carousel Platform',
      tagline: 'Brief-to-campaign content automation',
      description:
        'A request-to-publish content automation system: teammates submit a brief, and the platform turns it into on-brand Instagram campaigns — rendered programmatically with Remotion and delivered as ready-to-post assets, with an approval flow in between.',
      role: 'Full-stack development & render pipeline',
      stack: ['Next.js', 'Supabase', 'Remotion', 'Claude agent skills', 'Row-level security'],
      period: '2025 — Present',
      accent: 'rose',
      detail: [
        'The generation side is a skill factory: a blueprint produces brand-locked child skills, each carrying its own palette, voice and layout constraints, so every brand renders on-brand without per-post design work. Requests queue in Supabase, an agent picks them up, and Remotion renders final PNG batches.',
        'An approval workflow sits between generation and publishing — humans see live previews and approve or send back with notes before anything renders at full quality.',
      ],
      roleBullets: [
        'Platform architecture: request panel, queue, agent runtime and render farm',
        'Skill-factory design — blueprint that generates brand-locked generation skills',
        'Remotion render pipeline and batch export',
      ],
    },
    {
      id: 'gia',
      name: 'GIA Creative Studio',
      tagline: 'Digital exhibition & web experience',
      description:
        'Website and interactive exhibition simulation for a creative studio — an art-forward web experience where visitors walk through curated work as if inside a gallery.',
      role: 'Web development & interactive experience',
      stack: ['TypeScript', 'React', 'Creative web'],
      period: '2025',
      accent: 'moss',
      links: [{ label: 'giacreativestudio.com', url: 'https://www.giacreativestudio.com' }],
    },
    {
      id: 'reconchille',
      name: 'Reconchille Studios',
      tagline: 'The indie studio behind the apps',
      description:
        'The two-person app studio where QPlace, TravelerApp and Pacer live — product development from architecture through App Store release, shipped and iterated with real users.',
      role: 'Product engineering & delivery',
      stack: ['iOS', 'Supabase', 'AI pipelines', 'App Store delivery'],
      period: '2024 — Present',
      accent: 'amber',
      links: [{ label: 'reconchillestudios.com', url: 'https://www.reconchillestudios.com' }],
    },
    {
      id: 'koi',
      name: 'Koi Academy',
      tagline: 'Web & mobile for an education venture',
      description:
        'Full-stack development across web and mobile clients for an education venture. Details are under NDA — happy to talk about the engineering in person.',
      role: 'Full-stack development',
      stack: ['Web', 'Mobile', 'Full-stack'],
      period: '2025 — Present',
      accent: 'skyblue',
      confidential: true,
    },
  ],

  journey: [
    {
      id: 'uni',
      period: '2017 — 2023',
      title: 'BSc, Electrical & Electronics Engineering',
      org: 'Ege University',
      description:
        'English-medium engineering program. Embedded systems, communications and signal processing — including UAV ground-control comms and ECG signal-analysis projects.',
      kind: 'education',
    },
    {
      id: 'transition',
      period: '2023 — 2024',
      title: 'Self-directed move into software & AI',
      org: 'Independent',
      description:
        'Traded the lab bench for the terminal: TypeScript, Python, LLM tooling and dozens of shipped experiments — building the toolbox that powers everything since.',
      kind: 'work',
    },
    {
      id: 'partnership',
      period: '2025 — Present',
      title: 'AI-native product partnership',
      org: 'with Ege Özçelik',
      description:
        'Active two-person product team under Reconchille Studios: Mindplace multi-agent platform & the Lumos channel, QPlace, TravelerApp · Pacer on the App Store, GIA Creative Studio, Koi Academy and a brief-to-campaign content automation platform.',
      kind: 'partnership',
    },
  ],

  resume: {
    phone: '+90 (532) 137 74 05',
    summary:
      'Electrical & Electronics Engineering graduate (Ege University) working as a software & AI engineer. Over the last year, shipped AI-native products in an active two-person team under Reconchille Studios: a multi-agent film & animation platform (Mindplace / Lumos), iOS apps live on the App Store (TravelerApp · Pacer), a server-driven-UI discovery app (QPlace), creative web platforms (GIA Creative Studio) and a brief-to-campaign content automation platform. Systems thinking from an EE background; daily tools are TypeScript, Python, React/Next.js, Supabase and LLM orchestration.',
    skillGroups: [
      {
        label: 'Languages',
        items: ['TypeScript', 'Python', 'C / C++', 'SQL', 'Swift (basic)'],
      },
      {
        label: 'Frameworks & Platforms',
        items: ['React', 'Next.js', 'Node.js', 'Supabase / Postgres', 'Remotion', 'Vite'],
      },
      {
        label: 'AI & Automation',
        items: [
          'LLM orchestration (Claude, GPT)',
          'Agentic workflows & prompt systems',
          'Generative media pipelines (Seedance, diffusion models)',
        ],
      },
      {
        label: 'Engineering Background',
        items: ['Embedded C (STM32)', 'Signal processing (MATLAB)', 'VHDL', 'PLC (Siemens S7)'],
      },
    ],
    experience: [
      {
        role: 'Software & AI Engineer',
        org: 'Independent product partnership (with Ege Özçelik)',
        period: '2025 — Present',
        location: 'İzmir, Turkey',
        bullets: [
          'Build agentic pipelines on Mindplace, a multi-agent film & animation platform — studio modules (Moodboard, Cartoon, Idea Visualizer) and the autonomous script-to-screen pipeline behind the Lumos channel.',
          'Co-develop QPlace (Reconchille Studios): schema-constrained LLM selection and the validator layer of a server-driven-UI discovery app.',
          'AI discovery pipeline for TravelerApp · Pacer, two iOS apps live on the App Store — structured LLM output contracts and places-grounded retrieval.',
          'Built a brief-to-campaign content automation platform (Next.js, Supabase, Remotion) with an approval workflow and programmatic rendering.',
          'Built the website and interactive exhibition simulation for GIA Creative Studio.',
          'Full-stack development for Koi Academy across web and mobile (under NDA).',
        ],
      },
      {
        role: 'Self-directed software development',
        org: 'Independent',
        period: '2023 — 2024',
        location: 'İzmir, Turkey',
        bullets: [
          'Transitioned from electrical engineering into software: TypeScript, Python and LLM tooling.',
          'Built 30+ repositories of tools, automations and product experiments on GitHub.',
        ],
      },
    ],
    education: [
      {
        degree: 'BSc, Electrical & Electronics Engineering',
        school: 'Ege University',
        period: '2017 — 2023',
        note: 'English-medium program',
      },
    ],
    languages: [
      { name: 'Turkish', level: 'Native' },
      { name: 'English', level: 'Professional working proficiency' },
    ],
    academicProjects: [
      {
        name: 'Autonomous UAV (interdisciplinary project)',
        year: '2021',
        description: 'Ground-control communication link for an autonomous drone, joint project with mechanical engineering.',
      },
      {
        name: 'ECG signal-analysis diagnostics',
        year: '2021',
        description: 'MATLAB signal-processing toolchain for diagnosis support on ECG data — analysis, statistics and a reference database.',
      },
      {
        name: 'STM32 embedded projects',
        year: '2021 — 2022',
        description: 'Embedded C projects on STM32: an LCD racing game and a touch numpad calculator.',
      },
    ],
  },
}
