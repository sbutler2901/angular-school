import { Injectable } from '@angular/core';
import {TOPICS} from '../mock-topics';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {Topic} from '../topic';
import {Course} from '../course';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable() // tells Angular that this service might itself have injected dependencies.
export class TopicService {

  private topics: Topic[];
  private topicsURL = 'http://localhost:8081/topics';  // URL to web api

  constructor(
    private http: HttpClient,
  ) {

    // this.topics = TOPICS;
  }

  // Provides asynchronous retrieval of data
  getTopics(): Observable<Topic[]> {
    // return of(this.topics);    // returns an Observable<Topic[]> that emits a single value, the array of mock heroes.

    this.topics = [];
    /** GET topics from the server */
    return this.http.get<Topic[]>(this.topicsURL)
      .pipe(
        tap(topics => ( this.log(`fetched topics`) ),
        catchError(this.handleError('getTopics', []))
      );
  }
  getTopic(id: string): Observable<Topic> {
    // Todo: send the message _after_ fetching the hero
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(this.topics.find(topic => topic.id === id));

    const url = `${this.topicsURL}/${id}`;
    return this.http.get<Topic>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  deleteTopic(id: string): void {
    const index: number = this.topics.findIndex(topic => topic.id === id);
    this.topics.splice(index, 1);
  }
  addTopic(topic: Topic): void {
    //this.topics.push(topic);

  }

  addCourse(topicID: string, course: Course) {
    const topicx: Topic = this.topics.find(topic => topic.id === topicID);
    topicx.courses.push(course);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('TopicService: ' + message);
    //this.messageService.add('HeroService: ' + message);
  }
}
