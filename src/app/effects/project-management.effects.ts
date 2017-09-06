import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { ProjectManagementActions } from '../actions';
import { ProjectManagementService } from '../services';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
@Injectable()
export class ProjectManagementEffects {
    constructor (
        private update$: Actions,
        private actions: ProjectManagementActions,
        private svc: ProjectManagementService
    ) {}


    @Effect() loadJobCodes$ = this.update$
        .ofType(ProjectManagementActions.LOAD_JOB_CODES)
        .switchMap(() => this.svc.getJobCodes())
        .map(jobs => this.actions.loadJobCodesSuccess(jobs))
        .catch(error => Observable.of(this.actions.loadJobCodesFailure(error)))

    @Effect() loadJobCategories$ = this.update$
        .ofType(ProjectManagementActions.LOAD_JOB_CATEGORIES)
        .switchMap((job) => this.svc.getJobCategories(job))
        .map(categories => this.actions.loadJobCategoriesSuccess(categories))
        .catch(error => Observable.of(this.actions.loadJobCategoriesFailure(error)))

    @Effect() loadJobCategory$ = this.update$
        .ofType(ProjectManagementActions.LOAD_JOB_CATEGORY)
        .switchMap((jobCategory) => this.svc.getJobCategory(jobCategory))
        .map(category => this.actions.loadJobCategorySuccess(category))
        .catch(error => Observable.of(this.actions.loadJobCategoryFailure(error)))

    @Effect() addFieldReport$ = this.update$
        .ofType(ProjectManagementActions.ADD_FIELD_REPORT)
        .map(action => action.payload)
        .switchMap((fieldReport) => this.svc.addFieldReport(fieldReport))
        .map((fieldReport) => this.actions.addFieldReportSuccess(fieldReport))
        .catch(error => Observable.of(this.actions.addFieldReportFailure(error)))

    @Effect() saveFieldReport$ = this.update$
        .ofType(ProjectManagementActions.SAVE_FIELD_REPORT)
        .map(action => action.payload)
        .switchMap((fieldReport) => this.svc.saveFieldReport(fieldReport))
        .map((fieldReport) => this.actions.saveFieldReportSuccess(fieldReport))
        .catch(error => Observable.of(this.actions.saveFieldReportFailure(error)))

    @Effect() deleteFieldReport$ = this.update$
        .ofType(ProjectManagementActions.DELETE_FIELD_REPORT)
        .map(action => action.payload)
        .switchMap((fieldReport) => this.svc.deleteFieldReport(fieldReport))
        .map((fieldReport) => this.actions.deleteFieldReportSuccess(fieldReport))
        .catch(error => Observable.of(this.actions.deleteFieldReportFailure(error)))

    @Effect() getFieldReport$ = this.update$
        .ofType(ProjectManagementActions.LOAD_FIELD_REPORT)
        .map(action => action.payload)
        .switchMap((reportArray) => this.svc.getFieldReport(reportArray))
        .map((fieldReport) => this.actions.loadFieldReportSuccess(fieldReport))
        .catch(error => Observable.of(this.actions.loadFieldReportFailure(error)))

    @Effect() sendFieldReport$ = this.update$
        .ofType(ProjectManagementActions.SEND_FIELD_REPORT)
        .map(action => action.payload)
        .switchMap((reportId) => this.svc.sendFieldReport(reportId))
        .map((fieldReport) => this.actions.sendFieldReportSuccess(fieldReport))
        .catch(error => Observable.of(this.actions.sendFieldReportFailure(error)))

    @Effect() getLoadedFieldReport$ = this.update$
        .ofType(ProjectManagementActions.GET_LOADED_FIELD_REPORT)
        .switchMap(() => this.svc.getLoadedFieldReport())
        .map((fieldReport) => this.actions.getLoadedFieldReportSuccess(fieldReport))
        .catch(error => Observable.of(this.actions.getLoadedFieldReportFailure(error)))

    @Effect() getLoadedFieldReports$ = this.update$
        .ofType(ProjectManagementActions.GET_LOADED_FIELD_REPORTS)
        .switchMap(() => this.svc.getLoadedFieldReports())
        .map((fieldReports) => this.actions.getLoadedFieldReportsSuccess(fieldReports))
        .catch(error => Observable.of(this.actions.getLoadedFieldReportsFailure(error)))

    @Effect() getFieldReports$ = this.update$
        .ofType(ProjectManagementActions.LOAD_FIELD_REPORTS)
        .switchMap(() => this.svc.getFieldReports())
        .map((fieldReports) => this.actions.loadFieldReportsSuccess(fieldReports))
        .catch(error => Observable.of(this.actions.loadFieldReportsFailure(error)))

    @Effect() getSubmittedFieldReports$ = this.update$
        .ofType(ProjectManagementActions.LOAD_SUBMITTED_FIELD_REPORTS)
        .switchMap(() => this.svc.getSubmittedFieldReports())
        .map((fieldReports) => this.actions.loadSubmittedFieldReportsSuccess(fieldReports))
        .catch(error => Observable.of(this.actions.loadSubmittedFieldReportsFailure(error)))

    @Effect() updateFieldReportCategory$ = this.update$
        .ofType(ProjectManagementActions.UPDATE_FIELD_REPORT_CATEGORY)
        .map(action => action.payload)
        .switchMap((fieldReportCategoryObject) => this.svc.updateFieldReportCategory(fieldReportCategoryObject))
        .map((fieldReport) => this.actions.updateFieldReportCategorySuccess(fieldReport))
        .catch(error => Observable.of(this.actions.updateFieldReportCategoryFailure(error)))

    @Effect() getProjects$ = this.update$
        .ofType(ProjectManagementActions.LOAD_PROJECTS)
        .switchMap(() => this.svc.getProjects())
        .map((projects) => this.actions.loadProjectsSuccess(projects))
        .catch(error => Observable.of(this.actions.loadProjectsFailure(error)))

    @Effect() getCategories$ = this.update$
        .ofType(ProjectManagementActions.LOAD_CATEGORIES)
        .switchMap(() => this.svc.getCategories())
        .map((categories) => this.actions.loadCategoriesSuccess(categories))
        .catch(error => Observable.of(this.actions.loadCategoriesFailure(error)))

    @Effect() getForms$ = this.update$
        .ofType(ProjectManagementActions.LOAD_FORMS)
        .switchMap(() => this.svc.getForms())
        .map((forms) => this.actions.loadFormsSuccess(forms))
        .catch(error => Observable.of(this.actions.loadFormsFailure(error)))

    @Effect() getJobs$ = this.update$
        .ofType(ProjectManagementActions.LOAD_JOBS)
        .switchMap(() => this.svc.getJobs())
        .map((jobs) => this.actions.loadJobsSuccess(jobs))
        .catch(error => Observable.of(this.actions.loadJobsFailure(error)))

}