import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Topic} from '../topic';
import {TopicService} from '../services/topic.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css']
})
export class TopicFormComponent implements OnInit {

  topic: Topic;

  /** Notifies listeners that a new topic has been created and added */
  @Output() newTopicCreated: EventEmitter<Topic> = new EventEmitter<Topic>();

  constructor(private topicService: TopicService) { this.topic = new Topic(); }

  ngOnInit() { }

  /**
   * Sends the newly entered topic to the topic service for submission to server.
   * Notifies listeners on success.
   */
  onSubmit() {
    this.topicService.addTopic(this.topic).subscribe(ntopic => {
      this.newTopicCreated.emit(ntopic);
    });
  }
}
