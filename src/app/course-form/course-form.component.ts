import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../course';
import {CourseService} from '../services/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  @Input() topicId: string;
  @Output() newCourseCreated: EventEmitter<Course> = new EventEmitter<Course>();
  course: Course;

  constructor( private courseService: CourseService ) { this.course = new Course(); }

  ngOnInit() { }

  /** Handles form submission and adds the new course */
  onSubmit() {
    this.courseService.addCourse(this.topicId, this.course).subscribe(nCourse => {
      this.newCourseCreated.emit(nCourse);
    });
  }
}
