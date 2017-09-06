import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import * as toastr from 'toastr';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { 
    QuestionBase,
    BsDropdownQuestion, 
    DropdownKeyboardQuestion, 
    DropdownQuestion, 
    TextboxQuestion, 
    TextareaQuestion, 
    TextlineQuestion, 
    InputQuestion, 
    RadioQuestion,
    CheckboxQuestion,
    DateQuestion,
    TimeQuestion,
    DocumentsGridQuestion,
    DatalistQuestion,
    TagSelectQuestion,
    SignatureQuestion,
    VideoQuestion,
    PhotoQuestion,
    PhotosQuestion,
    NotesQuestion,
    WeatherUndergroundQuestion
} from '../framework/components/dynamic-form';
import { GlobalState } from '../global.state';

@Injectable()
export class QuestionService {


    constructor (private http: Http, private state: GlobalState) {}
    getBaseUrl(): string {
        return this.state.getCurrent('app.API_REST_URL');
    }

    getFormQuestions(endPoint): Observable<QuestionBase<any>[]> {
        return this.http.get(endPoint.payload)
        .map(res => res.json())
        .map((questions:  QuestionBase<any>[]) => {
            return questions;

        })
        .catch(this.handleError)
    }

    getQuestions(endPoint): Observable<QuestionBase<any>[]> {
        return this.http.get(endPoint.payload)
        .map(res => res.json())
        .map((questions:  QuestionBase<any>[]) => {
            return questions;
        })
        .catch(this.handleError)
    }

    saveQuestions(arr:Array<any>) {
        const endPoint =arr[0];
        const questions =arr[1];
        questions.sort((a, b) => a.order - b.order);
        return this.http.put(endPoint, questions)
            .map(res => res.json())
            .map((questions:  QuestionBase<any>[]) => {
                return questions;
            })
            .catch(this.handleError)
        }


    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
              const body = error.json() || '';
              const err = body.error || JSON.stringify(body);
              errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
              errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        toastr.error(errMsg);
        return Observable.throw(errMsg);
    }

}