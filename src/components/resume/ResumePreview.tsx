import type { ResumeModel } from '../../content/resumeModel'

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-2 border-b border-night/10 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#B85C3E]">
      {children}
    </h2>
  )
}

// On-screen mirror of the PDF layout.
export function ResumePreview({ model }: { model: ResumeModel }) {
  return (
    <div className="mx-auto max-w-[820px] rounded-xl bg-white p-8 text-left shadow-[0_20px_60px_rgba(43,38,32,0.12)] sm:p-12 md:p-14">
      <h1 className="text-3xl font-extrabold text-night">{model.name}</h1>
      <p className="mt-1 text-lg text-[#B85C3E]">{model.title}</p>
      <p className="mt-3 text-xs text-night/50">
        {model.contact.email} · {model.contact.phone} · {model.contact.location} ·{' '}
        {model.contact.github.replace('https://', '')}
      </p>

      <div className="mt-8">
        <SectionTitle>Summary</SectionTitle>
        <p className="text-sm leading-relaxed text-night/70">{model.summary}</p>
      </div>

      <div className="mt-6">
        <SectionTitle>Experience</SectionTitle>
        <div className="space-y-5">
          {model.experience.map((exp) => (
            <div key={`${exp.role}-${exp.period}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold text-night">{exp.role}</h3>
                <p className="text-xs text-night/50">
                  {exp.period}
                  {exp.location ? ` · ${exp.location}` : ''}
                </p>
              </div>
              <p className="text-sm text-[#B85C3E]">{exp.org}</p>
              <ul className="mt-1.5 space-y-1">
                {exp.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm text-night/70">
                    <span className="text-[#B85C3E]">•</span>
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
              <span className="w-44 shrink-0 font-bold text-night">{group.label}</span>
              <span className="text-night/70">{group.items.join(', ')}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <SectionTitle>Education</SectionTitle>
        {model.education.map((edu) => (
          <div key={edu.degree}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-bold text-night">{edu.degree}</h3>
              <p className="text-xs text-night/50">{edu.period}</p>
            </div>
            <p className="text-sm text-[#B85C3E]">
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
              <li key={proj.name} className="flex gap-2 text-sm text-night/70">
                <span className="text-[#B85C3E]">•</span>
                <span>
                  <span className="font-bold text-night">
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
        <p className="text-sm text-night/70">
          {model.languages.map((l) => `${l.name} — ${l.level}`).join(' · ')}
        </p>
      </div>
    </div>
  )
}
