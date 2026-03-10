import { Repository } from "typeorm";
import { CurriculumVitae } from "../../domain/entities/CurriculumVitae.entity";
import { WorkExperience } from "../../domain/entities/WorkExperience.entity";
import { Education } from "../../domain/entities/Education.entity";
import { Language } from "../../domain/entities/Language.entity";
import { Projects } from "../../domain/entities/Projects.entity";
import { Skill } from "../../domain/entities/Skill";
import { ICVRepository } from "../../domain/repositories/cv.repository";
import { AppDataSource } from "../../../database/typeorm";
import {
  CurriculumVitaeEntity,
  PersonalInformationEntity,
  WorkExperienceEntity,
  EducationEntity,
  LanguageEntity,
  ProjectsEntity,
  SkillEntity,
} from "../typeorm/entities";

export class CVTypeOrmRepository implements ICVRepository {
  private cvRepository: Repository<CurriculumVitaeEntity>;

  constructor() {
    this.cvRepository = AppDataSource.getRepository(CurriculumVitaeEntity);
  }

  async createProjectCV(cv: CurriculumVitae): Promise<CurriculumVitae> {
    try {
      const entity = CurriculumVitaeEntity.fromDomainEntity(cv);
      const created = await this.cvRepository.save(entity);
      return created.toDomainEntity();
    } catch (error) {
      console.error("Error creating project CV:", error);
      throw new Error(`Failed to create project CV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async findById(id: string): Promise<CurriculumVitae | null> {
    try {
      const entity = await this.cvRepository.findOne({
        where: { id },
        relations: [
          "personalInformation",
          "workExperiences",
          "educations",
          "languages",
          "projects",
          "skills",
        ],
      });

      if (!entity) return null;
      return entity.toDomainEntity();
    } catch (error) {
      console.error(`Error finding CV by id ${id}:`, error);
      throw new Error(`Failed to find CV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async findAll(): Promise<CurriculumVitae[]> {
    try {
      const entities = await this.cvRepository.find({
        relations: [
          "personalInformation",
          "workExperiences",
          "educations",
          "languages",
          "projects",
          "skills",
        ],
        order: { createdAt: "DESC" },
      });

      return entities.map(entity => entity.toDomainEntity());
    } catch (error) {
      console.error("Error finding all CVs:", error);
      throw new Error(`Failed to find all CVs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async create(cv: CurriculumVitae): Promise<CurriculumVitae> {
    try {
      const entity = await this.mapToEntity(cv);
      const created = await this.cvRepository.save(entity);
      return created.toDomainEntity();
    } catch (error) {
      console.error("Error creating CV:", error);
      throw new Error(`Failed to create CV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async update(cv: CurriculumVitae): Promise<CurriculumVitae> {
    try {
      const existing = await this.cvRepository.findOne({ where: { id: cv.id } });
      if (!existing) {
        throw new Error("CV not found");
      }

      existing.title = cv.title;
      existing.updatedAt = cv.updatedAt ?? new Date();

      if (cv.personalInformation) {
        if (existing.personalInformation) {
          existing.personalInformation.name = cv.personalInformation.name;
          existing.personalInformation.lastName = cv.personalInformation.lastName;
          existing.personalInformation.email = cv.personalInformation.email.value;
          existing.personalInformation.phone = cv.personalInformation.phone;
          existing.personalInformation.address = cv.personalInformation.address;
          existing.personalInformation.photo = cv.personalInformation.photo ?? null;
          existing.personalInformation.linkedin = cv.personalInformation.linkedin ?? null;
          existing.personalInformation.github = cv.personalInformation.github ?? null;
          existing.personalInformation.website = cv.personalInformation.website ?? null;
          existing.personalInformation.professionalTitle = cv.personalInformation.professionalTitle ?? null;
        } else {
          existing.personalInformation = new PersonalInformationEntity();
          existing.personalInformation.name = cv.personalInformation.name;
          existing.personalInformation.lastName = cv.personalInformation.lastName;
          existing.personalInformation.email = cv.personalInformation.email.value;
          existing.personalInformation.phone = cv.personalInformation.phone;
          existing.personalInformation.address = cv.personalInformation.address;
          existing.personalInformation.photo = cv.personalInformation.photo ?? null;
          existing.personalInformation.linkedin = cv.personalInformation.linkedin ?? null;
          existing.personalInformation.github = cv.personalInformation.github ?? null;
          existing.personalInformation.website = cv.personalInformation.website ?? null;
          existing.personalInformation.professionalTitle = cv.personalInformation.professionalTitle ?? null;
        }
      }

      const updated = await this.cvRepository.save(existing);
      return updated.toDomainEntity();
    } catch (error) {
      console.error(`Error updating CV ${cv.id}:`, error);
      throw new Error(`Failed to update CV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.cvRepository.delete({ id });
    } catch (error) {
      console.error(`Error deleting CV ${id}:`, error);
      throw new Error(`Failed to delete CV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async mapToEntity(cv: CurriculumVitae): Promise<CurriculumVitaeEntity> {
    const entity = CurriculumVitaeEntity.fromDomainEntity(cv);

    if (cv.personalInformation) {
      const personalInfo = new PersonalInformationEntity();
      personalInfo.id = cv.personalInformation.id;
      personalInfo.name = cv.personalInformation.name;
      personalInfo.lastName = cv.personalInformation.lastName;
      personalInfo.email = cv.personalInformation.email.value;
      personalInfo.phone = cv.personalInformation.phone;
      personalInfo.address = cv.personalInformation.address;
      personalInfo.photo = cv.personalInformation.photo ?? null;
      personalInfo.linkedin = cv.personalInformation.linkedin ?? null;
      personalInfo.github = cv.personalInformation.github ?? null;
      personalInfo.website = cv.personalInformation.website ?? null;
      personalInfo.professionalTitle = cv.personalInformation.professionalTitle ?? null;
      entity.personalInformation = personalInfo;
    }

    if (cv.workExperiences && cv.workExperiences.length > 0) {
      entity.workExperiences = cv.workExperiences.map((we: WorkExperience) => {
        const workExp = new WorkExperienceEntity();
        workExp.id = we.id;
        workExp.company = we.company;
        workExp.position = we.position;
        workExp.startDate = we.startDate;
        workExp.endDate = we.endDate;
        workExp.description = we.description;
        return workExp;
      });
    }

    if (cv.educations && cv.educations.length > 0) {
      entity.educations = cv.educations.map((edu: Education) => {
        const education = new EducationEntity();
        education.id = edu.id;
        education.institution = edu.institution;
        education.startDate = edu.startDate;
        education.endDate = edu.endDate;
        education.degree = edu.degree ?? null;
        return education;
      });
    }

    if (cv.languages && cv.languages.length > 0) {
      entity.languages = cv.languages.map((lang: Language) => {
        const language = new LanguageEntity();
        language.id = lang.id;
        language.name = lang.name;
        language.level = lang.level;
        return language;
      });
    }

    if (cv.projects && cv.projects.length > 0) {
      entity.projects = cv.projects.map((proj: Projects) => {
        const project = new ProjectsEntity();
        project.id = proj.id;
        project.name = proj.name;
        project.description = proj.description;
        project.url = proj.url ?? null;
        project.technologies = proj.technologies ?? null;
        return project;
      });
    }

    if (cv.skills && cv.skills.length > 0) {
      entity.skills = cv.skills.map((skill: Skill) => {
        const skillEntity = new SkillEntity();
        skillEntity.id = skill.id;
        skillEntity.name = skill.name;
        skillEntity.type = skill.type;
        return skillEntity;
      });
    }

    return entity;
  }
}
