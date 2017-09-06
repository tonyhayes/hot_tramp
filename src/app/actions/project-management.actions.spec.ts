import { ProjectManagementActions } from './project-management.actions';
import { UserBase } from '../pages/user-administration';
import {} from 'jasmine';

describe('ProjectManagementActions', () => {
	let actions: ProjectManagementActions;
//	const questions = new UserBase();

	beforeEach(() => {
		actions = new ProjectManagementActions();
	});

	it('returns LOAD_FIELD_REPORTS', () => {
		expect(actions.loadFieldReports().type).toEqual('[JobBase] Load field reports');
	});
	it('returns LOAD_FIELD_REPORTS_SUCCESS', () => {
		expect(actions.loadFieldReportsSuccess(null).type).toEqual('[JobBase] Load field reports Success');
	});
	it('returns LOAD_FIELD_REPORTS_FAILURE', () => {
		expect(actions.loadFieldReportsFailure(null).type).toEqual('[JobBase] Load field reports Failure');
	});
	it('returns LOAD_SUBMITTED_FIELD_REPORTS', () => {
		expect(actions.loadSubmittedFieldReports().type).toEqual('[JobBase] Load submitted field reports');
	});
	it('returns LOAD_SUBMITTED_FIELD_REPORTS_SUCCESS', () => {
		expect(actions.loadSubmittedFieldReportsSuccess(null).type).toEqual('[JobBase] Load submitted field reports Success');
	});
	it('returns LOAD_SUBMITTED_FIELD_REPORTS_FAILURE', () => {
		expect(actions.loadSubmittedFieldReportsFailure(null).type).toEqual('[JobBase] Load submitted field reports Failure');
	});
	it('returns LOAD_FIELD_REPORT', () => {
		expect(actions.loadFieldReport().type).toEqual('JobBase Load field report');
	});
	it('returns LOAD_FIELD_REPORT_SUCCESS', () => {
		expect(actions.loadFieldReportSuccess(null).type).toEqual('JobBase Load field report Success');
	});
	it('returns LOAD_FIELD_REPORT_FAILURE', () => {
		expect(actions.loadFieldReportFailure(null).type).toEqual('JobBase Load field report Failure');
	});
	it('returns GET_LOADED_FIELD_REPORTS', () => {
		expect(actions.getLoadedFieldReports().type).toEqual('JobBase Loaded field reports');
	});
	it('returns GET_LOADED_FIELD_REPORTS_SUCCESS', () => {
		expect(actions.getLoadedFieldReportsSuccess(null).type).toEqual('JobBase Loaded field reports Success');
	});
	it('returns GET_LOADED_FIELD_REPORTS_FAILURE', () => {
		expect(actions.getLoadedFieldReportsFailure(null).type).toEqual('JobBase Loaded field reports Failure');
	});
	it('returns GET_LOADED_FIELD_REPORT', () => {
		expect(actions.getLoadedFieldReport().type).toEqual('JobBase Loaded field report');
	});
	it('returns GET_LOADED_FIELD_REPORT_SUCCESS', () => {
		expect(actions.getLoadedFieldReportSuccess(null).type).toEqual('JobBase Loaded field report Success');
	});
	it('returns GET_LOADED_FIELD_REPORT_FAILURE', () => {
		expect(actions.getLoadedFieldReportFailure(null).type).toEqual('JobBase Loaded field report Failure');
	});
	it('returns LOAD_JOB_CODES', () => {
		expect(actions.loadJobCodes().type).toEqual('[JobCodeBase] Load job codes');
	});
	it('returns LOAD_JOB_CODES_SUCCESS', () => {
		expect(actions.loadJobCodesSuccess(null).type).toEqual('[JobCodeBase] Load job codes Success');
	});
	it('returns LOAD_JOB_CODES_FAILURE', () => {
		expect(actions.loadJobCodesFailure('tony').type).toEqual('[JobCodeBase] Load job codes Failure');
	});
	it('returns LOAD_JOB_CATEGORIES', () => {
		expect(actions.loadJobCategories().type).toEqual('[JobCodeBase] Load job categories');
	});
	it('returns LOAD_JOB_CATEGORIES_SUCCESS', () => {
		expect(actions.loadJobCategoriesSuccess(null).type).toEqual('[JobCodeBase] Load job categories Success');
	});
	it('returns LOAD_JOB_CATEGORIES_FAILURE', () => {
		expect(actions.loadJobCategoriesFailure('tony').type).toEqual('[JobCodeBase] Load job categories Failure');
	});
	it('returns LOAD_JOB_CATEGORY', () => {
		expect(actions.loadJobCategory(null).type).toEqual('[JobCodeBase] Load job category');
	});
	it('returns LOAD_JOB_CATEGORY_SUCCESS', () => {
		expect(actions.loadJobCategorySuccess(null).type).toEqual('[JobCodeBase] Load job category Success');
	});
	it('returns LOAD_JOB_CATEGORY_FAILURE', () => {
		expect(actions.loadJobCategoryFailure('tony').type).toEqual('[JobCodeBase] Load job category Failure');
	});
	it('returns ADD_JOB_CODE', () => {
		expect(actions.addJobCode('tony').type).toEqual('JobCodeBase add job code');
		expect(actions.addJobCode('tony').payload).toEqual('tony');
	});
	it('returns ADD_JOB_CODE_SUCCESS', () => {
		expect(actions.addJobCodeSuccess('tony').type).toEqual('JobCodeBase add job code Success');
		expect(actions.addJobCodeSuccess('tony').payload).toEqual('tony');
	});
	it('returns ADD_JOB_CODE_FAILURE', () => {
		expect(actions.addJobCodeFailure('tony').type).toEqual('JobCodeBase add job code Failure');
		expect(actions.addJobCodeFailure('tony').payload).toEqual({error:'tony'});
	});
	it('returns REMOVE_JOB_CODE', () => {
		expect(actions.removeJobCode('tony').type).toEqual('JobCodeBase remove job code');
		expect(actions.removeJobCode('tony').payload).toEqual('tony');
	});
	it('returns REMOVE_JOB_CODE_SUCCESS', () => {
		expect(actions.removeJobCodeSuccess('tony').type).toEqual('JobCodeBase remove job code Success');
		expect(actions.removeJobCodeSuccess('tony').payload).toEqual('tony');
	});
	it('returns REMOVE_JOB_CODE_FAILURE', () => {
		expect(actions.removeJobCodeFailure('tony').type).toEqual('JobCodeBase remove job code Failure');
		expect(actions.removeJobCodeFailure('tony').payload).toEqual({error:'tony'});
	});
	it('returns SAVE_FIELD_REPORT', () => {
		expect(actions.saveFieldReport(['tony', 't']).type).toEqual('JobBase Save field report');
		expect(actions.saveFieldReport(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns SAVE_FIELD_REPORT_SUCCESS', () => {
		expect(actions.saveFieldReportSuccess(['tony', 't']).type).toEqual('JobBase Save field report Success');
		expect(actions.saveFieldReportSuccess(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns SAVE_FIELD_REPORT_FAILURE', () => {
		expect(actions.saveFieldReportFailure('tony').type).toEqual('JobBase Save field report Failure');
		expect(actions.saveFieldReportFailure('tony').payload).toEqual({error:'tony'});
	});
	it('returns ADD_FIELD_REPORT', () => {
		expect(actions.addFieldReport(['tony', 't']).type).toEqual('JobBase Add field report');
		expect(actions.addFieldReport(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns ADD_FIELD_REPORT_SUCCESS', () => {
		expect(actions.addFieldReportSuccess(['tony', 't']).type).toEqual('JobBase Add field report Success');
		expect(actions.addFieldReportSuccess(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns ADD_FIELD_REPORT_FAILURE', () => {
		expect(actions.addFieldReportFailure('tony').type).toEqual('JobBase Add field report Failure');
		expect(actions.addFieldReportFailure('tony').payload).toEqual({error:'tony'});
	});
	it('returns DELETE_FIELD_REPORT', () => {
		expect(actions.deleteFieldReport(['tony', 't']).type).toEqual('JobBase Delete field report');
		expect(actions.deleteFieldReport(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns DELETE_FIELD_REPORT_SUCCESS', () => {
		expect(actions.deleteFieldReportSuccess(['tony', 't']).type).toEqual('JobBase Delete field report Success');
		expect(actions.deleteFieldReportSuccess(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns DELETE_FIELD_REPORT_FAILURE', () => {
		expect(actions.deleteFieldReportFailure('tony').type).toEqual('JobBase Delete field report Failure');
		expect(actions.deleteFieldReportFailure('tony').payload).toEqual({error:'tony'});
	});
	it('returns COPY_FIELD_REPORT', () => {
		expect(actions.copyFieldReport(['tony', 't']).type).toEqual('JobBase Copy field report');
		expect(actions.copyFieldReport(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns COPY_FIELD_REPORT_SUCCESS', () => {
		expect(actions.copyFieldReportSuccess(['tony', 't']).type).toEqual('JobBase Copy field report Success');
		expect(actions.copyFieldReportSuccess(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns COPY_FIELD_REPORT_FAILURE', () => {
		expect(actions.copyFieldReportFailure('tony').type).toEqual('JobBase Copy field report Failure');
		expect(actions.copyFieldReportFailure('tony').payload).toEqual({error:'tony'});
	});
	it('returns SEND_FIELD_REPORT', () => {
		expect(actions.sendFieldReport(['tony', 't']).type).toEqual('JobBase Send field report');
		expect(actions.sendFieldReport(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns SEND_FIELD_REPORT_SUCCESS', () => {
		expect(actions.sendFieldReportSuccess(['tony', 't']).type).toEqual('JobBase Send field report Success');
		expect(actions.sendFieldReportSuccess(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns SEND_FIELD_REPORT_FAILURE', () => {
		expect(actions.sendFieldReportFailure('tony').type).toEqual('JobBase Send field report Failure');
		expect(actions.sendFieldReportFailure('tony').payload).toEqual({error:'tony'});
	});
	it('returns FLAG_FIELD_REPORT', () => {
		expect(actions.flagFieldReport(['tony', 't']).type).toEqual('JobBase Flag field report');
		expect(actions.flagFieldReport(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns FLAG_FIELD_REPORT_SUCCESS', () => {
		expect(actions.flagFieldReportSuccess(['tony', 't']).type).toEqual('JobBase Flag field report Success');
		expect(actions.flagFieldReportSuccess(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns FLAG_FIELD_REPORT_FAILURE', () => {
		expect(actions.flagFieldReportFailure('tony').type).toEqual('JobBase Flag field report Failure');
		expect(actions.flagFieldReportFailure('tony').payload).toEqual({error:'tony'});
	});
	it('returns UPDATE_FIELD_REPORT_CATEGORY', () => {
		expect(actions.updateFieldReportCategory(['tony', 't']).type).toEqual('JobBase Update field report category');
		expect(actions.updateFieldReportCategory(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns UPDATE_FIELD_REPORT_CATEGORY_SUCCESS', () => {
		expect(actions.updateFieldReportCategorySuccess(['tony', 't']).type).toEqual('JobBase Update field report category Success');
		expect(actions.updateFieldReportCategorySuccess(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns UPDATE_FIELD_REPORT_CATEGORY_FAILURE', () => {
		expect(actions.updateFieldReportCategoryFailure('tony').type).toEqual('JobBase Update field report category Failure');
		expect(actions.updateFieldReportCategoryFailure('tony').payload).toEqual({error:'tony'});
	});


	it('returns LOAD_PROJECTS', () => {
		expect(actions.loadProjects(null).type).toEqual('Load projects');
	});
	it('returns LOAD_PROJECTS_SUCCESS', () => {
		expect(actions.loadProjectsSuccess(null).type).toEqual('Load projects Success');
	});
	it('returns LOAD_PROJECTS_FAILURE', () => {
		expect(actions.loadProjectsFailure('tony').type).toEqual('Load projects Failure');
	});
	
	it('returns LOAD_PROJECT', () => {
		expect(actions.loadProject(null).type).toEqual('Load project');
	});
	it('returns LOAD_PROJECT_SUCCESS', () => {
		expect(actions.loadProjectSuccess(null).type).toEqual('Load project Success');
	});
	it('returns LOAD_PROJECT_FAILURE', () => {
		expect(actions.loadProjectFailure('tony').type).toEqual('Load project Failure');
	});

	it('returns SAVE_PROJECT', () => {
		expect(actions.saveProject(null).type).toEqual('Save project');
	});
	it('returns SAVE_PROJECT_SUCCESS', () => {
		expect(actions.saveProjectSuccess(null).type).toEqual('Save project Success');
	});
	it('returns SAVE_PROJECT_FAILURE', () => {
		expect(actions.saveProjectFailure('tony').type).toEqual('Save project Failure');
	});

	it('returns DELETE_PROJECT', () => {
		expect(actions.deleteProject(null).type).toEqual('Delete project');
	});
	it('returns DELETE_PROJECT_SUCCESS', () => {
		expect(actions.deleteProjectSuccess(null).type).toEqual('Delete project Success');
	});
	it('returns DELETE_PROJECT_FAILURE', () => {
		expect(actions.deleteProjectFailure('tony').type).toEqual('Delete project Failure');
	});

	it('returns LOAD_CATEGORIES', () => {
		expect(actions.loadCategories(null).type).toEqual('Load categories');
	});
	it('returns LOAD_CATEGORIES_SUCCESS', () => {
		expect(actions.loadCategoriesSuccess(null).type).toEqual('Load categories Success');
	});
	it('returns LOAD_CATEGORIES_FAILURE', () => {
		expect(actions.loadCategoriesFailure('tony').type).toEqual('Load categories Failure');
	});
	
	it('returns LOAD_CATEGORY', () => {
		expect(actions.loadCategory(null).type).toEqual('Load category');
	});
	it('returns LOAD_CATEGORY_SUCCESS', () => {
		expect(actions.loadCategorySuccess(null).type).toEqual('Load category Success');
	});
	it('returns LOAD_CATEGORY_FAILURE', () => {
		expect(actions.loadCategoryFailure('tony').type).toEqual('Load category Failure');
	});

	it('returns SAVE_CATEGORY', () => {
		expect(actions.saveCategory(null).type).toEqual('Save category');
	});
	it('returns SAVE_CATEGORY_SUCCESS', () => {
		expect(actions.saveCategorySuccess(null).type).toEqual('Save category Success');
	});
	it('returns SAVE_CATEGORY_FAILURE', () => {
		expect(actions.saveCategoryFailure('tony').type).toEqual('Save category Failure');
	});

	it('returns DELETE_CATEGORY', () => {
		expect(actions.deleteCategory(null).type).toEqual('Delete category');
	});
	it('returns DELETE_CATEGORY_SUCCESS', () => {
		expect(actions.deleteCategorySuccess(null).type).toEqual('Delete category Success');
	});
	it('returns DELETE_CATEGORY_FAILURE', () => {
		expect(actions.deleteCategoryFailure('tony').type).toEqual('Delete category Failure');
	});

	it('returns LOAD_JOBS', () => {
		expect(actions.loadJobs(null).type).toEqual('Load jobs');
	});
	it('returns LOAD_JOBS_SUCCESS', () => {
		expect(actions.loadJobsSuccess(null).type).toEqual('Load jobs Success');
	});
	it('returns LOAD_JOBS_FAILURE', () => {
		expect(actions.loadJobsFailure('tony').type).toEqual('Load jobs Failure');
	});
	
	it('returns LOAD_JOB', () => {
		expect(actions.loadJob(null).type).toEqual('Load job');
	});
	it('returns LOAD_JOB_SUCCESS', () => {
		expect(actions.loadJobSuccess(null).type).toEqual('Load job Success');
	});
	it('returns LOAD_JOB_FAILURE', () => {
		expect(actions.loadJobFailure('tony').type).toEqual('Load job Failure');
	});

	it('returns SAVE_JOB', () => {
		expect(actions.saveJob(null).type).toEqual('Save job');
	});
	it('returns SAVE_JOB_SUCCESS', () => {
		expect(actions.saveJobSuccess(null).type).toEqual('Save job Success');
	});
	it('returns SAVE_JOB_FAILURE', () => {
		expect(actions.saveJobFailure('tony').type).toEqual('Save job Failure');
	});

	it('returns DELETE_JOB', () => {
		expect(actions.deleteJob(null).type).toEqual('Delete job');
	});
	it('returns DELETE_JOB_SUCCESS', () => {
		expect(actions.deleteJobSuccess(null).type).toEqual('Delete job Success');
	});
	it('returns DELETE_JOB_FAILURE', () => {
		expect(actions.deleteJobFailure('tony').type).toEqual('Delete job Failure');
	});

	it('returns LOAD_FORMS', () => {
		expect(actions.loadJobs(null).type).toEqual('Load jobs');
	});
	it('returns LOAD_FORMS_SUCCESS', () => {
		expect(actions.loadJobsSuccess(null).type).toEqual('Load jobs Success');
	});
	it('returns LOAD_FORMS_FAILURE', () => {
		expect(actions.loadJobsFailure('tony').type).toEqual('Load jobs Failure');
	});
	
	it('returns LOAD_FORM', () => {
		expect(actions.loadForm(null).type).toEqual('Load Form');
	});
	it('returns LOAD_FORM_SUCCESS', () => {
		expect(actions.loadFormSuccess(null).type).toEqual('Load Form Success');
	});
	it('returns LOAD_FORM_FAILURE', () => {
		expect(actions.loadFormFailure('tony').type).toEqual('Load Form Failure');
	});

	it('returns SAVE_FORM', () => {
		expect(actions.saveForm(null).type).toEqual('Save Form');
	});
	it('returns SAVE_FORM_SUCCESS', () => {
		expect(actions.saveFormSuccess(null).type).toEqual('Save Form Success');
	});
	it('returns SAVE_FORM_FAILURE', () => {
		expect(actions.saveFormFailure('tony').type).toEqual('Save Form Failure');
	});

	it('returns DELETE_FORM', () => {
		expect(actions.deleteForm(null).type).toEqual('Delete Form');
	});
	it('returns DELETE_FORM_SUCCESS', () => {
		expect(actions.deleteFormSuccess(null).type).toEqual('Delete Form Success');
	});
	it('returns DELETE_FORM_FAILURE', () => {
		expect(actions.deleteFormFailure('tony').type).toEqual('Delete Form Failure');
	});



});