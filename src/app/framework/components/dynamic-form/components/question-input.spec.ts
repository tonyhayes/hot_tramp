import { InputQuestion } from './question-input';
import {} from 'jasmine'

describe('InputQuestion', () => {
	
	//specs
		it('should be a controlType of input', () => {
			const ddq = new InputQuestion();
			expect(ddq.controlType).toEqual('input');
		});
		it('should return empty options array', () => {
			const ddq = new InputQuestion();
			expect(ddq['options']).toEqual(undefined);
		});
		it('should be a formatted required InputQuestion', () => {
			const ddq = new InputQuestion({
				key: 'firstName',
				label: 'First name',
				value: 'tony',
				validators: ['true'],
				order: 1
			});
			expect(ddq.key).toEqual('firstName');
			expect(ddq.label).toEqual('First name');
			expect(ddq.value).toEqual('tony');
			expect(ddq.validators[0]).toEqual('true');
			expect(ddq.order).toEqual(1);
		});
		it('should be a formatted InputQuestion, with type', () => {
			const ddq = new InputQuestion({
				key: 'emailAddress',
				label: 'Email',
				type: 'email',
				order: 2
			})
			expect(ddq.key).toEqual('emailAddress');
			expect(ddq.label).toEqual('Email');
			expect(ddq.validators.length).toEqual(0);
			expect(ddq.type).toEqual('email');
			expect(ddq.order).toEqual(2);
		});
}) 

