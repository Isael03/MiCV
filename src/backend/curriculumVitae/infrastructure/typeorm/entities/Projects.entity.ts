import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CurriculumVitaeEntity } from "./CurriculumVitae.entity";
import { Projects as DomainProjects } from "../../../domain/entities/Projects.entity";

@Entity("projects")
export class ProjectsEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({ type: "varchar", nullable: true })
    url!: string | null;

    @Column({ type: "simple-json", nullable: true })
    technologies!: string[] | null;

    @Column({ type: "varchar", nullable: true })
    curriculumVitaeId!: string | null;

    @ManyToOne(() => CurriculumVitaeEntity, (cv) => cv.projects, { onDelete: "CASCADE" })
    @JoinColumn({ name: "curriculumVitaeId" })
    cv!: CurriculumVitaeEntity;

    toDomainEntity(): DomainProjects {
        return new DomainProjects(
            this.id,
            this.name,
            this.description,
            this.url ?? undefined,
            this.technologies ?? undefined,
        );
    }
}

