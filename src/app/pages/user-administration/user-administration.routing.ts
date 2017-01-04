
import { Routes, RouterModule }  from '@angular/router';

import { UserAdministration } from './user-administration.component';
import { UserList } from './components/user-list/user-list.component';
import { UserDetails } from './components/user-details/user-details.component';

// noinspection TypeScriptValidateTypes
//const routes: Routes = [
  	// {
   //  	path: '',
   //  	component: UserAdministration,
  	// },

//];

//export const routing = RouterModule.forChild(routes);
const routes: Routes = [
  {
    path: '',
    component: UserAdministration,
    children: [
      { path: 'user-list', component: UserList },
      { path: 'user-details/:id', component: UserDetails },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
