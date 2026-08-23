import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { ResumeModel } from '../../content/resumeModel'

const INK = '#2B2620'
const ACCENT = '#B85C3E'
const FAINT = '#8A7F6F'

const styles = StyleSheet.create({
  page: {
    paddingVertical: 42,
    paddingHorizontal: 48,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: INK,
    lineHeight: 1.45,
  },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold' },
  title: { fontSize: 11, color: ACCENT, marginTop: 2 },
  contactRow: { fontSize: 8.5, color: FAINT, marginTop: 6 },
  section: { marginTop: 14 },
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: ACCENT,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    borderBottomWidth: 0.75,
    borderBottomColor: '#E4DCCB',
    paddingBottom: 3,
    marginBottom: 6,
  },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  expRole: { fontSize: 10.5, fontFamily: 'Helvetica-Bold' },
  expPeriod: { fontSize: 9, color: FAINT },
  expOrg: { fontSize: 9.5, color: ACCENT, marginBottom: 2 },
  bullet: { flexDirection: 'row', marginBottom: 1.5 },
  bulletMark: { width: 10, color: ACCENT },
  bulletText: { flex: 1 },
  skillRow: { flexDirection: 'row', marginBottom: 2 },
  skillLabel: { width: 150, fontFamily: 'Helvetica-Bold' },
  skillItems: { flex: 1 },
})

export function ResumePdfDocument({ model }: { model: ResumeModel }) {
  const contact = [
    model.contact.email,
    model.contact.phone,
    model.contact.location,
    model.contact.github.replace('https://', ''),
    decodeURIComponent(model.contact.linkedin.replace('https://www.', '')),
  ].join('  ·  ')

  return (
    <Document title={`${model.name} — Résumé`} author={model.name}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{model.name}</Text>
        <Text style={styles.title}>{model.title}</Text>
        <Text style={styles.contactRow}>{contact}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text>{model.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {model.experience.map((exp) => (
            <View key={`${exp.role}-${exp.period}`} wrap={false}>
              <View style={styles.expHeader}>
                <Text style={styles.expRole}>{exp.role}</Text>
                <Text style={styles.expPeriod}>
                  {exp.period}
                  {exp.location ? `  ·  ${exp.location}` : ''}
                </Text>
              </View>
              <Text style={styles.expOrg}>{exp.org}</Text>
              {exp.bullets.map((bullet) => (
                <View key={bullet} style={styles.bullet}>
                  <Text style={styles.bulletMark}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {model.skillGroups.map((group) => (
            <View key={group.label} style={styles.skillRow}>
              <Text style={styles.skillLabel}>{group.label}</Text>
              <Text style={styles.skillItems}>{group.items.join(', ')}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {model.education.map((edu) => (
            <View key={edu.degree}>
              <View style={styles.expHeader}>
                <Text style={styles.expRole}>{edu.degree}</Text>
                <Text style={styles.expPeriod}>{edu.period}</Text>
              </View>
              <Text style={styles.expOrg}>
                {edu.school}
                {edu.note ? `  ·  ${edu.note}` : ''}
              </Text>
            </View>
          ))}
        </View>

        {model.academicProjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Academic Projects</Text>
            {model.academicProjects.map((proj) => (
              <View key={proj.name} style={styles.bullet}>
                <Text style={styles.bulletMark}>•</Text>
                <Text style={styles.bulletText}>
                  <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                    {proj.name} ({proj.year}):{' '}
                  </Text>
                  {proj.description}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text>{model.languages.map((l) => `${l.name} — ${l.level}`).join('   ·   ')}</Text>
        </View>
      </Page>
    </Document>
  )
}
