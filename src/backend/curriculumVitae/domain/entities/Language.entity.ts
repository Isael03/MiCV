import { LevelLanguages } from "../../types/levelLanguages";

export class Language {
    constructor(
        public id: string,
        public name: string,
        public level: LevelLanguages,
    ) {}
}