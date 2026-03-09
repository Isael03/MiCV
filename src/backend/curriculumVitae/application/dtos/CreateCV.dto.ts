import { IsNotEmpty, IsString, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { AddPersonalInformationDTO } from "./AddPersonalInformation.dto";
import { AddWorkExperienceDTO } from "./AddWorkExperience.dto";
import { AddEducationDTO } from "./AddEducation.dto";
import { AddLanguageDTO } from "./AddLanguage.dto";
import {AddProjectsDTO} from "./AddProjects.dto"
import { AddSkillsDTO } from "./AddSkills.dto";

export class CreateCVDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ValidateNested()
  @Type(() => AddPersonalInformationDTO)
  @IsNotEmpty()
  personalInformation!: AddPersonalInformationDTO;

  @ValidateNested()
  @Type(() => AddWorkExperienceDTO)
  workExperiences?: AddWorkExperienceDTO[];

  @ValidateNested()
  @Type(() => AddEducationDTO)
  educations?: AddEducationDTO  [];

  @ValidateNested()
  @Type(() => AddLanguageDTO)
  @IsOptional()
  languages?: AddLanguageDTO[];

  @ValidateNested()
  @Type(() => AddProjectsDTO)
  @IsOptional()
  projects?: AddProjectsDTO[];

  @ValidateNested()
  @Type(() => AddSkillsDTO)
  @IsOptional()
  skills?: AddSkillsDTO[];
}
