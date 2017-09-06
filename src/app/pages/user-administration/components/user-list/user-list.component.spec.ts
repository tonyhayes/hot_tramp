import { UserList } from './user-list.component';
import { UserBase, LicenseBase, Application } from '../../model';
import { GlobalState } from '../../../../global.state';
import { TRANSLATIONS, TranslateService } from '../../../../translate';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { UserAdministrationActions } from '../../../../actions';
import {} from 'jasmine'

describe('UserList', () => {

	const translateService = new TranslateService(TRANSLATIONS);
	it('should create a translateService', () => {
		expect(translateService).toBeDefined();
	});

	const userAdministrationActions = new UserAdministrationActions();
	const gs = new GlobalState();
	it('should create a GlobalState', () => {
		expect(gs).toBeDefined();
	});
	const modal =  new NgbModal(null)

	const router = {
		navigate: ()=>{}		
	}
	const userStore = {dispatch:()=>{}}
  	const userList = new UserList(userAdministrationActions, userStore, router, translateService, modal);
  	const licenses = [
  						{
						    "applicationId": 'pac-man',
						    "totalCount": 5,
						    "licensesUsed": 8

						},
 						{
						    "applicationId": 'space-invaders',
						    "totalCount": 5,
						    "licensesUsed": 8

						},
 						{
						    "applicationId": 'toe-jam and earl',
						    "totalCount": 5,
						    "licensesUsed": 8

						},
					];
  	const list = [
				  	{

					    "blocked": false,
					    "createdAt": 'now',
					    "email": 'tony@here.com',
					    "emailVerified": true,
					    "familyName": 'Oddfellow',
					    "givenName": 'tony',
					    "lastIp": 'lastip',
					    "lastLogin": 'tuesday',
					    "loginsCount": 4,
					    "name": 'tony',
					    "nickname": 'tony',
					    "phoneNumber": 'callme',
					    "phoneVerified": true,
					    "picture": 'igloo',
					    "updatedAt": 'yesterday',
					    "userId": 'tony',
					    "applications": ['pac-man']

				  	},
				  	{

					    "blocked": false,
					    "createdAt": 'now',
					    "email": 'George@here.com',
					    "emailVerified": true,
					    "familyName": 'Oddfellow',
					    "givenName": 'George',
					    "lastIp": 'lastip',
					    "lastLogin": 'tuesday',
					    "loginsCount": 4,
					    "name": 'George',
					    "nickname": 'George',
					    "phoneNumber": 'callme',
					    "phoneVerified": true,
					    "picture": 'igloo',
					    "updatedAt": 'yesterday',
					    "userId": 'George',
					    "applications": ['pac-man']

				  	}

			  	];
  	const listWithAdmin = [
				  	{

					    "blocked": false,
					    "createdAt": 'now',
					    "email": 'tony@here.com',
					    "emailVerified": true,
					    "familyName": 'Oddfellow',
					    "givenName": 'tony',
					    "lastIp": 'lastip',
					    "lastLogin": 'tuesday',
					    "loginsCount": 4,
					    "name": 'tony',
					    "nickname": 'tony',
					    "phoneNumber": 'callme',
					    "phoneVerified": true,
					    "picture": 'igloo',
					    "updatedAt": 'yesterday',
					    "userId": 'tony',
					    "applications": ['pac-man']

				  	},
				  	{

					    "blocked": false,
					    "createdAt": 'now',
					    "email": 'George@here.com',
					    "emailVerified": true,
					    "familyName": 'Oddfellow',
					    "givenName": 'George',
					    "lastIp": 'lastip',
					    "lastLogin": 'tuesday',
					    "loginsCount": 4,
					    "name": 'George',
					    "nickname": 'George',
					    "phoneNumber": 'callme',
					    "phoneVerified": true,
					    "picture": 'igloo',
					    "updatedAt": 'yesterday',
					    "userId": 'George',
					    "applications": ['pac-man', 'Spectrum Administration']

				  	}

			  	];
  	const listWithTonyAdmin = [
				  	{

					    "blocked": false,
					    "createdAt": 'now',
					    "email": 'tony@here.com',
					    "emailVerified": true,
					    "familyName": 'Oddfellow',
					    "givenName": 'tony',
					    "lastIp": 'lastip',
					    "lastLogin": 'tuesday',
					    "loginsCount": 4,
					    "name": 'tony',
					    "nickname": 'tony',
					    "phoneNumber": 'callme',
					    "phoneVerified": true,
					    "picture": 'igloo',
					    "updatedAt": 'yesterday',
					    "userId": 'tony',
					    "applications": ['pac-man', 'Spectrum Administration']

				  	},
				  	{

					    "blocked": false,
					    "createdAt": 'now',
					    "email": 'George@here.com',
					    "emailVerified": true,
					    "familyName": 'Oddfellow',
					    "givenName": 'George',
					    "lastIp": 'lastip',
					    "lastLogin": 'tuesday',
					    "loginsCount": 4,
					    "name": 'George',
					    "nickname": 'George',
					    "phoneNumber": 'callme',
					    "phoneVerified": true,
					    "picture": 'igloo',
					    "updatedAt": 'yesterday',
					    "userId": 'George',
					    "applications": ['pac-man']

				  	}

			  	];

			  	const user = {

					    "blocked": false,
					    "createdAt": 'now',
					    "email": 'tony@here.com',
					    "emailVerified": true,
					    "familyName": 'Oddfellow',
					    "givenName": 'tony',
					    "lastIp": 'lastip',
					    "lastLogin": 'tuesday',
					    "loginsCount": 4,
					    "name": 'tony',
					    "nickname": 'tony',
					    "phoneNumber": 'callme',
					    "phoneVerified": true,
					    "picture": 'igloo',
					    "updatedAt": 'yesterday',
					    "userId": 'tony',
					    "applications": ['pac-man']

				  	};

    var result: Promise<any>;

		userList.modalService.open =  ()=>{ 
          return {result: {
                      then: ()=> { return {}}
                    }}

		 }

  	//specs
  	it('should create userList', () => {
    	expect(userList).toBeDefined();
  	});
  	it('should create homeRoute', () => {
    	expect(userList.homeRoute).toEqual('/user-administration/user-list');
  	});
  	it('should create filteredUserList', () => {
  		userList.users = list
    	expect(userList.filteredUserList).toEqual(list);
  	});
  	it('should create filteredUserList with 1 element', () => {
  		userList.users = list
  		userList.searchText = 'tony'
    	expect(userList.filteredUserList.length).toEqual(1);
  	});
  	it('should create filteredUserList and ignore blanks', () => {
  		userList.users = list
  		userList.searchText = '      '
    	expect(userList.filteredUserList).toEqual(list);
  	});
  	it('should create filteredUserList and ignore blanks in name', () => {
  		userList.users = list
  		userList.searchText = '      tony'
    	expect(userList.filteredUserList.length).toEqual(1);
  	});
  	it('should create applicationLicenseList', () => {
  		userList.licences = licenses
    	expect(userList.applicationLicenseList).toEqual(licenses);
  	});
  	it('should run onCheck and return null', () => {
    	expect(userList.onCheck(null, null)).toEqual(undefined);
  	});
  	it('should run hasLicense and return null', () => {
    	expect(userList.hasLicense(null, null)).toEqual(undefined);
  	});
  	it('should run hasLicense and return null', () => {
    	expect(userList.hasLicense(['pac-man', 'bullwinkle'], 'pac-man')).toEqual(true);
  	});
  	it('should run hasLicense and return null', () => {
    	expect(userList.hasLicense(['pac-man', 'bullwinkle'], 'pac-woman')).toEqual(false);
  	});
  	it('should run hasAnotherAdmin and return false', () => {
  		userList.users = list
    	expect(userList.hasAnotherAdmin(user)).toEqual(false);
  	});
  	it('should run hasAnotherAdmin and return true', () => {
  		userList.users = listWithAdmin
    	expect(userList.hasAnotherAdmin(user)).toEqual(true);
  	});
  	it('should run hasAnotherAdmin and return false (listWithTonyAdmin)', () => {
  		userList.users = listWithTonyAdmin
    	expect(userList.hasAnotherAdmin(user)).toEqual(false);
  	});
  	it('should run onSelect', () => {

  		userList.onSelect()  		
    	expect(userList.hasLicense(['pac-man', 'bullwinkle'], 'pac-man')).toEqual(true);
  	});
  	it('should run onDeleteConfirm', () => {
  		userList.onDeleteConfirm({applications: ['7'], name:'tony'}, '<div>hi</div>')  		
    	expect(userList.dialogTitle).toEqual('HEADING_DELETE_RECORD');
  	});
  	it('should run onAdd', () => {

  		userList.onAdd()  		
    	expect(userList.hasLicense(['pac-man', 'bullwinkle'], 'pac-man')).toEqual(true);
  	});
  	it('should run saveUser', () => {

  		userList.saveUser({applications: ['7'], id:'tony'})  		
    	expect(userList.hasLicense(['pac-man', 'bullwinkle'], 'pac-man')).toEqual(true);
  	});
  	it('should run addUserLicense', () => {

  		userList.addUserLicense({applications: ['7'], id:'tony'}, 'tony')  		
    	expect(userList.hasLicense(['pac-man', 'bullwinkle'], 'pac-man')).toEqual(true);
  	});
  	it('should run removeUserLicense', () => {

  		userList.removeUserLicense({applications: ['7'], id:'tony'}, 'tony')  		
    	expect(userList.hasLicense(['pac-man', 'bullwinkle'], 'pac-man')).toEqual(true);
  	});
  	it('should run getUserStatus - blocked', () => {

  		  		
    	expect(userList.getUserStatus({applications: ['7'], id:'tony', blocked: true})).toEqual('STATUS_INACTIVE');
  	});
  	it('should run getUserStatus - emailVerified', () => {

  		  		
    	expect(userList.getUserStatus({applications: ['7'], id:'tony', emailVerified: true})).toEqual('STATUS_ACTIVE');
  	});
 	it('should run getUserStatus - STATUS_UNVERIFIED', () => {

  		  		
    	expect(userList.getUserStatus({applications: ['7'], id:'tony'})).toEqual('STATUS_UNVERIFIED');
  	});

}) 

