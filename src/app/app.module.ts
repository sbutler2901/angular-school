import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './services/message.service';

import { AppComponent } from './app.component';
import { TopicsComponent } from './topics/topics.component';
import { CoursesComponent } from './courses/courses.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { TopicService } from './services/topic.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { TopicFormComponent } from './topic-form/topic-form.component';
import { CourseFormComponent } from './course-form/course-form.component';
import {RestDataService} from './services/rest-data.service';
import {CourseService} from './services/course.service';


@NgModule({
  declarations: [
    AppComponent,
    TopicsComponent,
    CoursesComponent,
    DashboardComponent,
    TopicDetailComponent,
    TopicFormComponent,
    CourseFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ TopicService, MessageService, RestDataService, CourseService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
