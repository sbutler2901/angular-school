import {Component, OnInit} from '@angular/core';
import {Topic} from '../topic';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {TopicService} from '../services/topic.service';
import {Course} from '../course';
import {CourseService} from '../services/course.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {

  private topicId: string;
  private topic: Topic;
  private hideForm = true;

  constructor(
    private route: ActivatedRoute,          // holds information about the route to this instance
    private location: Location,             // an Angular service for interacting with the browser
    private topicService: TopicService,     // gets topic data from the remote server
    private courseService: CourseService    // gets course data from the remote server
  ) { }

  ngOnInit() {
    this.topic = new Topic();
    this.topicId = this.route.snapshot.paramMap.get('id');  // retrieves the current topic's ID from the url
    this.getTopic();
    this.getCourses();
  }

  /** Retrieves the topic to be displayed by the component */
  getTopic(): void {
    this.topicService.getTopic(this.topicId).subscribe(topic => {
          this.topic = topic;
          this.topic.courses = [];
    });
  }

  /** Retrieves the courses associated with this component's topic */
  getCourses(): void {
    this.courseService.getCourses(this.topicId).subscribe(courses => {
      this.topic.courses = courses;
    });
  }

  /** Deletes the topic being currently displayed */
  deleteTopic(): void {
    this.topicService.deleteTopic(this.topic.id).subscribe( () => {
      console.log('Deleted topic ' + this.topic.id);
      this.goBack();
    });
  }

  /** Toggles the display of the form for adding new courses */
  toggleNewCourseForm(): void { this.hideForm = !this.hideForm; }

  /**
   * Adds a new course to the component after being added to the server
   * Relies on an emitted event from the component form
   * @param {Course} course course to be added
   */
  addCourse(course: Course) {
    console.log('received emited new course' + JSON.stringify(course));
    this.topic.courses.push(new Course(
        course.id,
        course.name,
        course.description
    ));
  }

  /**
   * Allows *ngfor for course component generation to detect changes to the topic's course array
   * @param {number} index current index for iteration of ngforof
   * @param {Course} course current course at this index
   * @return {string} id of course used from tracking of changes
   */
  trackByCourse(index: number, course: Course): string { return course.id; }

  /** Returns the browser to the previous page */
  goBack(): void { this.location.back(); }
}
