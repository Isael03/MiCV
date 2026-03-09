import { Education } from "./Education.entity";
import { Language } from "./Language.entity";
import { PersonalInformation } from "./PersonalInformation.entity";
import { Projects } from "./Projects.entity";
import { Skill } from "./Skill";
import { WorkExperience } from "./WorkExperience.entity";

/* Aggregate Root */
export class CurriculumVitae {
    constructor(
        public id: string,
        public title: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public personalInformation?: PersonalInformation,
        public workExperiences?: WorkExperience[],
        public educations?: Education[],
        public languages?: Language[],
        public projects?: Projects[],
        public skills?: Skill[],
    ) {}
}