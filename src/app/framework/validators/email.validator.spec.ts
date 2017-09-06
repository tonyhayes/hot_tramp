import { FormBuilder } from '@angular/forms';
import { Control } from '@angular/common';
import { EmailValidator } from './email.validator';

describe('EmailValidator', () => {
	let b;
	// provide our implementations or mocks to the dependency injector
	beforeEach(() => { b = new FormBuilder(); });

	it("should use EmailValidator", () => {
			var g = b.group({"email": b.control("some value", EmailValidator)});
			expect(g.controls["email"].value).toEqual("some value");
			expect(g.controls["email"].validator).toBe(EmailValidator);
	});
	it("should return error when given bad email", () => { 
			var g = b.group({"value": b.control("some value", EmailValidator)});
			expect(JSON.stringify(EmailValidator.validate(g.value))).toEqual('{"validateEmail":{"valid":false}}'); 
	});
	it("should return null when given good email", () => { 
			var g = b.group({"value": b.control("j@g.com", EmailValidator)});
			expect(JSON.stringify(EmailValidator.validate(g.value))).toEqual('null'); 
	});

});