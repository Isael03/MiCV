export class Education {
    constructor(
        public id: string,
        public institution: string,
        public startDate: string,
        public endDate: string,
        public degree?: string,
    ) {
        this.validate();
    }

    private validate() {
        if (!this.institution || !this.startDate || !this.endDate) {
            throw new Error("Datos no validos");
        }
    }
}