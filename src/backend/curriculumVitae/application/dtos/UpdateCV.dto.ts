import {IsString, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { UpdatePersonalInformationDTO } from "./UpdatePersonalInformation.dto";
import { UpdateWorkExperienceDTO } from "./UpdateWorkExperience.dto";
import { UpdateEducationDTO } from "./UpdateEducation.dto";
import { UpdateLanguageDTO } from "./UpdateLanguage.dto";
import { UpdateProjectsDTO } from "./UpdateProjects.dto";
import { UpdateSkillsDTO } from "./UpdateSkills.dto";

export class UpdateCVDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @ValidateNested()
  @Type(() => UpdatePersonalInformationDTO)
  @IsOptional()
  personalInformation!: UpdatePersonalInformationDTO;

  @ValidateNested()
  @Type(() => UpdateWorkExperienceDTO)
  @IsOptional()
  workExperiences?: UpdateWorkExperienceDTO[];

  @ValidateNested()
  @Type(() => UpdateEducationDTO)
  @IsOptional()
  educations?: UpdateEducationDTO[];

  @ValidateNested()
  @Type(() => UpdateLanguageDTO)
  @IsOptional()
  languages?: UpdateLanguageDTO[];

  @ValidateNested()
  @Type(() => UpdateProjectsDTO)
  @IsOptional()
  projects?: UpdateProjectsDTO[];

  @ValidateNested()
  @Type(() => UpdateSkillsDTO)
  @IsOptional()
  skills?: UpdateSkillsDTO[];
}
