import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTrackerComponent } from './components/user-tracker/user-tracker.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: UserTrackerComponent },
  { path: 'super-admin-logs', component: AdminDashboardComponent }, 
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
