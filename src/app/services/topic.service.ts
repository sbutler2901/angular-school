import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Topic} from '../topic';
import { catchError, tap } from 'rxjs/operators';
import {RestDataService} from './rest-data.service';
import {of} from 'rxjs/observable/of';
import {MessageService} from './message.service';


@Injectable() // tells Angular that this service might itself have injected dependencies.
export class TopicService {

  private topicsURL = 'http://localhost:8081/topics';  // URL to web api

  constructor( private restDataService: RestDataService, private messageService: MessageService ) { }

  /**
   * Get a specific topic from the server
   * @param {string} id the id of the topic to be retrieved
   * @return {Observable<Topic>} observable of topic being retrieved
   */
  getTopic(id: string): Observable<Topic> {
    const url = `${this.topicsURL}/${id}`;

    return this.restDataService.getOne<Topic>(url).pipe(
      tap(() => this.log(`fetched topic id=${id}`)),
      catchError(this.handleError<Topic>(`getTopic id=${id}`))
    );
  }

  /**
   * Get all topics from the server
   * @return {Observable<Topic[]>} observable of topics being retrieved
   */
  getTopics(): Observable<Topic[]> {
    return this.restDataService.getMany<Topic>(this.topicsURL).pipe(
      tap(() => this.log(`fetched topics`) ),
      catchError(this.handleError<Topic[]>('getMany ', []))
    );
  }

  /**
   * Add a new topic to the server.
   * @param {Topic} topic the topic to be added
   * @return {Observable<Topic>} observable of topic being added
   */
  addTopic(topic: Topic): Observable<Topic> {
    return this.restDataService.add<Topic>(this.topicsURL, topic).pipe(
      tap((ntopic: Topic) => this.log(`added topic w/ id=${ntopic.id}`)),
      catchError(this.handleError<Topic>('addTopic'))
    );
  }

  /**
   * Updates a topic on the server
   * @param {Topic} topic the topic to be updated
   * @return {Observable<Topic>} the updated topic
   */
  updateTopic(topic: Topic): Observable<Topic> {
    const url = `${this.topicsURL}/${topic.id}`;

    return this.restDataService.update<Topic>(url, topic).pipe(
      tap((ntopic: Topic) => this.log(`added topic w/ id=${ntopic.id}`)),
      catchError(this.handleError<Topic>('addTopic'))
    );
  }

  /**
   * Delete a topic from the server
   * @param {string} id the id of the topic to be deleted
   */
  deleteTopic(id: string): Observable<void> {
      const url = `${this.topicsURL}/${id}`;

      return this.restDataService.delete(url).pipe(
          tap(() => this.log(`deleted topic id=${id}`)),
          catchError(this.handleError<void>(`deleteTopic id=${id}`))
      );
  }

  /**
   * Handle Http operation that failed.
   * @param {string} operation name of the operation that failed
   * @param {T} result optional value to return as the observable result
   * @return {(error: any) => Observable<T>}
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
   * @param {string} message message to be logged
   */
  private log(message: string) { this.messageService.add('TopicService: ' + message); }

}
