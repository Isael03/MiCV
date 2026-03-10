import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { PersonalInformation as DomainPersonalInformation } from "../../../domain/entities/PersonalInformation.entity";
import { Email as DomainEmail } from "../../../domain/valueObjects/Email.entity";

@Entity("personal_information")
export class PersonalInformationEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "varchar", name: "last_name" })
    lastName!: string;

    @Column({ type: "varchar" })
    email!: string;

    @Column({ type: "varchar" })
    phone!: string;

    @Column({ type: "varchar" })
    address!: string;

    @Column({ type: "varchar", nullable: true })
    photo!: string | null;

    @Column({ type: "varchar", nullable: true })
    linkedin!: string | null;

    @Column({ type: "varchar", nullable: true })
    github!: string | null;

    @Column({ type: "varchar", nullable: true })
    website!: string | null;

    @Column({ type: "varchar", nullable: true, name: "professional_title" })
    professionalTitle!: string | null;

    @Column({ type: "varchar", nullable: true })
    curriculumVitaeId!: string | null;

    toDomainEntity(): DomainPersonalInformation {
        return new DomainPersonalInformation(
            this.id,
            this.name,
            this.lastName,
            new DomainEmail(this.email),
            this.phone,
            this.address,
            this.photo ?? undefined,
            this.linkedin ?? undefined,
            this.github ?? undefined,
            this.website ?? undefined,
            this.professionalTitle ?? undefined,
        );
    }
}

