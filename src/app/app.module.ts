import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TopicsComponent } from './topics/topics.component';
import { CoursesComponent } from './courses/courses.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {TopicService} from './services/topic.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    TopicsComponent,
    CoursesComponent,
    DashboardComponent,
    TopicDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    TopicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
