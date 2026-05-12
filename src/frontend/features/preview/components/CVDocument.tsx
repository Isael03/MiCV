import React, { Fragment, forwardRef } from "react";
const ICON_SVGS = {
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3" fill="white"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" stroke="white" stroke-width="2"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2" fill="white" stroke="none"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/></svg>`,
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
  globe: getIconDataUri(ICON_SVGS.globe),
};

import { DEFAULT_SECTION_ORDER } from "../../../shared/types/cv";
import type {
  CVData,
  Certification,
  CVSectionKey,
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
  ({ cv, isExporting }: CVDocumentProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const iconPaddingTop = isExporting ? "13px" : "4px";
    const softSkills = cv.skills.filter((s: Skill) => s.type === "Blanda");
    const certifications = (cv.certifications || []).filter(
      (cert: Certification) =>
        cert.name || cert.issuer || cert.date || cert.url,
    );
    const technicalSkills = cv.skills.filter(
      (s: Skill) => s.type === "Técnica",
    );
    const sortedCertifications = [...certifications].sort((a, b) =>
      parseDateString(b.date) - parseDateString(a.date),
    );

    // Ordenar experiencia y educación por fecha descendente (más reciente primero)
    const sortedExperience = [...cv.experience].sort((a, b) => {
      const dateA = Math.max(parseDateString(a.endDate), parseDateString(a.startDate));
      const dateB = Math.max(parseDateString(b.endDate), parseDateString(b.startDate));
      if (dateB !== dateA) return dateB - dateA;
      return parseDateString(b.startDate) - parseDateString(a.startDate);
    });
    const sortedEducation = [...cv.education].sort((a, b) => {
      const dateA = Math.max(parseDateString(eduEndDate(a)), parseDateString(a.startDate));
      const dateB = Math.max(parseDateString(eduEndDate(b)), parseDateString(b.startDate));
      if (dateB !== dateA) return dateB - dateA;
      return parseDateString(b.startDate) - parseDateString(a.startDate);
    });
    const sectionOrder = normalizeSectionOrder(
      cv.sectionOrder || DEFAULT_SECTION_ORDER,
    );
    const hiddenSections = normalizeHiddenSections(cv.hiddenSections || []);

    const SECTION_RENDERERS: Record<CVSectionKey, () => React.ReactNode> = {
      summary: () =>
        cv.summary ? (
          <Section title="RESUMEN">
            <p style={{ margin: 0, textAlign: "justify" }}>{cv.summary}</p>
          </Section>
        ) : null,
      experience: () =>
        sortedExperience.length > 0 ? (
          <Section title="EXPERIENCIA">
            {sortedExperience.map((exp: Experience, i: number) => (
              <div
                key={exp.id}
                className="experience-entry"
                style={{
                  marginBottom: i < sortedExperience.length - 1 ? "14px" : 0,
                  breakInside: "avoid",
                  pageBreakInside: "avoid",
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
                      .map((line: string, idx: number) => {
                        const content =
                          line.startsWith("•") || line.startsWith("-")
                            ? line.substring(1).trim()
                            : line;
                        return (
                          <ListItem key={idx} isExporting={isExporting}>
                            {content}
                          </ListItem>
                        );
                      })}
                  </div>
                )}
              </div>
            ))}
          </Section>
        ) : null,
      education: () =>
        sortedEducation.length > 0 ? (
          <Section title="EDUCACIÓN">
            {sortedEducation.map((edu: Education, i: number) => (
              <div
                key={edu.id}
                className="education-entry"
                style={{
                  marginBottom: i < sortedEducation.length - 1 ? "10px" : 0,
                  breakInside: "avoid",
                  pageBreakInside: "avoid",
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
        ) : null,
      skills: () =>
        cv.skills.length > 0 ? (
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
        ) : null,
      projects: () =>
        cv.projects && cv.projects.length > 0 ? (
          <Section title="PROYECTOS">
            {cv.projects.map((proj: Project, i: number) => (
              <div
                key={proj.id}
                className="project-entry"
                style={{
                  marginBottom: i < cv.projects.length - 1 ? "10px" : 0,
                  breakInside: "avoid",
                  pageBreakInside: "avoid",
                }}
              >


                <p style={{ fontWeight: 700, margin: 0, fontSize: "10pt" }}>
                  {proj.name}:
                </p>
                <div style={{ marginTop: "2px" }}>
                  <ListItem isExporting={isExporting}>
                    {proj.description}
                  </ListItem>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <ListItem isExporting={isExporting}>
                      Herramientas: {proj.technologies.join(", ")}.
                    </ListItem>
                  )}
                </div>
              </div>
            ))}
          </Section>
        ) : null,
      languages: () =>
        cv.languages.length > 0 ? (
          <Section title="IDIOMAS">
            <div style={{ marginTop: "2px" }}>
              {cv.languages.map((lang: Language) => (
                <ListItem key={lang.id} isExporting={isExporting}>
                  {lang.name} {lang.level && `(${formatLevel(lang.level)})`}
                </ListItem>
              ))}
            </div>
          </Section>
        ) : null,
      certifications: () =>
        sortedCertifications.length > 0 ? (
          <Section title="CERTIFICADOS">
            {sortedCertifications.map((cert: Certification, i: number) => {
              const formattedDate = formatCertDate(cert.date);
              const meta = [cert.issuer, formattedDate, cert.url]
                .filter(Boolean)
                .join(" • ");
              return (
                <div
                  key={cert.id}
                  className="certification-entry"
                  style={{
                    marginBottom:
                      i < sortedCertifications.length - 1 ? "10px" : 0,
                    breakInside: "avoid",
                    pageBreakInside: "avoid",
                  }}
                >


                  <p style={{ fontWeight: 700, margin: 0, fontSize: "10pt" }}>
                    {cert.name}
                  </p>
                  {meta && (
                    <p style={{ margin: 0, fontSize: "9pt", color: "#000000" }}>
                      {meta}
                    </p>
                  )}
                </div>
              );
            })}
          </Section>
        ) : null,
      salary: () =>
        cv.salary && cv.salary.amount ? (
          <div className="salary-section" style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
            <Section title="PRETENSIÓN DE RENTA">
              <p style={{ margin: 0 }}>
                {cv.salary.amount}
                {cv.salary.isNegotiable ? " (Conversable)" : ""}
              </p>
            </Section>
          </div>
        ) : null,
    };

    return (
      <div
        ref={ref}
        id="cv-document"
        style={{
          width: isExporting ? "210mm" : "100%",
          maxWidth: "210mm",
          minHeight: isExporting ? "297mm" : "auto",
          margin: "0 auto",
          background: "#ffffff",
          fontFamily:
            cv.design?.fontFamily ||
            "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
          color: "#000000",
          fontSize: "10pt",
          lineHeight: 1.5,
          orphans: 3,
          widows: 3,
          hyphens: "none",
          wordBreak: "normal",
          overflowWrap: "break-word",
          padding: isExporting
            ? "40px 50px"
            : "clamp(16px, 4vw, 40px) clamp(16px, 5vw, 50px)",
          boxSizing: "border-box",
        }}
      >
        {/* Load Google Font dynamically - only if it's not the system font */}
        {cv.design?.fontFamily &&
          !cv.design.fontFamily.includes("Segoe UI") && (
            <link
              href={`https://fonts.googleapis.com/css2?family=${cv.design.fontFamily.split(",")[0].replace(/"/g, "").replace(/ /g, "+")}:wght@400;700&display=swap`}
              rel="stylesheet"
            />
          )}
        {/* ── HEADER ── */}
        <header style={{ textAlign: "center", marginBottom: "16px" }}>
          {/* Profile photo */}
          {cv.personalInfo.photo && (
            <div
              style={{
                float: "right",
                marginLeft: "20px",
                marginBottom: "10px",
              }}
            >
              <img
                src={cv.personalInfo.photo}
                alt="Profile"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #000000",
                }}
              />
            </div>
          )}
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
              <div
                style={{
                  display: "inline-table",
                  margin: "0 10px",
                  verticalAlign: "middle",
                }}
              >
                <div style={{ display: "table-row" }}>
                  <div
                    style={{
                      display: "table-cell",
                      paddingRight: "6px",
                      paddingTop: iconPaddingTop,
                    }}
                  >
                    <img
                      src={ICON_DATA_URIS.mapPin}
                      style={{
                        width: "11px",
                        height: "11px",
                        display: "block",
                      }}
                      alt=""
                    />
                  </div>
                  <div
                    style={{ display: "table-cell", verticalAlign: "middle" }}
                  >
                    <span style={{ lineHeight: "1.1" }}>
                      {cv.personalInfo.address}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {cv.personalInfo.email && (
              <div
                style={{
                  display: "inline-table",
                  margin: "0 10px",
                  verticalAlign: "middle",
                }}
              >
                <div style={{ display: "table-row" }}>
                  <div
                    style={{
                      display: "table-cell",
                      paddingRight: "6px",
                      paddingTop: iconPaddingTop,
                    }}
                  >
                    <img
                      src={ICON_DATA_URIS.mail}
                      style={{
                        width: "11px",
                        height: "11px",
                        display: "block",
                      }}
                      alt=""
                    />
                  </div>
                  <div
                    style={{ display: "table-cell", verticalAlign: "middle" }}
                  >
                    <span style={{ lineHeight: "1.1" }}>
                      {cv.personalInfo.email}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {cv.personalInfo.phone && (
              <div
                style={{
                  display: "inline-table",
                  margin: "0 10px",
                  verticalAlign: "middle",
                }}
              >
                <div style={{ display: "table-row" }}>
                  <div
                    style={{
                      display: "table-cell",
                      paddingRight: "6px",
                      paddingTop: iconPaddingTop,
                    }}
                  >
                    <img
                      src={ICON_DATA_URIS.phone}
                      style={{
                        width: "11px",
                        height: "11px",
                        display: "block",
                      }}
                      alt=""
                    />
                  </div>
                  <div
                    style={{ display: "table-cell", verticalAlign: "middle" }}
                  >
                    <span style={{ lineHeight: "1.1" }}>
                      {cv.personalInfo.phone}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {cv.personalInfo.linkedin && (
              <div
                style={{
                  display: "inline-table",
                  margin: "0 10px",
                  verticalAlign: "middle",
                }}
              >
                <div style={{ display: "table-row" }}>
                  <div
                    style={{
                      display: "table-cell",
                      paddingRight: "6px",
                      paddingTop: iconPaddingTop,
                    }}
                  >
                    <img
                      src={ICON_DATA_URIS.linkedin}
                      style={{
                        width: "11px",
                        height: "11px",
                        display: "block",
                      }}
                      alt=""
                    />
                  </div>
                  <div
                    style={{ display: "table-cell", verticalAlign: "middle" }}
                  >
                    <span style={{ lineHeight: "1.1" }}>
                      {cv.personalInfo.linkedin}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {cv.personalInfo.github && (
              <div
                style={{
                  display: "inline-table",
                  margin: "0 10px",
                  verticalAlign: "middle",
                }}
              >
                <div style={{ display: "table-row" }}>
                  <div
                    style={{
                      display: "table-cell",
                      paddingRight: "6px",
                      paddingTop: iconPaddingTop,
                    }}
                  >
                    <img
                      src={ICON_DATA_URIS.github}
                      style={{
                        width: "11px",
                        height: "11px",
                        display: "block",
                      }}
                      alt=""
                    />
                  </div>
                  <div
                    style={{ display: "table-cell", verticalAlign: "middle" }}
                  >
                    <span style={{ lineHeight: "1.1" }}>
                      {cv.personalInfo.github}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {cv.personalInfo.portfolio && (
              <div
                style={{
                  display: "inline-table",
                  margin: "0 10px",
                  verticalAlign: "middle",
                }}
              >
                <div style={{ display: "table-row" }}>
                  <div
                    style={{
                      display: "table-cell",
                      paddingRight: "6px",
                      paddingTop: iconPaddingTop,
                    }}
                  >
                    <img
                      src={ICON_DATA_URIS.globe}
                      style={{
                        width: "11px",
                        height: "11px",
                        display: "block",
                      }}
                      alt=""
                    />
                  </div>
                  <div
                    style={{ display: "table-cell", verticalAlign: "middle" }}
                  >
                    <span style={{ lineHeight: "1.1" }}>
                      {cv.personalInfo.portfolio}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {sectionOrder
          .filter((sectionKey) => !hiddenSections.includes(sectionKey))
          .map((sectionKey) => (
            <Fragment key={sectionKey}>
              {SECTION_RENDERERS[sectionKey]()}
            </Fragment>
          ))}
      </div>
    );
  },
);

CVDocument.displayName = "CVDocument";

interface ListItemProps {
  children: React.ReactNode;
  isExporting?: boolean;
}

function ListItem({
  children,
  isExporting,
}: ListItemProps) {
  // Ajustamos el padding para el PDF - reduciendo de 10px a 4.5px
  const bulletPaddingTop = isExporting ? "1px" : "1px";

  return (
    <div className="ListItem" style={{ display: "table", width: "100%", marginBottom: "2px", breakInside: "avoid", pageBreakInside: "avoid" }}>
      <div style={{ display: "table-row" }}>


        <div
          style={{
            display: "table-cell",
            width: "16px",
            verticalAlign: "top",
            fontSize: "10pt", // Igualamos al tamaño del texto
            lineHeight: "1.5", // Match the text's line-height
            paddingTop: bulletPaddingTop,
            paddingLeft: "4px",
          }}
        >
          •
        </div>
        <div
          style={{ display: "table-cell", verticalAlign: "top", textAlign: "justify" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Section helper ── */
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({
  title,
  children,
}: SectionProps) {
  return (
    <section style={{ marginBottom: "18px" }}>
      <div className="section-header" style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
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
      </div>
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

function formatCertDate(value: string): string {
  const trimmed = value?.trim();
  if (!trimmed) return "";

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const isoMatch = trimmed.match(/^(\d{4})[\/-](\d{1,2})(?:[\/-]\d{1,2})?$/);
  if (isoMatch) {
    const year = isoMatch[1];
    const monthIndex = Number(isoMatch[2]) - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${monthNames[monthIndex]} - ${year}`;
    }
  }

  const monthYearMatch = trimmed.match(/^(\d{1,2})[\/-](\d{4})$/);
  if (monthYearMatch) {
    const monthIndex = Number(monthYearMatch[1]) - 1;
    const year = monthYearMatch[2];
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${monthNames[monthIndex]} - ${year}`;
    }
  }

  return trimmed;
}

function normalizeSectionOrder(order: CVSectionKey[]): CVSectionKey[] {
  const unique = order.filter(
    (key, index) => order.indexOf(key) === index,
  );
  const missing = DEFAULT_SECTION_ORDER.filter(
    (key) => !unique.includes(key),
  );
  return [...unique, ...missing];
}

function normalizeHiddenSections(hidden: CVSectionKey[]): CVSectionKey[] {
  const unique = hidden.filter(
    (key, index) => hidden.indexOf(key) === index,
  );
  return unique.filter((key) => DEFAULT_SECTION_ORDER.includes(key));
}

export default CVDocument;

function parseDateString(dateStr: string | undefined): number {
  if (!dateStr) return 0;
  const trimmed = dateStr.trim().toLowerCase();

  // Si es "Actual" o similar, le damos un valor muy alto para que aparezca de primero
  if (
    ["actual", "presente", "present", "now", "hoy", "actualidad"].includes(
      trimmed,
    )
  ) {
    return new Date().getTime() + 86400000000; // Unos 1000 días en el futuro
  }

  const monthsSpanish = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const monthsEnglish = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const monthsSpanishShort = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];

  let month = -1;
  let year = -1;

  // Intentar encontrar un año (4 dígitos)
  const yearMatch = trimmed.match(/\b(19|20)\d{2}\b/);
  if (yearMatch) {
    year = parseInt(yearMatch[0], 10);
  }

  // Intentar encontrar el nombre del mes
  monthsSpanish.forEach((m, i) => {
    if (trimmed.includes(m)) month = i;
  });
  if (month === -1) {
    monthsEnglish.forEach((m, i) => {
      if (trimmed.includes(m)) month = i;
    });
  }
  if (month === -1) {
    monthsSpanishShort.forEach((m, i) => {
      if (trimmed.includes(m)) month = i;
    });
  }

  // Si no se encontró nombre de mes, intentar buscar un número de mes (1-12)
  if (month === -1) {
    const monthMatch = trimmed.match(/\b(0?[1-9]|1[0-2])\b/);
    if (monthMatch && year !== -1) {
      // Nos aseguramos que el mes no sea el mismo que el año
      if (monthMatch[0] !== yearMatch?.[0]) {
        month = parseInt(monthMatch[0], 10) - 1;
      }
    }
  }

  if (year !== -1) {
    return new Date(year, month !== -1 ? month : 0).getTime();
  }

  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) return parsed;

  return 0;
}

function eduEndDate(edu: Education): string {
  // Manejar propiedades legadas si es necesario, pero usualmente usamos endDate
  return edu.endDate || "";
}

