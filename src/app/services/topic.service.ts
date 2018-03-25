import { Injectable } from '@angular/core';
import {TOPICS} from '../mock-topics';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {Topic} from '../topic';

@Injectable() // tells Angular that this service might itself have injected dependencies.
export class TopicService {

  constructor() { }

  // Provides asynchronous retrieval of data
  getTopics(): Observable<Topic[]> {
    return of(TOPICS);    // returns an Observable<Topic[]> that emits a single value, the array of mock heroes.
  }
}
