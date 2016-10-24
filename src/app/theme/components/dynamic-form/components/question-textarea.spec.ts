import { TextareaQuestion } from './question-textarea';

describe('TextareaQuestion', () => {
	
	//specs
		it('should be a controlType of textbox', () => {
			const ddq = new TextareaQuestion();
			expect(ddq.controlType).toEqual('textarea');
		});
		it('should return empty options array', () => {
			const ddq = new TextareaQuestion();
			expect(ddq.options).toEqual(undefined);
		});
		it('should be a formatted required TextareaQuestion', () => {
			const ddq = new TextareaQuestion({
				key: 'firstName',
				label: 'First name',
				value: 'tony',
				required: true,
				order: 1
			});
			expect(ddq.key).toEqual('firstName');
			expect(ddq.label).toEqual('First name');
			expect(ddq.value).toEqual('tony');
			expect(ddq.required).toEqual(true);
			expect(ddq.order).toEqual(1);
		});
		it('should be a formatted TextareaQuestion, with type', () => {
			const ddq = new TextareaQuestion({
				key: 'emailAddress',
				label: 'Email',
				type: 'email',
				order: 2
			})
			console.log(ddq)
			expect(ddq.key).toEqual('emailAddress');
			expect(ddq.label).toEqual('Email');
			expect(ddq.required).toEqual(false);
			expect(ddq.type).toEqual('email');
			expect(ddq.order).toEqual(2);
		});
}) 

