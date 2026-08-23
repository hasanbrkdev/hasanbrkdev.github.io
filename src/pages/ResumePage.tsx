import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileDown, LoaderCircle } from 'lucide-react'
import { profile } from '../content/profile'
import { copy } from '../content/copy'
import { buildResumeModel } from '../content/resumeModel'
import { ResumePreview } from '../components/resume/ResumePreview'

const model = buildResumeModel(profile)

export default function ResumePage() {
  const [downloading, setDownloading] = useState(false)

  async function handleDownload() {
    setDownloading(true)
    try {
      // Lazy-load the PDF renderer so the resume page stays light until needed.
      const [{ pdf }, { ResumePdfDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('../components/resume/ResumePdfDocument'),
      ])
      const blob = await pdf(<ResumePdfDocument model={model} />).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'Hasan_Burak_Ozdemir_Resume.pdf'
      link.click()
      URL.revokeObjectURL(url)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <main className="min-h-screen bg-night px-4 py-8 md:px-6">
      <div className="mx-auto max-w-[880px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-cream/50 transition-colors hover:text-cream"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> {copy.resumePage.back}
          </Link>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="group flex items-center gap-2 rounded-full bg-cream py-1.5 pl-5 pr-1.5 text-sm font-bold text-night transition-all hover:gap-3 disabled:opacity-60"
          >
            {copy.resumePage.download}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-night transition-transform group-hover:scale-110">
              {downloading ? (
                <LoaderCircle className="h-4 w-4 animate-spin text-cream" />
              ) : (
                <FileDown className="h-4 w-4 text-cream" strokeWidth={1.5} />
              )}
            </span>
          </button>
        </div>

        <div className="mb-8 mt-8">
          <h1 className="text-2xl font-light text-cream md:text-3xl">{copy.resumePage.title}</h1>
          <p className="mt-1 text-sm text-cream/50">{copy.resumePage.subtitle}</p>
        </div>

        <ResumePreview model={model} />

        <p className="mt-8 pb-4 text-center text-xs text-cream/40">
          Rendered from <code>src/content/profile.ts</code> — every tailored version is a git
          commit, reversible by design.
        </p>
      </div>
    </main>
  )
}
