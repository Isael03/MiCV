import { CurriculumVitae } from "../entities/CurriculumVitae.entity";

export class CVValidationService {
    validate(cv: CurriculumVitae) {
        if (!cv.personalInformation!.name) {
            throw new Error('El nombre es requerido');
        }

        if (!cv.personalInformation!.email) {
            throw new Error('El email es requerido');
        }

        if (!cv.personalInformation!.phone) {
            throw new Error('El telefono es requerido');
        }

        if (!cv.personalInformation!.address) {
            throw new Error('La direccion es requerida');
        }     
    }
}