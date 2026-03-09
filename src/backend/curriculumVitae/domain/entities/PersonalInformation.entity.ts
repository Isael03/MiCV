import { Email } from "../valueObjects/Email.entity";

export class PersonalInformation {
    constructor(
        public id: string,
        public name: string,
        public lastName: string,
        public email: Email,
        public phone: string,
        public address: string,
        public photo?: string,
        public linkedin?: string,
        public github?: string,
        public website?: string,
        public professionalTitle?: string,
    ) {}
}