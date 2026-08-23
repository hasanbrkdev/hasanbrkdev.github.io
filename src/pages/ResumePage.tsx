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
    <main className="min-h-screen bg-paper px-4 py-8 md:px-6">
      <div className="mx-auto max-w-[880px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-ink-faint transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> {copy.resumePage.back}
          </Link>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="group flex items-center gap-2 rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-sm font-bold text-paper transition-all hover:gap-3 disabled:opacity-60"
          >
            {copy.resumePage.download}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper transition-transform group-hover:scale-110">
              {downloading ? (
                <LoaderCircle className="h-4 w-4 animate-spin text-ink" />
              ) : (
                <FileDown className="h-4 w-4 text-ink" />
              )}
            </span>
          </button>
        </div>

        <div className="mt-6 mb-8">
          <h1 className="text-2xl font-extrabold text-ink md:text-3xl">{copy.resumePage.title}</h1>
          <p className="mt-1 text-sm text-ink-faint">{copy.resumePage.subtitle}</p>
        </div>

        <ResumePreview model={model} />

        <p className="mt-8 pb-4 text-center text-xs text-ink-faint">
          Rendered from <code>src/content/profile.ts</code> — every tailored version is a git
          commit, reversible by design.
        </p>
      </div>
    </main>
  )
}
