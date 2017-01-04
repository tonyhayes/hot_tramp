import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserBase } from '../pages/user-administration';

@Injectable()
export class UserAdministrationService {


	constructor (private http: Http) {}


	getUsers(endPoint): Observable<any> {
		return this.http.get(endPoint.payload)
		.map(res => res.json())
		.map((questions) => {
			return {
				users:
					[
						{
							id: 1,
							firstName: 'Claddich',
							lastName: 'Roman',
							username: 'claddich',
							email: 'claddich@crynore.com',
							applications: ['Spectrum', 'PJ', 'Field'],

						},
						{
							id: 2,
							firstName: 'Jerry',
							lastName: 'Garcia',
							username: 'jg',
							email: 'jerry@gratefuldead.com',
							applications: ['Spectrum', 'Field'],

						},
						{
							id: 3,
							firstName: 'Ida',
							lastName: 'Lupino',
							username: 'ides of march',
							email: 'lupino@tedious.com',
							applications: [],

						},
						{
							id: 4,
							firstName: 'Larry',
							lastName: 'Crowne',
							username: 'crowne',
							email: 'crowne@wonder.com',
							applications: ['Field'],

						},
						{
							id: 5,
							firstName: 'Harry',
							lastName: 'Potter',
							username: 'wizard',
							email: 'harry@hp.com',
							applications: ['Spectrum'],

						},
						{
							id: 6,
							firstName: 'Tony',
							lastName: 'Hayes',
							username: 'tony',
							email: 'thayes@dc.com',
							applications: ['PJ'],

						},
						{
							id: 7,
							firstName: 'Jackie',
							lastName: 'Brown',
							username: 'jb',
							email: 'jb@toomuchtoosoon.com',
							applications: ['Spectrum'],

						},
					],
				licences:
					[
						{
							id: 1,
							application: 'Spectrum',
							count: 3
						},
						{
							id: 2,
							application: 'PJ',
							count: 2
						},
						{
							id: 3,
							application: 'Field',
							count: 1
						},
					]
			};

		})
	}

	saveUsers(endPoint, questions) {
		questions.sort((a, b) => a.order - b.order);
		return this.http.put(endPoint.payload, questions)
			.map(res => res.json())
		}



}