import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CurriculumVitaeEntity } from "./CurriculumVitae.entity";
import { Skill as DomainSkill } from "../../../domain/entities/Skill";

@Entity("skill")
export class SkillEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "varchar" })
    type!: "hard" | "soft";

    @Column({ type: "varchar", nullable: true })
    curriculumVitaeId!: string | null;

    @ManyToOne(() => CurriculumVitaeEntity, (cv) => cv.skills, { onDelete: "CASCADE" })
    @JoinColumn({ name: "curriculumVitaeId" })
    cv!: CurriculumVitaeEntity;

    toDomainEntity(): DomainSkill {
        return new DomainSkill(
            this.id,
            this.name,
            this.type,
        );
    }
}

