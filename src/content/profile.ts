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
      name: 'Lumos Generative AI',
      tagline: 'Autonomous video generation',
      description:
        'Custom AI-orchestration pipelines that take a topic from script to finished video without a human in the loop — narration, visuals, motion and edit assembled automatically. Designed the pipeline architecture, prompt systems and rendering automation.',
      role: 'Pipeline architecture & AI orchestration',
      stack: ['Python', 'TypeScript', 'LLM orchestration', 'Remotion', 'FFmpeg'],
      period: '2025 — Present',
      accent: 'gold',
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
      accent: 'rose',
    },
    {
      id: 'carousel',
      name: 'Carousel Platform',
      tagline: 'Brief-to-campaign content automation',
      description:
        'A request-to-publish content automation system: teammates submit a brief, and the platform turns it into on-brand Instagram campaigns — rendered programmatically with Remotion and delivered as ready-to-post assets, with an approval flow in between.',
      role: 'Full-stack development & render pipeline',
      stack: ['Next.js', 'Supabase', 'Remotion', 'Claude agent skills'],
      period: '2025 — Present',
      accent: 'amber',
    },
    {
      id: 'reconchille',
      name: 'Reconchille Studios',
      tagline: 'Mobile app, built and shipped',
      description:
        'Mobile application developed and deployed to production for Reconchille Studios — from UI implementation through release, working directly with the studio on iterations.',
      role: 'Mobile development & deployment',
      stack: ['Cross-platform mobile', 'Product delivery'],
      period: '2025',
      accent: 'moss',
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
        'Active two-person product team: Lumos autonomous video pipelines, GIA Creative Studio, Reconchille Studios mobile, Koi Academy and a brief-to-campaign content automation platform.',
      kind: 'partnership',
    },
  ],

  resume: {
    phone: '+90 (532) 137 74 05',
    summary:
      'Electrical & Electronics Engineering graduate (Ege University) working as a software & AI engineer. Over the last year, shipped AI-native products in an active two-person team: autonomous video-generation pipelines (Lumos), creative web platforms (GIA Creative Studio), a production mobile app (Reconchille Studios) and a brief-to-campaign content automation platform. Systems thinking from an EE background; daily tools are TypeScript, Python, React/Next.js, Supabase and LLM orchestration.',
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
          'Designed and operate autonomous video-generation pipelines at Lumos — script, narration, visuals and edit produced end-to-end without manual steps.',
          'Built the website and interactive exhibition simulation for GIA Creative Studio.',
          'Developed and shipped a production mobile app for Reconchille Studios.',
          'Full-stack development for Koi Academy across web and mobile (under NDA).',
          'Built a brief-to-campaign content automation platform (Next.js, Supabase, Remotion) with an approval workflow and programmatic rendering.',
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
