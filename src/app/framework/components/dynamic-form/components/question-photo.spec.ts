import { PhotoQuestion } from './question-photo';
import {} from 'jasmine'

describe('PhotoQuestion', () => {
	
	//specs
		it('should be a controlType of photo', () => {
			const ddq = new PhotoQuestion();
			expect(ddq.controlType).toEqual('photo');
		});
		it('should return empty options array', () => {
			const ddq = new PhotoQuestion();
			expect(ddq['options']).toEqual(undefined);
		});
		it('should be a formatted required PhotoQuestion', () => {
			const ddq = new PhotoQuestion({
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
		it('should be a formatted PhotoQuestion, with type', () => {
			const ddq = new PhotoQuestion({
				key: 'emailAddress',
				label: 'Email',
				type: 'image',
				order: 2
			})
			expect(ddq.key).toEqual('emailAddress');
			expect(ddq.label).toEqual('Email');
			expect(ddq.validators.length).toEqual(0);
			expect(ddq.type).toEqual('image');
			expect(ddq.order).toEqual(2);
		});
}) 

