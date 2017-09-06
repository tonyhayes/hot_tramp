import { FormBuilder } from '@angular/forms';
import { Control } from '@angular/common';
import { EqualPasswordsValidator } from './equalPasswords.validator';

describe('EqualPasswordsValidator', () => {
	let b;
	// provide our implementations or mocks to the dependency injector
	beforeEach(() => { b = new FormBuilder(); });

	it('should define EqualPasswordsValidator', () => {
	  	expect(EqualPasswordsValidator).toBeDefined();
	});

	it("should use EqualPasswordsValidator", () => {
			var g = b.group({"firstField": b.control("some value", EqualPasswordsValidator)});
			expect(g.controls["firstField"].value).toEqual("some value");
			expect(g.controls["firstField"].validator).toBe(EqualPasswordsValidator);
	});
   //    	it("should not error on valid strings", () => { 
			// let value = null;
   //       	let c = EqualPasswordsValidator.validate(new Control("aa"),new Control("aa")); 
			// c(new Control("aa")).then(v => value = v);
			// expect(value).toEqual({"one": true, "two": true});
   //   	});

});