import { Injectable } from '@angular/core';
import {TOPICS} from '../mock-topics';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {Topic} from '../topic';
import {Course} from '../course';

@Injectable() // tells Angular that this service might itself have injected dependencies.
export class TopicService {

  private topics: Topic[];

  constructor() {
    this.topics = TOPICS;
  }

  // Provides asynchronous retrieval of data
  getTopics(): Observable<Topic[]> {
    return of(this.topics);    // returns an Observable<Topic[]> that emits a single value, the array of mock heroes.
  }
  getTopic(id: string): Observable<Topic> {
    // Todo: send the message _after_ fetching the hero
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(this.topics.find(topic => topic.id === id));
  }
  deleteTopic(id: string): void {
    const index: number = this.topics.findIndex(topic => topic.id === id);
    this.topics.splice(index, 1);
  }
  addTopic(topic: Topic): void {
    this.topics.push(topic);
  }

  addCourse(topicID: string, course: Course) {
    const topicx: Topic = this.topics.find(topic => topic.id === topicID);
    topicx.courses.push(course);
  }
}
