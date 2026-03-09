import { IsNotEmpty, IsString } from "class-validator";

export class AddSkillsDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  type!: "hard" | "soft";
}
