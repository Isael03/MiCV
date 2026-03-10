import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CurriculumVitaeEntity } from "./CurriculumVitae.entity";
import { Language as DomainLanguage } from "../../../domain/entities/Language.entity";

@Entity("language")
export class LanguageEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "varchar" })
    level!: string;

    @Column({ type: "varchar", nullable: true })
    curriculumVitaeId!: string | null;

    @ManyToOne(() => CurriculumVitaeEntity, (cv) => cv.languages, { onDelete: "CASCADE" })
    @JoinColumn({ name: "curriculumVitaeId" })
    cv!: CurriculumVitaeEntity;

    toDomainEntity(): DomainLanguage {
        return new DomainLanguage(
            this.id,
            this.name,
            this.level as any,
        );
    }
}

