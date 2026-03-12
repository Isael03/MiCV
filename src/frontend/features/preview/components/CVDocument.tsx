import { forwardRef } from "react";
const ICON_SVGS = {
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3" fill="white"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" stroke="white" stroke-width="2"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2" fill="white" stroke="none"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
};

const getIconDataUri = (svgStr: string) => {
  const escaped = svgStr
    .replace(/"/g, "'")
    .replace(/#/g, "%23")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E");
  return `data:image/svg+xml,${escaped}`;
};

const ICON_DATA_URIS = {
  mapPin: getIconDataUri(ICON_SVGS.mapPin),
  mail: getIconDataUri(ICON_SVGS.mail),
  phone: getIconDataUri(ICON_SVGS.phone),
  linkedin: getIconDataUri(ICON_SVGS.linkedin),
  github: getIconDataUri(ICON_SVGS.github),
};

import type {
  CVData,
  Skill,
  Experience,
  Education,
  Project,
  Language,
} from "../../../shared/types/cv";

interface CVDocumentProps {
  cv: CVData;
  isExporting?: boolean;
}

const CVDocument = forwardRef<HTMLDivElement, CVDocumentProps>(
  ({ cv, isExporting }, ref) => {
    const iconPaddingTop = isExporting ? "13px" : "4px";
    const softSkills = cv.skills.filter((s: Skill) => s.type === "Blanda");
    const technicalSkills = cv.skills.filter(
      (s: Skill) => s.type === "Técnica",
    );

    // Ordenar experiencia y educación por fecha descendente (más reciente primero)
    const sortedExperience = [...cv.experience].sort((a, b) =>
      (b.startDate || "").localeCompare(a.startDate || ""),
    );
    const sortedEducation = [...cv.education].sort((a, b) =>
      (b.startDate || "").localeCompare(a.startDate || ""),
    );

    return (
      <div
        ref={ref}
        id="cv-document"
        style={{
          width: "210mm",
          minHeight: "297mm",
          margin: "0 auto",
          background: "#ffffff",
          fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
          color: "#000000",
          fontSize: "10pt",
          lineHeight: 1.5,
          padding: "40px 50px",
          boxSizing: "border-box",
        }}
      >
        {/* ── HEADER ── */}
        <header style={{ textAlign: "center", marginBottom: "16px" }}>
          <h1
            style={{
              fontSize: "22pt",
              fontWeight: 700,
              color: "#000000",
              letterSpacing: "2px",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            {cv.personalInfo.fullName || "NOMBRE COMPLETO"}
          </h1>
          {cv.personalInfo.professionalTitle && (
            <p
              style={{
                fontSize: "11pt",
                color: "#000000",
                margin: "4px 0 0",
              }}
            >
              {cv.personalInfo.professionalTitle}
            </p>
          )}

          {/* Contact row */}
          <div
            style={{
              textAlign: "center",
              marginTop: "12px",
              fontSize: "9pt",
              color: "#000000",
            }}
          >
            {cv.personalInfo.address && (
              <div style={{ display: "inline-table", margin: "0 10px", verticalAlign: "middle" }}>
                <div style={{ display: "table-row" }}>
                  <div style={{ display: "table-cell", paddingRight: "6px", paddingTop: iconPaddingTop }}>
                    <img src={ICON_DATA_URIS.mapPin} style={{ width: "11px", height: "11px", display: "block" }} alt="" />
                  </div>
                  <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                    <span style={{ lineHeight: "1.1" }}>{cv.personalInfo.address}</span>
                  </div>
                </div>
              </div>
            )}
            {cv.personalInfo.email && (
              <div style={{ display: "inline-table", margin: "0 10px", verticalAlign: "middle" }}>
                <div style={{ display: "table-row" }}>
                  <div style={{ display: "table-cell", paddingRight: "6px", paddingTop: iconPaddingTop }}>
                    <img src={ICON_DATA_URIS.mail} style={{ width: "11px", height: "11px", display: "block" }} alt="" />
                  </div>
                  <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                    <span style={{ lineHeight: "1.1" }}>{cv.personalInfo.email}</span>
                  </div>
                </div>
              </div>
            )}
            {cv.personalInfo.phone && (
              <div style={{ display: "inline-table", margin: "0 10px", verticalAlign: "middle" }}>
                <div style={{ display: "table-row" }}>
                  <div style={{ display: "table-cell", paddingRight: "6px", paddingTop: iconPaddingTop }}>
                    <img src={ICON_DATA_URIS.phone} style={{ width: "11px", height: "11px", display: "block" }} alt="" />
                  </div>
                  <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                    <span style={{ lineHeight: "1.1" }}>{cv.personalInfo.phone}</span>
                  </div>
                </div>
              </div>
            )}
            {cv.personalInfo.linkedin && (
              <div style={{ display: "inline-table", margin: "0 10px", verticalAlign: "middle" }}>
                <div style={{ display: "table-row" }}>
                  <div style={{ display: "table-cell", paddingRight: "6px", paddingTop: iconPaddingTop }}>
                    <img src={ICON_DATA_URIS.linkedin} style={{ width: "11px", height: "11px", display: "block" }} alt="" />
                  </div>
                  <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                    <span style={{ lineHeight: "1.1" }}>{cv.personalInfo.linkedin}</span>
                  </div>
                </div>
              </div>
            )}
            {cv.personalInfo.github && (
              <div style={{ display: "inline-table", margin: "0 10px", verticalAlign: "middle" }}>
                <div style={{ display: "table-row" }}>
                  <div style={{ display: "table-cell", paddingRight: "6px", paddingTop: iconPaddingTop }}>
                    <img src={ICON_DATA_URIS.github} style={{ width: "11px", height: "11px", display: "block" }} alt="" />
                  </div>
                  <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                    <span style={{ lineHeight: "1.1" }}>{cv.personalInfo.github}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ── RESUMEN ── */}
        {cv.summary && (
          <Section title="RESUMEN">
            <p style={{ margin: 0, textAlign: "justify" }}>{cv.summary}</p>
          </Section>
        )}

        {/* ── EXPERIENCIA ── */}
        {sortedExperience.length > 0 && (
          <Section title="EXPERIENCIA">
            {sortedExperience.map((exp: Experience, i: number) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: i < sortedExperience.length - 1 ? "14px" : 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 700, margin: 0, fontSize: "10pt" }}>
                      {exp.position}
                    </p>
                    <p
                      style={{
                        fontWeight: 700,
                        margin: 0,
                        fontSize: "10pt",
                        textTransform: "uppercase",
                      }}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "9pt",
                      color: "#000000",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {exp.startDate}
                    {exp.endDate ? ` - ${exp.endDate}` : ""}
                  </p>
                </div>
                {exp.description && (
                  <div style={{ marginTop: "4px" }}>
                    {exp.description
                      .split("\n")
                      .map((line: string, idx: number) => (
                        <p
                          key={idx}
                          style={{ margin: "2px 0", paddingLeft: "8px" }}
                        >
                          {line.startsWith("•") || line.startsWith("-")
                            ? line
                            : `• ${line}`}
                        </p>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* ── EDUCACIÓN ── */}
        {sortedEducation.length > 0 && (
          <Section title="EDUCACIÓN">
            {sortedEducation.map((edu: Education, i: number) => (
              <div
                key={edu.id}
                style={{
                  marginBottom: i < sortedEducation.length - 1 ? "10px" : 0,
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    margin: 0,
                    fontSize: "10pt",
                    textTransform: "uppercase",
                  }}
                >
                  {edu.degree || edu.institution}
                </p>
                <p style={{ margin: 0, fontSize: "9pt", color: "#000000" }}>
                  {edu.institution} • {edu.startDate}
                  {edu.endDate ? ` - ${edu.endDate}` : ""}
                </p>
              </div>
            ))}
          </Section>
        )}

        {/* ── SKILLS ── */}
        {cv.skills.length > 0 && (
          <Section title="SKILLS">
            {softSkills.length > 0 && (
              <p style={{ margin: "0 0 4px" }}>
                <span style={{ fontWeight: 400 }}>Blandas: </span>
                {softSkills.map((s: Skill) => s.name).join(", ")}.
              </p>
            )}
            {technicalSkills.length > 0 && (
              <p style={{ margin: "0" }}>
                <span style={{ fontWeight: 400 }}>Técnicas: </span>
                {technicalSkills.map((s: Skill) => s.name).join(", ")}.
              </p>
            )}
          </Section>
        )}

        {/* ── PROYECTOS ── */}
        {cv.projects && cv.projects.length > 0 && (
          <Section title="PROYECTOS">
            {cv.projects.map((proj: Project, i: number) => (
              <div
                key={proj.id}
                style={{
                  marginBottom: i < cv.projects.length - 1 ? "10px" : 0,
                }}
              >
                <p style={{ fontWeight: 700, margin: 0, fontSize: "10pt" }}>
                  {proj.name}:
                </p>
                <ul
                  style={{
                    margin: "2px 0 0",
                    paddingLeft: "24px",
                    listStyleType: "disc",
                  }}
                >
                  <li style={{ margin: 0 }}>{proj.description}</li>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <li style={{ margin: 0 }}>
                      Herramientas: {proj.technologies.join(", ")}.
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {/* ── IDIOMAS ── */}
        {cv.languages.length > 0 && (
          <Section title="IDIOMAS">
            <ul
              style={{ margin: 0, paddingLeft: "24px", listStyleType: "disc" }}
            >
              {cv.languages.map((lang: Language) => (
                <li key={lang.id} style={{ margin: "2px 0" }}>
                  {lang.name} {lang.level && `(${formatLevel(lang.level)})`}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    );
  },
);

CVDocument.displayName = "CVDocument";

/* ── Section helper ── */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "18px" }}>
      <h2
        style={{
          fontSize: "11pt",
          fontWeight: 700,
          color: "#000000",
          margin: "0 0 6px",
          paddingBottom: "4px",
          letterSpacing: "1px",
        }}
      >
        {title}
      </h2>
      <hr
        style={{
          border: "none",
          borderTop: "2px solid #000000",
          margin: "0 0 10px",
        }}
      />
      {children}
    </section>
  );
}

function formatLevel(level: string): string {
  const map: Record<string, string> = {
    basic: "Básico",
    intermediate: "Intermedio",
    advanced: "Avanzado",
    native: "Nativo",
    básico: "Básico",
    intermedio: "Intermedio",
    avanzado: "Avanzado",
  };
  return map[level] || level;
}

export default CVDocument;
