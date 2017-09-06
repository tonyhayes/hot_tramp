import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './model/question-base';
import { 
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

 } from './';

@Injectable()
export class QuestionControlService {
	constructor() { }

	toFormGroup(questions: QuestionBase<any>[] ) {
		let group: any = {};

		questions.forEach(question => {
			group[question.key] = question.validators.length ? 
			new FormControl(question.value || '', Validators.compose(question.validators))
			: new FormControl(question.value || '');
		});
		return new FormGroup(group);
	}
	addToFormGroup(question: QuestionBase<any> ) {
		const group = question.validators.length ? 
			new FormControl(question.value || '', Validators.compose(question.validators))
			: new FormControl(question.value || '');
		
		return group;
	}
    createDynamicFormComponent(questions)  {
        const result: QuestionBase<any>[] = [];
        Object.keys(questions).forEach( (key) => {
            let question = questions[key];
            switch(question.controlType) {
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
                case 'date':
                    const dateQuestion = new DateQuestion(question);
                    result.push(dateQuestion);
                    break;
                case 'dropdown-keyboard':
                    const dropdownKeyboardQuestion = new DropdownKeyboardQuestion(question);
                    result.push(dropdownKeyboardQuestion);
                    break;
                case 'dropdown':
                    const dropdownQuestion = new DropdownQuestion(question);
                    result.push(dropdownQuestion);
                    break;
                case 'input':
                    const inputQuestion = new InputQuestion(question);
                    result.push(inputQuestion);
                    break;
                 case 'notes':
                    const notesQuestion = new NotesQuestion(question);
                    result.push(notesQuestion);
                    break;
                 case 'photo':
                    const photoQuestion = new PhotoQuestion(question);
                    result.push(photoQuestion);
                    break;
                 case 'photos':
                    const photosQuestion = new PhotosQuestion(question);
                    result.push(photosQuestion);
                    break;
                 case 'radio':
                    const radioQuestion = new RadioQuestion(question);
                    result.push(radioQuestion);
                    break;
                case 'signature':
                    const signatureQuestion = new SignatureQuestion(question);
                    result.push(signatureQuestion);
                    break;
                case 'tag':
                    const tagSelectQuestion = new TagSelectQuestion(question);
                    result.push(tagSelectQuestion);
                    break;
                case 'textarea':
                    const textareaQuestion = new TextareaQuestion(question);
                    result.push(textareaQuestion);
                    break;
                case 'textbox':
                    const textboxQuestion = new TextboxQuestion(question);
                    result.push(textboxQuestion);
                    break;
                case 'textline':
                    const textlineQuestion = new TextlineQuestion(question);
                    result.push(textlineQuestion);
                    break;
                case 'time':
                    const timeQuestion = new TimeQuestion(question);
                    result.push(timeQuestion);
                    break;
                 case 'weather-underground':
                    const weatherUndergroundQuestion = new WeatherUndergroundQuestion(question);
                    result.push(weatherUndergroundQuestion);
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
            if (!question.groupTitle && firstGroup){
                question.groupTitle = 'Group Title';
            }
            firstGroup = false;
            if (question.groupColumns || question.groupListStyle){
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
            if (question.groupColumns || question.groupListStyle ){
                groups[question.group] = { 
                    group: question.group, 
                    groupColumns: question.groupColumns || 1, 
                    groupTitle: question.groupTitle, 
                    groupListStyle: question.groupListStyle,
                    fields:[] 
                };
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
