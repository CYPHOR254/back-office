import {Injectable} from '@angular/core';
import {FormControl, ValidatorFn} from '@angular/forms';

@Injectable()
export class NumberValidatorsService {

    constructor() {
    }

    static max(max: number): any {
        return (control: FormControl): { [key: string]: boolean } | null => {
            const val = control.value as string;

            // console.log('value passed:' + val);
            // console.log('max passed:' + max);
            // console.log(val && val !== '' && (val.length > max));

            if (val && val !== '' && (val.length > max)) {
                return {max: true};
            }
            return null;
        };
    }

    static min(min: number): any {

        return (control: FormControl): { [key: string]: boolean } | null => {
            const val = control.value as string;

            // console.log('value passed:' + val);
            // console.log('min passed:' + min);
            // console.log(val && val !== '' && (val.length < min));

            if (val && val !== '' && (val.length < min)) {
                return {min: true};
            }
            return null;

        };
    }

    static maxNumber(max: number): any {
        return (control: FormControl): { [key: string]: boolean } | null => {

            const val: number = control.value;

            if (control.pristine || control.pristine) {
                return null;
            }
            if (val <= max) {
                return null;
            }
            return {max: true};
        };
    }

    static minNumber(min: number): any {
        return (control: FormControl): { [key: string]: boolean } | null => {

            const val: number = control.value;

            if (control.pristine || control.pristine) {
                return null;
            }
            if (val >= min) {
                return null;
            }
            return {min: true};
        };
    }

}
