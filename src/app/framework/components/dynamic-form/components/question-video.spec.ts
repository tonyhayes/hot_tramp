import { VideoQuestion } from './question-video';
import {} from 'jasmine'

describe('VideoQuestion', () => {
	
	//specs
		it('should be a controlType of video', () => {
			const ddq = new VideoQuestion();
			expect(ddq.controlType).toEqual('video');
		});
		it('should return empty options array', () => {
			const ddq = new VideoQuestion();
			expect(ddq['options']).toEqual(undefined);
		});
		it('should be a formatted required VideoQuestion', () => {
			const ddq = new VideoQuestion({
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
		it('should be a formatted VideoQuestion, with type', () => {
			const ddq = new VideoQuestion({
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

