import { IsOptional, IsString } from "class-validator";

export class UpdateSkillsDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  type?: "hard" | "soft";
}
