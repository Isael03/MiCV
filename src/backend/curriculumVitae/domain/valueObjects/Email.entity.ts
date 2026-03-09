export class Email {
    constructor(
        public value: string,
    ) {
        this.validate();
    }

    private validate() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            throw new Error('Email invalido');
        }
    }
}