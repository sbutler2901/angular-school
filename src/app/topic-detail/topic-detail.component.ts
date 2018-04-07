import {Component, Input, OnInit} from '@angular/core';
import {Topic} from '../topic';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {TopicService} from '../services/topic.service';
import {Course} from '../course';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {

  @Input() topic: Topic;
  private hideForm = true;

  constructor(
    private route: ActivatedRoute,        // holds information about the route to this instance
    private topicService: TopicService,   // gets topic data from the remote server
    private location: Location            // an Angular service for interacting with the browser
  ) { }

  ngOnInit() {
    this.getTopic();
  }

  getTopic(): void {
    // The route.snapshot is a static image of the route information shortly after the component was created.
    // The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.
    const id: string = this.route.snapshot.paramMap.get('id');

    // Performs an asynchronous request for the topic
    this.topicService.getTopic(id)
      .subscribe(topic => this.topic = topic);
  }

  deleteTopic(): void {
    this.topicService.deleteTopic(this.topic.id);
    this.goBack();
  }

  addCourse(): void {
    this.hideForm = !this.hideForm;
  }

  // Allows *ngfor for course component genertion to detect changes to the topic's course array
  static trackByCourse(index: number, course: Course): string { return course.id; }

  // Returns the browser to the previous page
  goBack(): void {
    this.location.back();
  }
}
