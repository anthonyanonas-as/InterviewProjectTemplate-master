import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTrackerComponent } from './components/user-tracker/user-tracker.component';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';

const routes: Routes = [
  { path: '', component: UserTrackerComponent },
  { path: 'super-admin-logs', component: AdminDashboard }, 
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
