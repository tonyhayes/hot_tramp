import { Category } from './category';
import { Phase } from './phase';
import { Location } from './location';
import { QuestionBase } from '../../../framework/components/dynamic-form';

export interface Job {
    "jobCode": string,/*unique id for job*/
    "jobDescription": string,/*Job Title*/
    "superId": string,/*unique supervisor id*/
    "superName": string,/*supervisor name*/
    "userId": string,/*unique id for user*/
    "userName": string,/*user name*/
    "categoryList": Array<CategoryQuestions>,
    "phaseList": Array<Phase>,
    "locationList": Array<Location>
}

export interface CategoryQuestions {
    "jobCode": string,/*unique id for job*/
    "category": Category,
    "questionList": Array<QuestionBase<any>>/*list of questions associated with the category and job*/
}
