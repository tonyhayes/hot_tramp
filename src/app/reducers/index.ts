import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import { userAdministrationReducer, AdministrationUsersState } from './user-administration/user-administration.reducer';
import { userSelectionReducer, AdministrationUserState} from './user-administration/user-selection.reducer';
import { userAddReducer, AdministrationUserAddState} from './user-administration/user-add.reducer';
import { userDeleteReducer, AdministrationUserDeleteState} from './user-administration/user-delete.reducer';
import { licenseAdministrationReducer, AdministrationLicenseState } from './user-administration/license-administration.reducer';
import { userLicenseReducer, UserLicenseState } from './user-administration/user-license.reducer';

import { addFieldReportReducer, AddFieldReportState } from './project-management/field-report-add.reducer';
import { saveFieldReportReducer, SaveFieldReportState } from './project-management/field-report-save.reducer';
import { deleteFieldReportReducer, DeleteFieldReportState } from './project-management/field-report-delete.reducer';
import { loadFieldReportReducer, LoadFieldReportState } from './project-management/field-report-load.reducer';
import { sendFieldReportReducer, SendFieldReportState } from './project-management/field-report-send.reducer';
import { loadedFieldReportReducer, LoadedFieldReportState } from './project-management/field-report-loaded.reducer';
import { loadFieldReportsReducer, LoadFieldReportsState } from './project-management/field-reports-load.reducer';
import { loadSubmittedFieldReportsReducer, LoadSubmittedFieldReportsState } from './project-management/submitted-field-reports-load.reducer';
import { loadedFieldReportsReducer, LoadedFieldReportsState } from './project-management/field-reports-loaded.reducer';
import { jobCodesReducer, JobCodeState } from './project-management/job-codes.reducer';
import { jobCategoriesReducer, JobCategoriesState } from './project-management/job-categories.reducer';
import { jobCategoryReducer, JobCategoryState } from './project-management/job-category.reducer';
import { updateFieldReportCategoryReducer, UpdateFieldReportCategoryState  } from './project-management/field-report-update-category.reducer';

import { saveProjectReducer, SaveProjectState } from './project-management/project-save.reducer';
import { deleteProjectReducer, DeleteProjectState } from './project-management/project-delete.reducer';
import { loadProjectReducer, LoadProjectState } from './project-management/project-load.reducer';
import { loadProjectsReducer, LoadProjectsState } from './project-management/projects-load.reducer';

import { saveCategoryReducer, SaveCategoryState } from './project-management/category-save.reducer';
import { deleteCategoryReducer, DeleteCategoryState } from './project-management/category-delete.reducer';
import { loadCategoryReducer, LoadCategoryState } from './project-management/category-load.reducer';
import { loadCategoriesReducer, LoadCategoriesState } from './project-management/categories-load.reducer';

import { saveFormReducer, SaveFormState } from './project-management/form-save.reducer';
import { deleteFormReducer, DeleteFormState } from './project-management/form-delete.reducer';
import { loadFormReducer, LoadFormState } from './project-management/form-load.reducer';
import { loadFormsReducer, LoadFormsState } from './project-management/forms-load.reducer';

import { saveJobReducer, SaveJobState } from './project-management/job-save.reducer';
import { deleteJobReducer, DeleteJobState } from './project-management/job-delete.reducer';
import { loadJobReducer, LoadJobState } from './project-management/job-load.reducer';
import { loadJobsReducer, LoadJobsState } from './project-management/jobs-load.reducer';

import { questionsReducer, QuestionState } from './dynamic-forms/questions.reducer';
import { questionsFormReducer, QuestionFormState } from './dynamic-forms/questions-form.reducer';

import { loadWeatherReducer, LoadWeatherState } from './weather/weather-load.reducer';

export interface AppState {
    userAdministration: AdministrationUsersState;
    userSelection: AdministrationUserState;
    userAdd: AdministrationUserAddState;
    userDelete: AdministrationUserDeleteState;
    licenseAdministration: AdministrationLicenseState;
    userLicense: UserLicenseState;

    addFieldReport: AddFieldReportState;
    saveFieldReport: SaveFieldReportState;
    deleteFieldReport: DeleteFieldReportState;
    loadFieldReport: LoadFieldReportState;
    sendFieldReport: SendFieldReportState;
    loadFieldReports: LoadFieldReportsState;
    loadSubmittedFieldReports: LoadSubmittedFieldReportsState;
    loadedFieldReport: LoadedFieldReportState;
    loadedFieldReports: LoadedFieldReportsState;
    jobCode: JobCodeState;
    jobCategories: JobCategoriesState;
    jobCategory: JobCategoryState;
    updateFieldReportCategory: UpdateFieldReportCategoryState;

    saveProject: SaveProjectState;
    deleteProject: DeleteProjectState;
    loadProject: LoadProjectState;
    loadProjects: LoadProjectsState;

    saveCategory: SaveCategoryState;
    deleteCategory: DeleteCategoryState;
    loadCategory: LoadCategoryState;
    loadCategories: LoadCategoriesState;

    saveForm: SaveFormState;
    deleteForm: DeleteFormState;
    loadForm: LoadFormState;
    loadForms: LoadFormsState;

    saveJob: SaveJobState;
    deleteJob: DeleteJobState;
    loadJob: LoadJobState;
    loadJobs: LoadJobsState;

    questions: QuestionState;
    formQuestions: QuestionFormState;

    loadWeather: LoadWeatherState;
 
}
const reducers = compose(combineReducers)({
    userAdministration: userAdministrationReducer,
    userSelection: userSelectionReducer,
    userAdd: userAddReducer,
    userDelete: userDeleteReducer,
    licenseAdministration: licenseAdministrationReducer,
    userLicense: userLicenseReducer,

    addFieldReport: addFieldReportReducer,
    saveFieldReport: saveFieldReportReducer,
    deleteFieldReport: deleteFieldReportReducer,
    loadFieldReport: loadFieldReportReducer,
    sendFieldReport: sendFieldReportReducer,
    loadFieldReports: loadFieldReportsReducer,
    loadSubmittedFieldReports: loadSubmittedFieldReportsReducer,
    loadedFieldReport: loadedFieldReportReducer,
    loadedFieldReports: loadedFieldReportsReducer,
    jobCode: jobCodesReducer,
    jobCategories: jobCategoriesReducer,
    jobCategory: jobCategoryReducer,
    updateFieldReportCategory: updateFieldReportCategoryReducer,

    saveProject: saveProjectReducer,
    deleteProject: deleteProjectReducer,
    loadProject: loadProjectReducer,
    loadProjects: loadProjectsReducer,

    saveCategory: saveCategoryReducer,
    deleteCategory: deleteCategoryReducer,
    loadCategory: loadCategoryReducer,
    loadCategories: loadCategoriesReducer,

    saveForm: saveFormReducer,
    deleteForm: deleteFormReducer,
    loadForm: loadFormReducer,
    loadForms: loadFormsReducer,

    saveJob: saveJobReducer,
    deleteJob: deleteJobReducer,
    loadJob: loadJobReducer,
    loadJobs: loadJobsReducer,

    questions: questionsReducer,
    formQuestions: questionsFormReducer,

    loadWeather: loadWeatherReducer,

});

export function reducer(state: any, action: any) {
    return reducers(state, action);
}