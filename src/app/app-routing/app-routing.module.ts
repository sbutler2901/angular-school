 import { NgModule } from '@angular/core';
 import {RouterModule, Routes} from '@angular/router';
 import {TopicsComponent} from '../topics/topics.component';
 import {DashboardComponent} from '../dashboard/dashboard.component';
 import {CoursesComponent} from '../courses/courses.component';

 const routes: Routes = [
   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'topics', component: TopicsComponent },
   // { path: 'topics/:id', component: CoursesComponent }
 ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
