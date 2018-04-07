import { Component, OnInit } from '@angular/core';
import {Topic} from '../topic';
import {TopicService} from '../services/topic.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css']
})
export class TopicFormComponent implements OnInit {

  topic: Topic;

  constructor(private topicService: TopicService) {
    this.topic = new Topic();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.topicService.addTopic(this.topic);
  }
}
