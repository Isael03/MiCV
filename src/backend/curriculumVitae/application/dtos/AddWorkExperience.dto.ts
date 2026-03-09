import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddWorkExperienceDTO {
    @IsString()
    @IsNotEmpty()
    company!: string;

    @IsString()
    @IsNotEmpty()
    position!: string;

    @IsDate()
    @IsNotEmpty()
    startDate!: Date;

    @IsDate()
    @IsOptional()
    endDate?: Date;

    @IsString()
    @IsOptional()
    description?: string;
}