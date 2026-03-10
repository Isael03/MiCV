import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CurriculumVitaeEntity } from "./CurriculumVitae.entity";
import { Education as DomainEducation } from "../../../domain/entities/Education.entity";

@Entity("education")
export class EducationEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    institution!: string;

    @Column({ type: "varchar", name: "start_date" })
    startDate!: string;

    @Column({ type: "varchar", name: "end_date" })
    endDate!: string;

    @Column({ type: "varchar", nullable: true })
    degree!: string | null;

    @Column({ type: "varchar", nullable: true })
    curriculumVitaeId!: string | null;

    @ManyToOne(() => CurriculumVitaeEntity, (cv) => cv.educations, { onDelete: "CASCADE" })
    @JoinColumn({ name: "curriculumVitaeId" })
    cv!: CurriculumVitaeEntity;

    toDomainEntity(): DomainEducation {
        return new DomainEducation(
            this.id,
            this.institution,
            this.startDate,
            this.endDate,
            this.degree ?? undefined,
        );
    }
}

