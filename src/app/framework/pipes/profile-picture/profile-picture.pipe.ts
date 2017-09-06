import { Pipe, PipeTransform } from '@angular/core';
import { layoutPaths } from '../../../framework';
import { Util } from '../../helpers/util';
import { GlobalState } from '../../../global.state';

@Pipe({ name: 'profilePicture', pure: false })
export class ProfilePicturePipe implements PipeTransform {

	  profilePicture = null;
	  k = 0;

	constructor(private state: GlobalState) {        
		this.state.subscribe('auth0.profilePicture', (profilePicture) => {
			this.profilePicture = profilePicture;
		});
	 }


	transform(input:string, ext = 'png'):string {
		if (!Util.isString(input)){
			throw new Error('Requires a String as input');    	
		} 
		if (input == 'auth0Avatar'){
			if(this.profilePicture){
				return this.profilePicture;
			}
			const profileString = localStorage.getItem('profile');
			const profile = JSON.parse(profileString)

			if(profile && profile.picture){
				this.profilePicture = profile.picture
				return profile.picture;
			}

			return layoutPaths.images.profile + 'arrow_drop_down_circle_24px.svg';
		}
		if (input == 'dropdownImage'){

			return layoutPaths.images.profile + 'arrow_drop_down_circle_24px.svg';
		}
	   
		return input;
	}
}
