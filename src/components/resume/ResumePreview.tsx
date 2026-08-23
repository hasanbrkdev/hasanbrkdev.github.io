import type { ResumeModel } from '../../content/resumeModel'

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-2 border-b border-ink/10 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-terracotta">
      {children}
    </h2>
  )
}

// On-screen mirror of the PDF layout.
export function ResumePreview({ model }: { model: ResumeModel }) {
  return (
    <div className="mx-auto max-w-[820px] rounded-xl bg-white p-8 text-left shadow-[0_20px_60px_rgba(43,38,32,0.12)] sm:p-12 md:p-14">
      <h1 className="text-3xl font-extrabold text-ink">{model.name}</h1>
      <p className="mt-1 text-lg text-terracotta">{model.title}</p>
      <p className="mt-3 text-xs text-ink-faint">
        {model.contact.email} · {model.contact.phone} · {model.contact.location} ·{' '}
        {model.contact.github.replace('https://', '')}
      </p>

      <div className="mt-8">
        <SectionTitle>Summary</SectionTitle>
        <p className="text-sm leading-relaxed text-ink-soft">{model.summary}</p>
      </div>

      <div className="mt-6">
        <SectionTitle>Experience</SectionTitle>
        <div className="space-y-5">
          {model.experience.map((exp) => (
            <div key={`${exp.role}-${exp.period}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold text-ink">{exp.role}</h3>
                <p className="text-xs text-ink-faint">
                  {exp.period}
                  {exp.location ? ` · ${exp.location}` : ''}
                </p>
              </div>
              <p className="text-sm text-terracotta">{exp.org}</p>
              <ul className="mt-1.5 space-y-1">
                {exp.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm text-ink-soft">
                    <span className="text-terracotta">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <SectionTitle>Skills</SectionTitle>
        <div className="space-y-1.5">
          {model.skillGroups.map((group) => (
            <div key={group.label} className="flex flex-col gap-0.5 text-sm sm:flex-row sm:gap-2">
              <span className="w-44 shrink-0 font-bold text-ink">{group.label}</span>
              <span className="text-ink-soft">{group.items.join(', ')}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <SectionTitle>Education</SectionTitle>
        {model.education.map((edu) => (
          <div key={edu.degree}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-bold text-ink">{edu.degree}</h3>
              <p className="text-xs text-ink-faint">{edu.period}</p>
            </div>
            <p className="text-sm text-terracotta">
              {edu.school}
              {edu.note ? ` · ${edu.note}` : ''}
            </p>
          </div>
        ))}
      </div>

      {model.academicProjects.length > 0 && (
        <div className="mt-6">
          <SectionTitle>Academic Projects</SectionTitle>
          <ul className="space-y-1">
            {model.academicProjects.map((proj) => (
              <li key={proj.name} className="flex gap-2 text-sm text-ink-soft">
                <span className="text-terracotta">•</span>
                <span>
                  <span className="font-bold text-ink">
                    {proj.name} ({proj.year}):
                  </span>{' '}
                  {proj.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <SectionTitle>Languages</SectionTitle>
        <p className="text-sm text-ink-soft">
          {model.languages.map((l) => `${l.name} — ${l.level}`).join(' · ')}
        </p>
      </div>
    </div>
  )
}
