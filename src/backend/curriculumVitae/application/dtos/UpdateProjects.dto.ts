import { IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateProjectsDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  technologies?: string;

  @IsString()
  @IsOptional()
  role?: string;
}
