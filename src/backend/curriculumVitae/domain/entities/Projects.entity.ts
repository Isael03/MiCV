export class Projects {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public url?: string,
        public technologies?: string[],
    ) {}
}