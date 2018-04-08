import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  @Input() course: Course;

  constructor() { }

  ngOnInit() { }
}
