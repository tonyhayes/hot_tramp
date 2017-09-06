import { UserDetails } from './user-details.component';
import { TranslateService } from '../../../../translate';
import { QuestionService } from '../../../../services';
import {} from 'jasmine'

describe('UserDetails', () => {

	const router = {
		navigate: ()=>{}		
	}
	const translate = new TranslateService();
	const qs = new QuestionService();
	const userDetails = new UserDetails(null, null, null, router, translate, qs);
	userDetails.questionService = qs;
	userDetails.translate = {
		instant: ()=>{ return 'tony' }
	}
	userDetails.licences = [
		{applicationId:"project-management",licensesUsed:2,totalCount:4},
		{applicationId:"project",licensesUsed:2,totalCount:4},
		{applicationId:"management",licensesUsed:2,totalCount:4}
		]
	//specs
	it('should create userDetails', () => {
		expect(userDetails).toBeDefined();
	});
	it('should create homeRoute', () => {
		expect(userDetails.homeRoute).toEqual('/user-administration/user-list');
	});
	it('should finished be false', () => {
		expect(userDetails.finished).toEqual(false);
	});
	it('should run getForm', () => {
		userDetails.getForm();
		expect(userDetails.finished).toEqual(true);
	});
	it('should have title', () => {
		expect(userDetails.title).toEqual('tony');
	});
  	it('should run onCancel', () => {

  		userDetails.onCancel()  		
    	expect(userDetails.title).toEqual('tony');
  	});

}) 

