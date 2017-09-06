
import { Routes, RouterModule }  from '@angular/router';
import { AuthGuard } from '../../auth-guard.service';

import { ProjectManagement } from './project-management.component';
import { FieldReportHeader, Dashboard, Notes } from './components';


const routes: Routes = [
	{
		path: '',
//		canActivate: [AuthGuard],
		component: ProjectManagement,
		children: [
//			{ path: '', component: Dashboard },
			{ path: 'field-report-header/:id', component: FieldReportHeader },
			{ path: 'field-report-detail/notes/:fieldReportId/:categoryId/:logId', component: Notes },
			{ path: 'dashboard', component: Dashboard },
		]
	}
];

export const routing = RouterModule.forChild(routes);
