import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddLanguageDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  level?: string;
}
