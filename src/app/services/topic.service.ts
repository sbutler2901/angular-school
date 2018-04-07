import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {Topic} from '../topic';
import {Course} from '../course';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable() // tells Angular that this service might itself have injected dependencies.
export class TopicService {

  private topics: Topic[];
  private topicsURL = 'http://localhost:8081/topics';  // URL to web api

  constructor( private http: HttpClient ) { }

  /**
   * Get all topics from the server
   * @return - observable of topics being retrieved
   */
  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.topicsURL).pipe(
        tap(() => ( this.log(`fetched topics`) )),
        catchError(this.handleError('getTopics', []))
      );
  }

  /**
   * Get a specific topic from the server
   * @param id - the id of the topic to be retrieved
   * @return - observable of topic being retrieved
   */
  getTopic(id: string): Observable<Topic> {
    const url = `${this.topicsURL}/${id}`;

    return this.http.get<Topic>(url).pipe(
      tap(() => this.log(`fetched topic id=${id}`)),
      catchError(this.handleError<Topic>(`getTopic id=${id}`))
    );
  }

  /**
   * Delete a topic from the server
   * @param id - the id of the topic to be deleted
   */
  deleteTopic(id: string): void {
    const index: number = this.topics.findIndex(topic => topic.id === id);
    this.topics.splice(index, 1);
  }

  /**
   * Add a new topic to the server.
   * @param topic - the topic to be added
   * @return - observable of topic being added
   */
  addTopic(topic: Topic): Observable<Topic> {
    console.log('Adding tpic ');
    return this.http.post<Topic>(this.topicsURL, topic, httpOptions).pipe(
      tap((ntopic: Topic) => this.log(`added topic w/ id=${ntopic.id}`)),
      catchError(this.handleError<Topic>('addTopic'))
    );
  }

  /**
   * Add a course under a specific topic to the server
   * @param topicID - the id of the topic containing the course
   * @param course - the course to be added
   */
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

  /**
   * Log a TopicService message with the MessageService
   * @param message - message to be logged
   */
  private log(message: string) {
    console.log('TopicService: ' + message);
    // this.messageService.add('TopicService: ' + message);
  }
}
