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
    footerLeft: ['Software & AI Engineer', 'Systems · Media · Products', 'From architecture to App Store'],
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
    heading: 'Résumé.',
    body: 'The same content as this site, typeset for A4 — always current, tailored per application, and every version tracked in git.',
    button: 'Open & download',
    meta: 'PDF · A4 · generated in your browser',
  },
  footer: {
    heading: 'Let’s build something.',
    body: 'Open to product engineering, AI pipeline and creative platform work.',
    availability: 'Open to work — job opportunities · freelance · consultancy',
    emailButton: 'Say hello',
    credit: 'Designed & developed by Hasan Burak Özdemir',
  },
  resumePage: {
    title: 'Résumé',
    subtitle: 'Rendered from the same content source as the site. Download as a print-ready PDF.',
    download: 'Download PDF',
    back: 'Back to site',
  },
} as const
