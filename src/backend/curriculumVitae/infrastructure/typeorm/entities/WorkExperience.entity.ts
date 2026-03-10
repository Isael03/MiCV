import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CurriculumVitaeEntity } from "./CurriculumVitae.entity";
import { WorkExperience as DomainWorkExperience } from "../../../domain/entities/WorkExperience.entity";

@Entity("work_experience")
export class WorkExperienceEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    company!: string;

    @Column({ type: "varchar" })
    position!: string;

    @Column({ type: "varchar", name: "start_date" })
    startDate!: string;

    @Column({ type: "varchar", name: "end_date" })
    endDate!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({ type: "varchar", nullable: true })
    curriculumVitaeId!: string | null;

    @ManyToOne(() => CurriculumVitaeEntity, (cv) => cv.workExperiences, { onDelete: "CASCADE" })
    @JoinColumn({ name: "curriculumVitaeId" })
    cv!: CurriculumVitaeEntity;

    toDomainEntity(): DomainWorkExperience {
        return new DomainWorkExperience(
            this.id,
            this.company,
            this.position,
            this.startDate,
            this.endDate,
            this.description,
        );
    }
}

