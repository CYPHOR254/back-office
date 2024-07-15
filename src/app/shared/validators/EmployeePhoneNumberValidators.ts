import {AbstractControl, ValidationErrors} from '@angular/forms';


export class EmployeePhoneNumberValidators {

    // @ts-ignore
    static mustStartWith234(control: AbstractControl): ValidationErrors | null {


        // tslint:disable-next-line:max-line-length
        const PHONE_REGEXP = /^([234])[0-9]{11}/;
        const phoneNumber = control.value as string;


        if (phoneNumber && phoneNumber !== '' && (!PHONE_REGEXP.test(phoneNumber))) {

            return {
                mustStartWith254:
                    {
                        phoneNumber,
                        error: 'Phone Number must start with 234.'
                    }
            };
        } else {
            return null;
        }

    }

    static mustStartWith254TableCheck(control: string): ValidationErrors | null {


        // tslint:disable-next-line:max-line-length
        const PHONE_REGEXP = /^([234])[0-9]{11}/;
        const phoneNumber = control as string;



        if (phoneNumber && phoneNumber !== '' && (!PHONE_REGEXP.test(phoneNumber))) {

            return {
                mustStartWith254:
                    {
                        phoneNumber,
                        error: 'Phone Number must start with 234.'
                    }
            };
        } else {
            return null;
        }

    }

}
