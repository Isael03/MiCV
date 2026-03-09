import { prisma } from "../../database/prisma";
import { CurriculumVitae } from "../domain/entities/CurriculumVitae.entity";
import { PersonalInformation } from "../domain/entities/PersonalInformation.entity";
import { WorkExperience } from "../domain/entities/WorkExperience.entity";
import { Education } from "../domain/entities/Education.entity";
import { Language } from "../domain/entities/Language.entity";
import { Projects } from "../domain/entities/Projects.entity";
import { Skill } from "../domain/entities/Skill";
import { Email } from "../domain/valueObjects/Email.entity";
import { ICVRepository } from "../domain/repositories/cv.repository";


export class CVPrismaRepository implements ICVRepository {

  async createProjectCV(cv: CurriculumVitae): Promise<CurriculumVitae> {
    const createdProjectCV = await prisma.curriculumVitae.create({
      data: {
        id: cv.id,
        title: cv.title,
      },
    });
    return createdProjectCV;
  }

  async findById(id: string): Promise<CurriculumVitae | null> {
    const cvData = await prisma.curriculumVitae.findUnique({
      where: { id },
      include: {
        personalInformation: true,
        workExperiences: true,
        educations: true,
        languages: true,
        projects: true,
        skills: true,
      },
    });

    if (!cvData) return null;

    return this.mapToDomain(cvData);
  }

  async findAll(): Promise<CurriculumVitae[]> {
    const cvsData = await prisma.curriculumVitae.findMany({
      include: {
        personalInformation: true,
        workExperiences: true,
        educations: true,
        languages: true,
        projects: true,
        skills: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return cvsData.map((cvData) => this.mapToDomain(cvData));
  }

  async create(cv: CurriculumVitae): Promise<CurriculumVitae> {
    const createdCV = await prisma.curriculumVitae.create({
      data: {
        id: cv.id,
        title: cv.title,
        createdAt: cv.createdAt,
        updatedAt: cv.updatedAt,
        personalInformation: {
          create: {
            id: cv.personalInformation!.id,
            name: cv.personalInformation!.name,
            lastName: cv.personalInformation!.lastName,
            email: cv.personalInformation!.email.value,
            phone: cv.personalInformation!.phone,
            address: cv.personalInformation!.address,
            photo: cv.personalInformation!.photo,
            linkedin: cv.personalInformation!.linkedin,
            github: cv.personalInformation!.github,
            website: cv.personalInformation!.website,
            professionalTitle: cv.personalInformation!.professionalTitle,
          },
        },
        workExperiences:
          cv.workExperiences!.length > 0
            ? {
                create: cv.workExperiences!.map((we) => ({
                  id: we.id,
                  company: we.company,
                  position: we.position,
                  startDate: we.startDate,
                  endDate: we.endDate,
                  description: we.description,
                })),
              }
            : undefined,
        educations:
          cv.educations!.length > 0
            ? {
                create: cv.educations!.map((edu) => ({
                  id: edu.id,
                  institution: edu.institution,
                  startDate: edu.startDate,
                  endDate: edu.endDate,
                  degree: edu.degree,
                })),
              }
            : undefined,
        languages:
          cv.languages && cv.languages.length > 0
            ? {
                create: cv.languages.map((lang) => ({
                  id: lang.id,
                  name: lang.name,
                  level: lang.level,
                })),
              }
            : undefined,
        projects:
          cv.projects && cv.projects.length > 0
            ? {
                create: cv.projects.map((proj) => ({
                  id: proj.id,
                  name: proj.name,
                  description: proj.description,
                  url: proj.url,
                  technologies: proj.technologies
                    ? JSON.stringify(proj.technologies)
                    : null,
                })),
              }
            : undefined,
        skills:
          cv.skills && cv.skills.length > 0
            ? {
                create: cv.skills.map((skill) => ({
                  id: skill.id,
                  name: skill.name,
                  type: skill.type,
                })),
              }
            : undefined,
      },
      include: {
        personalInformation: true,
        workExperiences: true,
        educations: true,
        languages: true,
        projects: true,
        skills: true,
      },
    });

    return this.mapToDomain(createdCV);
  }

  async update(cv: CurriculumVitae): Promise<CurriculumVitae> {
    const updatedCV = await prisma.curriculumVitae.update({
      where: { id: cv.id },
      data: {
        title: cv.title,
        updatedAt: cv.updatedAt,
        personalInformation: cv.personalInformation
          ? {
              update: {
                name: cv.personalInformation.name,
                lastName: cv.personalInformation.lastName,
                email: cv.personalInformation.email.value,
                phone: cv.personalInformation.phone,
                address: cv.personalInformation.address,
                photo: cv.personalInformation.photo,
                linkedin: cv.personalInformation.linkedin,
                github: cv.personalInformation.github,
                website: cv.personalInformation.website,
                professionalTitle: cv.personalInformation.professionalTitle,
              },
            }
          : undefined,
      },
      include: {
        personalInformation: true,
        workExperiences: true,
        educations: true,
        languages: true,
        projects: true,
        skills: true,
      },
    });

    return this.mapToDomain(updatedCV);
  }

  async delete(id: string): Promise<void> {
    await prisma.curriculumVitae.delete({
      where: { id },
    });
  }

  // Helper method to map Prisma data to domain entity
  private mapToDomain(cvData: PrismaCVWithRelations): CurriculumVitae {
    return new CurriculumVitae(
      cvData.id,
      cvData.title,
      cvData.createdAt,
      cvData.updatedAt,
      this.mapPersonalInformation(cvData.personalInformation),
      cvData.workExperiences.map((we) => this.mapWorkExperience(we)),
      cvData.educations.map((edu) => this.mapEducation(edu)),
      cvData.languages?.map((lang) => this.mapLanguage(lang)),
      cvData.projects?.map((proj) => this.mapProjects(proj)),
      cvData.skills?.map((skill) => this.mapSkill(skill)),
    );
  }

  private mapPersonalInformation(data: any): PersonalInformation {
    if (!data) {
      throw new Error("PersonalInformation is required");
    }
    return new PersonalInformation(
      data.id,
      data.name,
      data.lastName,
      new Email(data.email),
      data.phone,
      data.address,
      data.photo ?? undefined,
      data.linkedin ?? undefined,
      data.github ?? undefined,
      data.website ?? undefined,
      data.professionalTitle ?? undefined,
    );
  }

  private mapWorkExperience(data: any): WorkExperience {
    return new WorkExperience(
      data.id,
      data.company,
      data.position,
      data.startDate,
      data.endDate,
      data.description,
    );
  }

  private mapEducation(data: any): Education {
    return new Education(
      data.id,
      data.institution,
      data.startDate,
      data.endDate,
      data.degree ?? undefined,
    );
  }

  private mapLanguage(data: any): Language {
    return new Language(data.id, data.name, data.level);
  }

  private mapProjects(data: any): Projects {
    let technologies: string[] | undefined;
    if (data.technologies) {
      try {
        technologies = JSON.parse(data.technologies) as string[];
      } catch {
        technologies = [data.technologies];
      }
    }
    return new Projects(
      data.id,
      data.name,
      data.description,
      data.url ?? undefined,
      technologies,
    );
  }

  private mapSkill(data: any): Skill {
    return new Skill(data.id, data.name, data.type as "hard" | "soft");
  }
}

// Prisma types for CV with all relations
type PrismaCVWithRelations =
  Awaited<
    ReturnType<
      typeof prisma.curriculumVitae.findFirst<{
        include: {
          personalInformation: true;
          workExperiences: true;
          educations: true;
          languages: true;
          projects: true;
          skills: true;
        };
      }>
    >
  > extends infer T
    ? NonNullable<T>
    : never;
