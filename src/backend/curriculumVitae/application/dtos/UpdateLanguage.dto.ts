import { IsOptional, IsString } from "class-validator";

export class UpdateLanguageDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  level?: string;
}
