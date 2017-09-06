import { AbstractControl } from '@angular/forms';

export class EmailValidator {

  	public static validate(c:AbstractControl) {
    	//vvv@vvv 
    	const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    	//vvv@vvv.vvv
  		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    	return re.test(c.value) ? null : {
      		validateEmail: {
        		valid: false
      		}
    	};
  	}
}
