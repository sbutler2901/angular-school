import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../course';
import {Topic} from '../topic';
import {TopicService} from '../services/topic.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  @Input() topic: Topic;
  course: Course;

  constructor(private topicService: TopicService) { this.course = new Course(); }

  ngOnInit() {
  }
  onSubmit() {
    this.topicService.addCourse(this.topic.id, this.course);
  }
}
