import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../course';
import {TopicService} from '../services/topic.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  @Input() topicId: string;
  @Output() newCourseCreated: EventEmitter<Course> = new EventEmitter<Course>();
  course: Course;

  constructor(private topicService: TopicService) { this.course = new Course(); }

  ngOnInit() {
  }
  onSubmit() {
    this.topicService.addCourse(this.topicId, this.course).subscribe(nCourse => {
      this.newCourseCreated.emit(nCourse);
    });
  }
}
