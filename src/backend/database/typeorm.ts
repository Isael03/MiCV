import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { CurriculumVitaeEntity } from "../curriculumVitae/infrastructure/typeorm/entities/CurriculumVitae.entity";
import { PersonalInformationEntity } from "../curriculumVitae/infrastructure/typeorm/entities/PersonalInformation.entity";
import { WorkExperienceEntity } from "../curriculumVitae/infrastructure/typeorm/entities/WorkExperience.entity";
import { EducationEntity } from "../curriculumVitae/infrastructure/typeorm/entities/Education.entity";
import { LanguageEntity } from "../curriculumVitae/infrastructure/typeorm/entities/Language.entity";
import { ProjectsEntity } from "../curriculumVitae/infrastructure/typeorm/entities/Projects.entity";
import { SkillEntity } from "../curriculumVitae/infrastructure/typeorm/entities/Skill.entity";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const initSqlJs = require("sql.js");


const locationPath = path.join(__dirname, "../../../database/cv_builder.db");
console.log("locationPath: ", locationPath); //locationPath:  C:\Users\2484\database\cv_builder.db
export const typeOrmConfig: DataSourceOptions = {
  type: "sqljs",
  driver: initSqlJs,
  autoSave: true,
  location: path.join(__dirname, "../../../database/cv_builder.db"),
  useLocalForage: false,
  synchronize: true,
  logging: false,
  entities: [
    CurriculumVitaeEntity,
    PersonalInformationEntity,
    WorkExperienceEntity,
    EducationEntity,
    LanguageEntity,
    ProjectsEntity,
    SkillEntity,
  ],
  migrations: [],
  subscribers: [],
};

export const disconnectDatabase = () => {
  try {
    AppDataSource.destroy();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.error("Error disconnecting from database:", error);
  }
};
export const AppDataSource = new DataSource(typeOrmConfig);
