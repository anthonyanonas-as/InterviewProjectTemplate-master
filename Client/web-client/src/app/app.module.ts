import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserTrackerComponent } from './components/user-tracker/user-tracker.component';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';


@NgModule({
  declarations: [
    AppComponent,
    UserTrackerComponent,
    AdminDashboard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
