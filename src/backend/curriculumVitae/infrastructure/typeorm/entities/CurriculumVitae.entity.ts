import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import {
  PersonalInformationEntity,
  WorkExperienceEntity,
  EducationEntity,
  LanguageEntity,
  ProjectsEntity,
  SkillEntity,
} from "./index";
import { CurriculumVitae as DomainCurriculumVitae } from "../../../domain/entities/CurriculumVitae.entity";

@Entity("curriculum_vitae")
export class CurriculumVitaeEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  title!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @OneToOne(() => PersonalInformationEntity, { cascade: true, eager: true })
  @JoinColumn({ name: "personal_information_id" })
  personalInformation!: PersonalInformationEntity | null;

  @OneToMany(() => WorkExperienceEntity, (we) => we.cv, {
    cascade: true,
    eager: true,
  })
  workExperiences!: WorkExperienceEntity[];

  @OneToMany(() => EducationEntity, (edu) => edu.cv, {
    cascade: true,
    eager: true,
  })
  educations!: EducationEntity[];

  @OneToMany(() => LanguageEntity, (lang) => lang.cv, {
    cascade: true,
    eager: true,
  })
  languages!: LanguageEntity[];

  @OneToMany(() => ProjectsEntity, (proj) => proj.cv, {
    cascade: true,
    eager: true,
  })
  projects!: ProjectsEntity[];

  @OneToMany(() => SkillEntity, (skill) => skill.cv, {
    cascade: true,
    eager: true,
  })
  skills!: SkillEntity[];

  toDomainEntity(): DomainCurriculumVitae {
    return new DomainCurriculumVitae(
      this.id,
      this.title,
      this.createdAt,
      this.updatedAt,
      this.personalInformation?.toDomainEntity() ?? undefined,
      this.workExperiences.map((we) => we.toDomainEntity()),
      this.educations.map((edu) => edu.toDomainEntity()),
      this.languages.map((lang) => lang.toDomainEntity()),
      this.projects.map((proj) => proj.toDomainEntity()),
      this.skills.map((skill) => skill.toDomainEntity()),
    );
  }

  static fromDomainEntity(
    domain: DomainCurriculumVitae,
  ): CurriculumVitaeEntity {
    const entity = new CurriculumVitaeEntity();
    entity.id = domain.id;
    entity.title = domain.title;
    entity.createdAt = domain.createdAt ?? new Date();
    entity.updatedAt = domain.updatedAt ?? new Date();

    // Inicializar las colecciones si existen en el dominio
    entity.workExperiences =
      domain.workExperiences?.map((we) => {
        const workExpEntity = new WorkExperienceEntity();
        workExpEntity.id = we.id;
        workExpEntity.company = we.company;
        workExpEntity.position = we.position;
        workExpEntity.startDate = we.startDate;
        workExpEntity.endDate = we.endDate;
        workExpEntity.description = we.description;
        workExpEntity.cv = entity;
        return workExpEntity;
      }) ?? [];

    entity.educations =
      domain.educations?.map((edu) => {
        const educationEntity = new EducationEntity();
        educationEntity.id = edu.id;
        educationEntity.institution = edu.institution;
        educationEntity.startDate = edu.startDate;
        educationEntity.endDate = edu.endDate;
        educationEntity.degree = edu.degree ?? null;
        educationEntity.cv = entity;
        return educationEntity;
      }) ?? [];

    entity.languages =
      domain.languages?.map((lang) => {
        const languageEntity = new LanguageEntity();
        languageEntity.id = lang.id;
        languageEntity.name = lang.name;
        languageEntity.level = lang.level;
        languageEntity.cv = entity;
        return languageEntity;
      }) ?? [];

    entity.projects =
      domain.projects?.map((proj) => {
        const projectEntity = new ProjectsEntity();
        projectEntity.id = proj.id;
        projectEntity.name = proj.name;
        projectEntity.description = proj.description;
        projectEntity.url = proj.url ?? null;
        projectEntity.cv = entity;
        return projectEntity;
      }) ?? [];

    entity.skills =
      domain.skills?.map((skill) => {
        const skillEntity = new SkillEntity();
        skillEntity.id = skill.id;
        skillEntity.name = skill.name;
        skillEntity.type = skill.type;
        skillEntity.cv = entity;
        return skillEntity;
      }) ?? [];

    return entity;
  }
}
