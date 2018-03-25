import { Component, OnInit } from '@angular/core';
import {Topic} from '../topic';
import {TopicService} from '../services/topic.service';


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  private topics: Topic[];

  constructor(private topicService: TopicService) {}

  ngOnInit() {
    this.getHeros();
  }

  getHeros() {
    // waits for the Observable to emit the array of heroes— which could happen now or several minutes from now.
    // Then subscribe passes the emitted array to the callback, which sets the component's heroes property.
    this.topicService.getTopics().subscribe(topics => this.topics = topics);  // unwraps the observable topics
  }

}
