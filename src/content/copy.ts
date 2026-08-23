// Section-level copy that is layout-bound (not part of the tailorable profile).
export const copy = {
  nav: [
    { label: 'About', target: 'about' },
    { label: 'Work', target: 'work' },
    { label: 'Journey', target: 'journey' },
    { label: 'Contact', target: 'contact' },
  ],
  navResumeLabel: 'Résumé',
  hero: {
    year: '2026',
    siteIndexLabel: 'Site Index',
    findMeLabel: 'Find Me',
    footerLeft: ['Software & AI Engineer', 'Systems · Media · Products', 'Builder of cozy little worlds'],
    footerRight: ['İzmir, Turkey', 'GMT+3'],
  },
  specialities: {
    label: 'Specialities',
    line1: 'Studio-grade engineering for AI-native products.',
    line2: 'Systems first. Shipped always.',
    mediaCaption: 'Where systems meet stories.',
  },
  work: {
    label: 'Selected Work',
    line1: 'Things I have built,',
    line2: 'with people I like building with.',
    hint: 'Click a project to expand',
  },
  journey: {
    label: 'Journey',
    line1: 'From circuits',
    line2: 'to systems that create.',
  },
  resumeCta: {
    label: 'Résumé',
    heading: 'Need the paper version?',
    body: 'A print-ready PDF, generated from the same data as this site — always current, tailored per application, every version tracked.',
    button: 'Open résumé builder',
  },
  footer: {
    heading: 'Let’s build something.',
    body: 'Open to product engineering, AI pipeline and creative platform work.',
    emailButton: 'Say hello',
  },
  resumePage: {
    title: 'Résumé',
    subtitle: 'Rendered from the same content source as the site. Download as a print-ready PDF.',
    download: 'Download PDF',
    back: 'Back to site',
  },
} as const
