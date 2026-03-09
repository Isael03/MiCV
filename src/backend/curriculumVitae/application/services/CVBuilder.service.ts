import { CurriculumVitae } from "../../domain/entities/CurriculumVitae.entity";
import { PersonalInformation } from "../../domain/entities/PersonalInformation.entity";
import { Email } from "../../domain/valueObjects/Email.entity";
import { CreateCVDTO } from "../dtos/CreateCV.dto";
import { UpdateCVDTO } from "../dtos/UpdateCV.dto";
import { sanitizeText, sanitizeImageUrl } from "../../../shared/utils/sanitization.utils";
import { WorkExperience } from "../../domain/entities/WorkExperience.entity";
import { Education } from "../../domain/entities/Education.entity";
import { Skill } from "../../domain/entities/Skill";
import { Language } from "../../domain/entities/Language.entity";
import { Projects } from "../../domain/entities/Projects.entity";
import { LevelLanguages } from "../../types/levelLanguages";

export interface ICVBuilderService {
  build(dto: CreateCVDTO): CurriculumVitae;
  update(cv: CurriculumVitae, dto: UpdateCVDTO): CurriculumVitae;
}

export class CVBuilderService implements ICVBuilderService {
  build(dto: CreateCVDTO): CurriculumVitae {
    
    const email = new Email(sanitizeText(dto.personalInformation.email, true));

    const personalInformation = new PersonalInformation(
      crypto.randomUUID(),
      sanitizeText(dto.personalInformation.name, true),
      sanitizeText(dto.personalInformation.lastName, true),
      email,
      sanitizeText(dto.personalInformation.phone, true),
      sanitizeText(dto.personalInformation.address, true),
      sanitizeText(dto.personalInformation.photo || ""),
      sanitizeText(dto.personalInformation.linkedin || ""),
      sanitizeText(dto.personalInformation.github || ""),
      sanitizeText(dto.personalInformation.professionalTitle || "")
    );


    const workExperiences = dto.workExperiences?.map(exp => new WorkExperience(
      crypto.randomUUID(),
      sanitizeText(exp.company, true),
      sanitizeText(exp.position, true),
      exp.startDate.toISOString(),
      exp.endDate?.toISOString() || "",
      sanitizeText(exp.description || "", true)
    )) || [];

    const education = dto.educations?.map(edu => new Education(
      crypto.randomUUID(),
      sanitizeText(edu.institution, true),
      sanitizeText(edu.degree || ""),
      edu.startDate.toISOString(),
      edu.endDate?.toISOString() || "",
    )) || [];

    const skills = dto.skills?.map(skill => new Skill(
      crypto.randomUUID(),
      sanitizeText(skill.name, true),
      skill.type,
    )) || [];

    const languages = dto.languages?.map(lang => new Language(
      crypto.randomUUID(),
      sanitizeText(lang.name, true),
      lang.level as LevelLanguages,
    )) || [];

    const projects = dto.projects?.map(project => new Projects(
      crypto.randomUUID(),
      sanitizeText(project.name, true),
      sanitizeText(project.description || "", true),
    )) || [];

    return new CurriculumVitae(
      crypto.randomUUID(),
      dto.title,
      new Date(),
      new Date(),
      personalInformation,
      workExperiences,
      education,
      languages,
      projects,
      skills,
    );
  }

  update(cv: CurriculumVitae, dto: UpdateCVDTO): CurriculumVitae {
    // Update title
    if (dto.title) {
      cv.title = sanitizeText(dto.title, true);
    }

    // Update personal information
    if (dto.personalInformation) {
      const pi = dto.personalInformation;
      if (pi.name) cv.personalInformation!.name = sanitizeText(pi.name, true);
      if (pi.lastName) cv.personalInformation!.lastName = sanitizeText(pi.lastName, true);
      if (pi.email) cv.personalInformation!.email = new Email(sanitizeText(pi.email, true));
      if (pi.phone) cv.personalInformation!.phone = sanitizeText(pi.phone, true);
      if (pi.address) cv.personalInformation!.address = sanitizeText(pi.address, true);
      if (pi.photo) cv.personalInformation!.photo = sanitizeImageUrl(pi.photo);
      if (pi.linkedin) cv.personalInformation!.linkedin = sanitizeText(pi.linkedin, true);
      if (pi.github) cv.personalInformation!.github = sanitizeText(pi.github, true);
      if (pi.website) cv.personalInformation!.website = sanitizeText(pi.website, true);
      if (pi.professionalTitle) cv.personalInformation!.professionalTitle = sanitizeText(pi.professionalTitle, true);
    }

    // Update work experiences
    if (dto.workExperiences?.length) {
      dto.workExperiences.forEach(updateExp => {
        if (updateExp.id) {
          const existing = cv.workExperiences!.find(exp => exp.id === updateExp.id);
          if (existing) {
            if (updateExp.company) existing.company = sanitizeText(updateExp.company, true);
            if (updateExp.position) existing.position = sanitizeText(updateExp.position, true);
            if (updateExp.startDate) existing.startDate = updateExp.startDate.toISOString();
            if (updateExp.endDate) existing.endDate = updateExp.endDate.toISOString();
            if (updateExp.description) existing.description = sanitizeText(updateExp.description, true);
          }
        }
      });
    }

    // Update educations
    if (dto.educations?.length) {
      dto.educations.forEach(updateEdu => {
        if (updateEdu.id) {
          const existing = cv.educations!.find(edu => edu.id === updateEdu.id);
          if (existing) {
            if (updateEdu.institution) existing.institution = sanitizeText(updateEdu.institution, true);
            if (updateEdu.degree) existing.degree = sanitizeText(updateEdu.degree, true);
            if (updateEdu.startDate) existing.startDate = updateEdu.startDate.toISOString();
            if (updateEdu.endDate) existing.endDate = updateEdu.endDate.toISOString();
          }
        }
      });
    }

    // Update languages
    if (dto.languages?.length) {
      dto.languages.forEach(updateLang => {
        if (updateLang.id) {
          const existing = cv.languages?.find(lang => lang.id === updateLang.id);
          if (existing) {
            if (updateLang.name) existing.name = sanitizeText(updateLang.name, true);
            if (updateLang.level) existing.level = updateLang.level as LevelLanguages;
          }
        }
      });
    }

    // Update projects
    if (dto.projects?.length) {
      dto.projects.forEach(updateProj => {
        if (updateProj.id) {
          const existing = cv.projects?.find(proj => proj.id === updateProj.id);
          if (existing) {
            if (updateProj.name) existing.name = sanitizeText(updateProj.name, true);
            if (updateProj.description) existing.description = sanitizeText(updateProj.description, true);
            if (updateProj.url) existing.url = sanitizeText(updateProj.url, true);
            if (updateProj.technologies) existing.technologies = updateProj.technologies.split(',').map(t => sanitizeText(t, true));
          }
        }
      });
    }

    // Update skills
    if (dto.skills?.length) {
      dto.skills.forEach(updateSkill => {
        if (updateSkill.id) {
          const existing = cv.skills?.find(skill => skill.id === updateSkill.id);
          if (existing) {
            if (updateSkill.name) existing.name = sanitizeText(updateSkill.name, true);
            if (updateSkill.type) existing.type = updateSkill.type;
          }
        }
      });
    }

    cv.updatedAt = new Date();

    return cv;
  }
}
