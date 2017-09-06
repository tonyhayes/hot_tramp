
import { Routes, RouterModule }  from '@angular/router';
import { AuthGuard } from '../../auth-guard.service';

import { ProjectManagementAdministration } from './project-management-administration.component';
import { 
	ProjectManagementAdministrationDashboard, 
	CategoryAdd, 
	FormAdd, 
	ProjectAdd, 
	JobAdd,
	FormDesign  
} from './components';


const routes: Routes = [
	{
		path: '',
//		canActivate: [AuthGuard],
		component: ProjectManagementAdministration,
		children: [
			{ path: 'category-add/:id', component: CategoryAdd },
			{ path: 'form-add/:id', component: FormAdd },
			{ path: 'form-design/:id', component: FormDesign },
			{ path: 'project-add/:id', component: ProjectAdd },
			{ path: 'job-add/:id', component: JobAdd },
			{ path: 'dashboard', component: ProjectManagementAdministrationDashboard },
		]
	}
];

export const routing = RouterModule.forChild(routes);
