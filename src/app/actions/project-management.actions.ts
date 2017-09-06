import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ProjectManagementActions {
    static LOAD_FIELD_REPORTS = '[JobBase] Load field reports';
    loadFieldReports(): Action {
        return {
            type: ProjectManagementActions.LOAD_FIELD_REPORTS,
        };
    }

    static LOAD_FIELD_REPORTS_SUCCESS = '[JobBase] Load field reports Success';
    loadFieldReportsSuccess(jobs): Action {
        return {
            type: ProjectManagementActions.LOAD_FIELD_REPORTS_SUCCESS,
            payload: jobs
        };
    }
    static LOAD_FIELD_REPORTS_FAILURE = '[JobBase] Load field reports Failure';
    loadFieldReportsFailure(error): Action {
        return {
            type: ProjectManagementActions.LOAD_FIELD_REPORTS_FAILURE,
            payload: { error: error }
        };
    }
    static LOAD_SUBMITTED_FIELD_REPORTS = '[JobBase] Load submitted field reports';
    loadSubmittedFieldReports(): Action {
        return {
            type: ProjectManagementActions.LOAD_SUBMITTED_FIELD_REPORTS,
        };
    }

    static LOAD_SUBMITTED_FIELD_REPORTS_SUCCESS = '[JobBase] Load submitted field reports Success';
    loadSubmittedFieldReportsSuccess(jobs): Action {
        return {
            type: ProjectManagementActions.LOAD_SUBMITTED_FIELD_REPORTS_SUCCESS,
            payload: jobs
        };
    }
    static LOAD_SUBMITTED_FIELD_REPORTS_FAILURE = '[JobBase] Load submitted field reports Failure';
    loadSubmittedFieldReportsFailure(error): Action {
        return {
            type: ProjectManagementActions.LOAD_SUBMITTED_FIELD_REPORTS_FAILURE,
            payload: { error: error }
        };
    }
    static LOAD_FIELD_REPORT = 'JobBase Load field report';
    loadFieldReport(reportArray): Action {
        return {
            type: ProjectManagementActions.LOAD_FIELD_REPORT,
            payload: reportArray
        };
    }

    static LOAD_FIELD_REPORT_SUCCESS = 'JobBase Load field report Success';
    loadFieldReportSuccess(fieldReport): Action {
        return {
            type: ProjectManagementActions.LOAD_FIELD_REPORT_SUCCESS,
            payload: fieldReport
        };
    }

    static LOAD_FIELD_REPORT_FAILURE = 'JobBase Load field report Failure';
    loadFieldReportFailure(error): Action {
        return {
            type: ProjectManagementActions.LOAD_FIELD_REPORT_FAILURE,
            payload: { error: error }
        };
    }
    static GET_LOADED_FIELD_REPORTS = 'JobBase Loaded field reports';
    getLoadedFieldReports(): Action {
        return {
            type: ProjectManagementActions.GET_LOADED_FIELD_REPORTS,
        };
    }

    static GET_LOADED_FIELD_REPORTS_SUCCESS = 'JobBase Loaded field reports Success';
    getLoadedFieldReportsSuccess(fieldReports): Action {
        return {
            type: ProjectManagementActions.GET_LOADED_FIELD_REPORTS_SUCCESS,
            payload: fieldReports
        };
    }

    static GET_LOADED_FIELD_REPORTS_FAILURE = 'JobBase Loaded field reports Failure';
    getLoadedFieldReportsFailure(error): Action {
        return {
            type: ProjectManagementActions.GET_LOADED_FIELD_REPORTS_FAILURE,
            payload: { error: error }
        };
    }
    static GET_LOADED_FIELD_REPORT = 'JobBase Loaded field report';
    getLoadedFieldReport(): Action {
        return {
            type: ProjectManagementActions.GET_LOADED_FIELD_REPORT,
        };
    }

    static GET_LOADED_FIELD_REPORT_SUCCESS = 'JobBase Loaded field report Success';
    getLoadedFieldReportSuccess(fieldReport): Action {
        return {
            type: ProjectManagementActions.GET_LOADED_FIELD_REPORT_SUCCESS,
            payload: fieldReport
        };
    }

    static GET_LOADED_FIELD_REPORT_FAILURE = 'JobBase Loaded field report Failure';
    getLoadedFieldReportFailure(error): Action {
        return {
            type: ProjectManagementActions.GET_LOADED_FIELD_REPORT_FAILURE,
            payload: { error: error }
        };
    }
    static LOAD_JOB_CATEGORIES = '[JobCodeBase] Load job categories';
    loadJobCategories(job): Action {
        return {
            type: ProjectManagementActions.LOAD_JOB_CATEGORIES,
            payload: job
        };
    }

    static LOAD_JOB_CATEGORIES_SUCCESS = '[JobCodeBase] Load job categories Success';
    loadJobCategoriesSuccess(jobCodes): Action {
        return {
            type: ProjectManagementActions.LOAD_JOB_CATEGORIES_SUCCESS,
            payload: jobCodes
        };
    }
    static LOAD_JOB_CATEGORIES_FAILURE = '[JobCodeBase] Load job categories Failure';
    loadJobCategoriesFailure(error): Action {
        return {
            type: ProjectManagementActions.LOAD_JOB_CATEGORIES_FAILURE,
            payload: {error: error}
        };
    }
    static LOAD_JOB_CATEGORY = '[JobCodeBase] Load job category';
    loadJobCategory(jobCategory): Action {
        return {
            type: ProjectManagementActions.LOAD_JOB_CATEGORY,
            payload: jobCategory
        };
    }

    static LOAD_JOB_CATEGORY_SUCCESS = '[JobCodeBase] Load job category Success';
    loadJobCategorySuccess(category): Action {
        return {
            type: ProjectManagementActions.LOAD_JOB_CATEGORY_SUCCESS,
            payload: category
        };
    }
    static LOAD_JOB_CATEGORY_FAILURE = '[JobCodeBase] Load job category Failure';
    loadJobCategoryFailure(error): Action {
        return {
            type: ProjectManagementActions.LOAD_JOB_CATEGORY_FAILURE,
            payload: {error: error}
        };
    }

    static LOAD_JOB_CODES = '[JobCodeBase] Load job codes';
    loadJobCodes(): Action {
        return {
            type: ProjectManagementActions.LOAD_JOB_CODES,
        };
    }

    static LOAD_JOB_CODES_SUCCESS = '[JobCodeBase] Load job codes Success';
    loadJobCodesSuccess(jobCodes): Action {
        return {
            type: ProjectManagementActions.LOAD_JOB_CODES_SUCCESS,
            payload: jobCodes
        };
    }
    static LOAD_JOB_CODES_FAILURE = '[JobCodeBase] Load job codes Failure';
    loadJobCodesFailure(error): Action {
        return {
            type: ProjectManagementActions.LOAD_JOB_CODES_FAILURE,
            payload: {error: error}
        };
    }

    static ADD_JOB_CODE = 'JobCodeBase add job code';
    addJobCode(jobCode): Action {
        return {
            type: ProjectManagementActions.ADD_JOB_CODE,
            payload: jobCode
        };
    }

    static ADD_JOB_CODE_SUCCESS = 'JobCodeBase add job code Success';
    addJobCodeSuccess(jobCode): Action {
        return {
            type: ProjectManagementActions.ADD_JOB_CODE_SUCCESS,
            payload: jobCode
        };
    }
    static ADD_JOB_CODE_FAILURE = 'JobCodeBase add job code Failure';
    addJobCodeFailure(error): Action {
        return {
            type: ProjectManagementActions.ADD_JOB_CODE_FAILURE,
            payload: ({error: error})
        };
    }
    static REMOVE_JOB_CODE = 'JobCodeBase remove job code';
    removeJobCode(jobCode): Action {
        return {
            type: ProjectManagementActions.REMOVE_JOB_CODE,
            payload: jobCode
        };
    }

    static REMOVE_JOB_CODE_SUCCESS = 'JobCodeBase remove job code Success';
    removeJobCodeSuccess(jobCode): Action {
        return {
            type: ProjectManagementActions.REMOVE_JOB_CODE_SUCCESS,
            payload: jobCode
        };
    }
    static REMOVE_JOB_CODE_FAILURE = 'JobCodeBase remove job code Failure';
    removeJobCodeFailure(error): Action {
        return {
            type: ProjectManagementActions.REMOVE_JOB_CODE_FAILURE,
            payload: ({error: error})
        };
    }
    static SAVE_FIELD_REPORT = 'JobBase Save field report';
    saveFieldReport(fieldReport): Action {
        return {
            type: ProjectManagementActions.SAVE_FIELD_REPORT,
            payload: fieldReport
        };
    }

    static SAVE_FIELD_REPORT_SUCCESS = 'JobBase Save field report Success';
    saveFieldReportSuccess(fieldReport): Action {
        return {
            type: ProjectManagementActions.SAVE_FIELD_REPORT_SUCCESS,
            payload: fieldReport
        };
    }
    static SAVE_FIELD_REPORT_FAILURE = 'JobBase Save field report Failure';
    saveFieldReportFailure(error): Action {
        return {
            type: ProjectManagementActions.SAVE_FIELD_REPORT_FAILURE,
            payload: ({error: error})
        };
    }
    static ADD_FIELD_REPORT = 'JobBase Add field report';
    addFieldReport(fieldReport): Action {
        return {
            type: ProjectManagementActions.ADD_FIELD_REPORT,
            payload: fieldReport
        };
    }

    static ADD_FIELD_REPORT_SUCCESS = 'JobBase Add field report Success';
    addFieldReportSuccess(fieldReport): Action {
        return {
            type: ProjectManagementActions.ADD_FIELD_REPORT_SUCCESS,
            payload: fieldReport
        };
    }
    static ADD_FIELD_REPORT_FAILURE = 'JobBase Add field report Failure';
    addFieldReportFailure(error): Action {
        return {
            type: ProjectManagementActions.ADD_FIELD_REPORT_FAILURE,
            payload: {error: error}
        };
    }
    static DELETE_FIELD_REPORT = 'JobBase Delete field report';
    deleteFieldReport(fieldReport): Action {
        return {
            type: ProjectManagementActions.DELETE_FIELD_REPORT,
            payload: fieldReport
        };
    }

    static DELETE_FIELD_REPORT_SUCCESS = 'JobBase Delete field report Success';
    deleteFieldReportSuccess(message): Action {
        return {
            type: ProjectManagementActions.DELETE_FIELD_REPORT_SUCCESS,
            payload: message
        };
    }
    static DELETE_FIELD_REPORT_FAILURE = 'JobBase Delete field report Failure';
    deleteFieldReportFailure(error): Action {
        return {
            type: ProjectManagementActions.DELETE_FIELD_REPORT_FAILURE,
            payload: {error: error}
        };
    }
    static COPY_FIELD_REPORT = 'JobBase Copy field report';
    copyFieldReport(fieldReport): Action {
        return {
            type: ProjectManagementActions.COPY_FIELD_REPORT,
            payload: fieldReport
        };
    }

    static COPY_FIELD_REPORT_SUCCESS = 'JobBase Copy field report Success';
    copyFieldReportSuccess(message): Action {
        return {
            type: ProjectManagementActions.COPY_FIELD_REPORT_SUCCESS,
            payload: message
        };
    }
    static COPY_FIELD_REPORT_FAILURE = 'JobBase Copy field report Failure';
    copyFieldReportFailure(error): Action {
        return {
            type: ProjectManagementActions.COPY_FIELD_REPORT_FAILURE,
            payload: {error: error}
        };
    }
    static SEND_FIELD_REPORT = 'JobBase Send field report';
    sendFieldReport(fieldReport): Action {
        return {
            type: ProjectManagementActions.SEND_FIELD_REPORT,
            payload: fieldReport
        };
    }

    static SEND_FIELD_REPORT_SUCCESS = 'JobBase Send field report Success';
    sendFieldReportSuccess(message): Action {
        return {
            type: ProjectManagementActions.SEND_FIELD_REPORT_SUCCESS,
            payload: message
        };
    }
    static SEND_FIELD_REPORT_FAILURE = 'JobBase Send field report Failure';
    sendFieldReportFailure(error): Action {
        return {
            type: ProjectManagementActions.SEND_FIELD_REPORT_FAILURE,
            payload: {error: error}
        };
    }
    static FLAG_FIELD_REPORT = 'JobBase Flag field report';
    flagFieldReport(fieldReport): Action {
        return {
            type: ProjectManagementActions.FLAG_FIELD_REPORT,
            payload: fieldReport
        };
    }

    static FLAG_FIELD_REPORT_SUCCESS = 'JobBase Flag field report Success';
    flagFieldReportSuccess(message): Action {
        return {
            type: ProjectManagementActions.FLAG_FIELD_REPORT_SUCCESS,
            payload: message
        };
    }
    static FLAG_FIELD_REPORT_FAILURE = 'JobBase Flag field report Failure';
    flagFieldReportFailure(error): Action {
        return {
            type: ProjectManagementActions.FLAG_FIELD_REPORT_FAILURE,
            payload: {error: error}
        };
    }
    static UPDATE_FIELD_REPORT_CATEGORY = 'JobBase Update field report category';
    updateFieldReportCategory(fieldReportCategoryObject): Action {
        return {
            type: ProjectManagementActions.UPDATE_FIELD_REPORT_CATEGORY,
            payload: fieldReportCategoryObject
        };
    }

    static UPDATE_FIELD_REPORT_CATEGORY_SUCCESS = 'JobBase Update field report category Success';
    updateFieldReportCategorySuccess(fieldReport): Action {
        return {
            type: ProjectManagementActions.UPDATE_FIELD_REPORT_CATEGORY_SUCCESS,
            payload: fieldReport
        };
    }
    static UPDATE_FIELD_REPORT_CATEGORY_FAILURE = 'JobBase Update field report category Failure';
    updateFieldReportCategoryFailure(error): Action {
        return {
            type: ProjectManagementActions.UPDATE_FIELD_REPORT_CATEGORY_FAILURE,
            payload: {error: error}
        };
    }





    static LOAD_PROJECTS = 'Load projects';
    loadProjects(): Action {
        return {
            type: ProjectManagementActions.LOAD_PROJECTS,
        };
    }

    static LOAD_PROJECTS_SUCCESS = 'Load projects Success';
    loadProjectsSuccess(projects): Action {
        return {
            type: ProjectManagementActions.LOAD_PROJECTS_SUCCESS,
            payload: projects
        };
    }
    static LOAD_PROJECTS_FAILURE = 'Load projects Failure';
    loadProjectsFailure(error): Action {
        return {
            type: ProjectManagementActions.LOAD_PROJECTS_FAILURE,
            payload: { error: error }
        };
    }
    static LOAD_PROJECT = 'Load project';
    loadProject(project): Action {
        return {
            type: ProjectManagementActions.LOAD_PROJECT,
            payload: project
        };
    }

    static LOAD_PROJECT_SUCCESS = 'Load project Success';
    loadProjectSuccess(project): Action {
        return {
            type: ProjectManagementActions.LOAD_PROJECT_SUCCESS,
            payload: project
        };
    }

    static LOAD_PROJECT_FAILURE = 'Load project Failure';
    loadProjectFailure(error): Action {
        return {
            type: ProjectManagementActions.LOAD_PROJECT_FAILURE,
            payload: { error: error }
        };
    }
    static SAVE_PROJECT = 'Save project';
    saveProject(project): Action {
        return {
            type: ProjectManagementActions.SAVE_PROJECT,
            payload: project
        };
    }

    static SAVE_PROJECT_SUCCESS = 'Save project Success';
    saveProjectSuccess(project): Action {
        return {
            type: ProjectManagementActions.SAVE_PROJECT_SUCCESS,
            payload: project
        };
    }

    static SAVE_PROJECT_FAILURE = 'Save project Failure';
    saveProjectFailure(error): Action {
        return {
            type: ProjectManagementActions.SAVE_PROJECT_FAILURE,
            payload: { error: error }
        };
    }
    static DELETE_PROJECT = 'Delete project';
    deleteProject(project): Action {
        return {
            type: ProjectManagementActions.DELETE_PROJECT,
            payload: project
        };
    }

    static DELETE_PROJECT_SUCCESS = 'Delete project Success';
    deleteProjectSuccess(project): Action {
        return {
            type: ProjectManagementActions.DELETE_PROJECT_SUCCESS,
            payload: project
        };
    }

    static DELETE_PROJECT_FAILURE = 'Delete project Failure';
    deleteProjectFailure(error): Action {
        return {
            type: ProjectManagementActions.DELETE_PROJECT_FAILURE,
            payload: { error: error }
        };
    }

    static LOAD_CATEGORIES = 'Load categories';
    loadCategories(): Action {
        return {
            type: ProjectManagementActions.LOAD_CATEGORIES,
        };
    }

    static LOAD_CATEGORIES_SUCCESS = 'Load categories Success';
    loadCategoriesSuccess(categories): Action {
        return {
            type: ProjectManagementActions.LOAD_CATEGORIES_SUCCESS,
            payload: categories
        };
    }
    static LOAD_CATEGORIES_FAILURE = 'Load categories Failure';
    loadCategoriesFailure(error): Action {
        return {
            type: ProjectManagementActions.LOAD_CATEGORIES_FAILURE,
            payload: { error: error }
        };
    }
    static LOAD_CATEGORY = 'Load category';
    loadCategory(category): Action {
        return {
            type: ProjectManagementActions.LOAD_CATEGORY,
            payload: category
        };
    }

    static LOAD_CATEGORY_SUCCESS = 'Load category Success';
    loadCategorySuccess(category): Action {
        return {
            type: ProjectManagementActions.LOAD_CATEGORY_SUCCESS,
            payload: category
        };
    }

    static LOAD_CATEGORY_FAILURE = 'Load category Failure';
    loadCategoryFailure(error): Action {
        return {
            type: ProjectManagementActions.LOAD_CATEGORY_FAILURE,
            payload: { error: error }
        };
    }
    static SAVE_CATEGORY = 'Save category';
    saveCategory(category): Action {
        return {
            type: ProjectManagementActions.SAVE_CATEGORY,
            payload: category
        };
    }

    static SAVE_CATEGORY_SUCCESS = 'Save category Success';
    saveCategorySuccess(category): Action {
        return {
            type: ProjectManagementActions.SAVE_CATEGORY_SUCCESS,
            payload: category
        };
    }

    static SAVE_CATEGORY_FAILURE = 'Save category Failure';
    saveCategoryFailure(error): Action {
        return {
            type: ProjectManagementActions.SAVE_CATEGORY_FAILURE,
            payload: { error: error }
        };
    }
    static DELETE_CATEGORY = 'Delete category';
    deleteCategory(category): Action {
        return {
            type: ProjectManagementActions.DELETE_CATEGORY,
            payload: category
        };
    }

    static DELETE_CATEGORY_SUCCESS = 'Delete category Success';
    deleteCategorySuccess(category): Action {
        return {
            type: ProjectManagementActions.DELETE_CATEGORY_SUCCESS,
            payload: category
        };
    }

    static DELETE_CATEGORY_FAILURE = 'Delete category Failure';
    deleteCategoryFailure(error): Action {
        return {
            type: ProjectManagementActions.DELETE_CATEGORY_FAILURE,
            payload: { error: error }
        };
    }

    static LOAD_JOBS = 'Load jobs';
    loadJobs(): Action {
        return {
            type: ProjectManagementActions.LOAD_JOBS,
        };
    }

    static LOAD_JOBS_SUCCESS = 'Load jobs Success';
    loadJobsSuccess(jobs): Action {
        return {
            type: ProjectManagementActions.LOAD_JOBS_SUCCESS,
            payload: jobs
        };
    }
    static LOAD_JOBS_FAILURE = 'Load jobs Failure';
    loadJobsFailure(error): Action {
        return {
            type: ProjectManagementActions.LOAD_JOBS_FAILURE,
            payload: { error: error }
        };
    }
    static LOAD_JOB = 'Load job';
    loadJob(job): Action {
        return {
            type: ProjectManagementActions.LOAD_JOB,
            payload: job
        };
    }

    static LOAD_JOB_SUCCESS = 'Load job Success';
    loadJobSuccess(job): Action {
        return {
            type: ProjectManagementActions.LOAD_JOB_SUCCESS,
            payload: job
        };
    }

    static LOAD_JOB_FAILURE = 'Load job Failure';
    loadJobFailure(error): Action {
        return {
            type: ProjectManagementActions.LOAD_JOB_FAILURE,
            payload: { error: error }
        };
    }
    static SAVE_JOB = 'Save job';
    saveJob(job): Action {
        return {
            type: ProjectManagementActions.SAVE_JOB,
            payload: job
        };
    }

    static SAVE_JOB_SUCCESS = 'Save job Success';
    saveJobSuccess(job): Action {
        return {
            type: ProjectManagementActions.SAVE_JOB_SUCCESS,
            payload: job
        };
    }

    static SAVE_JOB_FAILURE = 'Save job Failure';
    saveJobFailure(error): Action {
        return {
            type: ProjectManagementActions.SAVE_JOB_FAILURE,
            payload: { error: error }
        };
    }
    static DELETE_JOB = 'Delete job';
    deleteJob(job): Action {
        return {
            type: ProjectManagementActions.DELETE_JOB,
            payload: job
        };
    }

    static DELETE_JOB_SUCCESS = 'Delete job Success';
    deleteJobSuccess(job): Action {
        return {
            type: ProjectManagementActions.DELETE_JOB_SUCCESS,
            payload: job
        };
    }

    static DELETE_JOB_FAILURE = 'Delete job Failure';
    deleteJobFailure(error): Action {
        return {
            type: ProjectManagementActions.DELETE_JOB_FAILURE,
            payload: { error: error }
        };
    }
    static LOAD_FORMS = 'Load Forms';
    loadForms(): Action {
        return {
            type: ProjectManagementActions.LOAD_FORMS,
        };
    }

    static LOAD_FORMS_SUCCESS = 'Load Forms Success';
    loadFormsSuccess(forms): Action {
        return {
            type: ProjectManagementActions.LOAD_FORMS_SUCCESS,
            payload: forms
        };
    }
    static LOAD_FORMS_FAILURE = 'Load Forms Failure';
    loadFormsFailure(error): Action {
        return {
            type: ProjectManagementActions.LOAD_FORMS_FAILURE,
            payload: { error: error }
        };
    }
    static LOAD_FORM = 'Load Form';
    loadForm(form): Action {
        return {
            type: ProjectManagementActions.LOAD_FORM,
            payload: form
        };
    }

    static LOAD_FORM_SUCCESS = 'Load Form Success';
    loadFormSuccess(form): Action {
        return {
            type: ProjectManagementActions.LOAD_FORM_SUCCESS,
            payload: form
        };
    }

    static LOAD_FORM_FAILURE = 'Load Form Failure';
    loadFormFailure(error): Action {
        return {
            type: ProjectManagementActions.LOAD_FORM_FAILURE,
            payload: { error: error }
        };
    }
    static SAVE_FORM = 'Save Form';
    saveForm(form): Action {
        return {
            type: ProjectManagementActions.SAVE_FORM,
            payload: form
        };
    }

    static SAVE_FORM_SUCCESS = 'Save Form Success';
    saveFormSuccess(form): Action {
        return {
            type: ProjectManagementActions.SAVE_FORM_SUCCESS,
            payload: form
        };
    }

    static SAVE_FORM_FAILURE = 'Save Form Failure';
    saveFormFailure(error): Action {
        return {
            type: ProjectManagementActions.SAVE_FORM_FAILURE,
            payload: { error: error }
        };
    }
    static DELETE_FORM = 'Delete Form';
    deleteForm(form): Action {
        return {
            type: ProjectManagementActions.DELETE_FORM,
            payload: form
        };
    }

    static DELETE_FORM_SUCCESS = 'Delete Form Success';
    deleteFormSuccess(form): Action {
        return {
            type: ProjectManagementActions.DELETE_FORM_SUCCESS,
            payload: form
        };
    }

    static DELETE_FORM_FAILURE = 'Delete Form Failure';
    deleteFormFailure(error): Action {
        return {
            type: ProjectManagementActions.DELETE_FORM_FAILURE,
            payload: { error: error }
        };
    }

}