import { AbstractControl, AsyncValidatorFn, ValidationErrors, FormArray } from '@angular/forms';
import { map, Observable } from "rxjs";
import { ExistsHeroReponse } from "../interfaces";
import { HeroesServiceListImpl } from "../services/heroes.service.list.impl";

export class HeroesValidators {
    static invalidGenderValidator(control: AbstractControl): ValidationErrors | null {
        const validValues = ['masculino', 'femenino', 'otro'];
        return validValues.includes(control.value) ? null
            : { 'genderInvalid': true };
    }

    static isHumanValidator(control: AbstractControl): ValidationErrors | null {
        const validValues = [true, false];
        return validValues.includes(control.value) ? null
            : { 'isHumanInvalid': true };
    }

    static userExistsValidator(service: HeroesServiceListImpl): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return service.verifyIfExistsByName(control.value)
                .pipe(
                    map((resp: ExistsHeroReponse) => {
                        return resp.exists ? { userAlreadyTaken: true} : null
                    })
                )
        }
    }

    static containsSuperPowersValidator(control: AbstractControl): ValidationErrors | null {
        const controlValue = control.value as FormArray;
        return (controlValue.length === 0) ? { 'superPowersArrayIsEmpty': true } : null;        
    }
}