import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {Topic} from '../topic';
import {Course} from '../course';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable() // tells Angular that this service might itself have injected dependencies.
export class TopicService {

  private topicsURL = 'http://localhost:8081/topics';  // URL to web api

  constructor( private http: HttpClient, private messageService: MessageService ) { }

  /**
   * Get all topics from the server
   * @return - observable of topics being retrieved
   */
  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.topicsURL).pipe(
        tap(() => this.log(`fetched topics`) ),
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
  deleteTopic(id: string): Observable<void> {
      const url = `${this.topicsURL}/${id}`;

      return this.http.delete<void>(url).pipe(
          tap(() => this.log(`deleted topic id=${id}`)),
          catchError(this.handleError<void>(`deleteTopic id=${id}`))
      );
  }

  /**
   * Add a new topic to the server.
   * @param topic - the topic to be added
   * @return - observable of topic being added
   */
  addTopic(topic: Topic): Observable<Topic> {
    return this.http.post<Topic>(this.topicsURL, topic, httpOptions).pipe(
      tap((ntopic: Topic) => this.log(`added topic w/ id=${ntopic.id}`)),
      catchError(this.handleError<Topic>('addTopic'))
    );
  }

  /**
   * Get all courses of a topic from the server
   * @return - observable of courses being retrieved
   */
  getCourses(topicId: string): Observable<Course[]> {
      const url = `${this.topicsURL}/${topicId}/courses`;

      return this.http.get<Course[]>(url).pipe(
          tap(() => ( this.log(`fetched courses for topic id ${topicId}`) )),
          catchError(this.handleError('getCourses', []))
      );
  }

  /**
   * Add a course under a specific topic to the server
   * @param topicId - the id of the topic containing the course
   * @param course - the course to be added
   */
  addCourse(topicId: string, course: Course): Observable<Course> {
    const url = `${this.topicsURL}/${topicId}/courses`;

    return this.http.post<Course>(url, course, httpOptions).pipe(
        tap((nCourse: Course) => this.log(`added course w/ id=${nCourse.id}`)),
        catchError(this.handleError<Course>('addCourse'))
    );
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
  private log(message: string) { this.messageService.add('TopicService: ' + message); }
}
