import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class AddProjectsDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

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
