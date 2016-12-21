import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { 
    QuestionBase,
    BsDropdownQuestion, 
    DropdownQuestion, 
    TextboxQuestion, 
    TextareaQuestion, 
    TextlineQuestion, 
    InputQuestion, 
    RadioQuestion,
    CheckboxQuestion,
    DateQuestion,
    GridSmartQuestion,
    DocumentsGridQuestion,
    DatalistQuestion,
    TagSelectQuestion,
} from '../theme/components/dynamic-form';

@Injectable()
export class QuestionService {


    constructor (private http: Http) {}

    getFormQuestions(): Observable<QuestionBase<any>[]> {
        return this.http.get('/api/projectmanagement/1')
        .map(res => res.json())
        .map((questions:  QuestionBase<any>[]) => {
            return this.createDynamicFormComponent(questions);

        })
        .map((sortedQuestions:  QuestionBase<any>[]) => {
            return this.groupDynamicFormComponents(sortedQuestions);
        })
        .map((groupedQuestions:  QuestionBase<any>[]) => {
            return this.createDynamicForm(groupedQuestions);
        })
    }

    getQuestions(): Observable<QuestionBase<any>[]> {
        return this.http.get('/api/projectmanagement/1')
        .map(res => res.json())
        .map((questions:  QuestionBase<any>[]) => {
            return this.createDynamicFormComponent(questions);
        })
        .map((sortedQuestions:  QuestionBase<any>[]) => {
            return this.groupDynamicFormComponents(sortedQuestions);
        })
    }

    saveQuestions(questions) {
        questions.sort((a, b) => a.order - b.order);
        return this.http.put('/api/projectmanagement/1', questions)
            .map(res => res.json())
            .map((questions:  QuestionBase<any>[]) => {
                return this.createDynamicFormComponent(questions);
            })
        }

    createDynamicFormComponent(questions: QuestionBase<any>[]):QuestionBase<any>[]  {
        const result: QuestionBase<any>[] = [];
        Object.keys(questions).forEach( (key) => {
            let question = questions[key];
            switch(question.controlType) {
                case 'input':
                    const inputQuestion = new InputQuestion(question);
                    result.push(inputQuestion);
                    break;
                case 'date':
                    const dateQuestion = new DateQuestion(question);
                    result.push(dateQuestion);
                    break;
                case 'textarea':
                    const textareaQuestion = new TextareaQuestion(question);
                    result.push(textareaQuestion);
                    break;
                case 'tag':
                    const tagSelectQuestion = new TagSelectQuestion(question);
                    result.push(tagSelectQuestion);
                    break;
                case 'bs-dropdown':
                    const bsDropdownQuestion = new BsDropdownQuestion(question);
                    result.push(bsDropdownQuestion);
                    break;
                case 'checkbox':
                    const checkboxQuestion = new CheckboxQuestion(question);
                    result.push(checkboxQuestion);
                    break;
                case 'datalist':
                    const datalistQuestion = new DatalistQuestion(question);
                    result.push(datalistQuestion);
                    break;
                case 'smart-grid':
                    const gridSmartQuestion = new GridSmartQuestion(question);
                    result.push(gridSmartQuestion);
                    break;
                case 'documents-grid':
                    const documentsGridQuestion = new DocumentsGridQuestion(question);
                    result.push(documentsGridQuestion);
                    break;
            }
        });
        return result.sort((a, b) => a.order - b.order);
    }

    groupDynamicFormComponents(questions: QuestionBase<any>[]):QuestionBase<any>[]  {
        let firstGroup = true;
        let groupNumber = 0;
        questions.forEach(question =>{
            if (!question.groupColumns && firstGroup){
                ++groupNumber;
            }
            firstGroup = false;
            if (question.groupColumns){
               ++groupNumber;
            }
            question.group = groupNumber;
        });
        return questions;
    }

    createDynamicForm(groupedQuestions: QuestionBase<any>[]){
        //FIXME???? needs to be in a util - used in 2 places!!
        const formData = [];
        const groups = {};
        //create form sections from the sorted questions
        groupedQuestions.forEach(question =>{
            //create a card for the first item
            if (question.groupColumns){
                groups[question.group] = { group: question.group, groupColumns: question.groupColumns, fields:[] };
            }
            groups[question.group].fields.push(question);
        });
        Object.keys(groups).forEach( (key) => {
            let group = groups[key];
            formData.push(group);
        })
        return formData;
    }
}