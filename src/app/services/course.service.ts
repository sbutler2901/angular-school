import { Injectable } from '@angular/core';
import {MessageService} from './message.service';
import {RestDataService} from './rest-data.service';
import {Observable} from 'rxjs/Observable';
import {Course} from '../course';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class CourseService {

  private topicsURL = 'http://localhost:8081/topics';  // URL to web api

  constructor( private restDataService: RestDataService, private messageService: MessageService ) { }

  /**
   * Get a specifc course from the server
   * @param {string} topicId id of parent topic for the course
   * @param {string} courseId id of the course being requested
   * @return {Observable<Course>} observable of course being retrieved
   */
  getCourse(topicId: string, courseId: string): Observable<Course> {
    const url = `${this.topicsURL}/${topicId}/courses/${courseId}`;

    // return this.restDataService.getOne<Course>(url).pipe(
    //   tap(() => this.log(`fetched topic id=${id}`)),
    //   catchError(this.handleError<Course>(`getTopic id=${id}`))
    // );

    return this.restDataService.getOne<Course>(url).pipe(
      tap(() => this.log(`fetched course w/ id ${courseId} for topic id ${topicId}`) ),
      catchError(this.handleError<Course>('getCourse '))
    );
  }

  /**
   * Get all courses of a topic from the server
   * @param {string} topicId id of parent topic for courses
   * @return {Observable<Course[]>} observable of courses being retrieved
   */
  getCourses(topicId: string): Observable<Course[]> {
    const url = `${this.topicsURL}/${topicId}/courses`;

    return this.restDataService.getMany<Course>(url).pipe(
      tap(() => this.log(`fetched courses for topic id ${topicId}`) ),
      catchError(this.handleError<Course[]>('getCourses ', []))
    );
  }

  /**
   * Add a course under a specific topic to the server
   * @param {string} topicId the id of the topic containing the course
   * @param {Course} course the course to be added
   * @return {Observable<Course>} obserable of course being retrieved
   */
  addCourse(topicId: string, course: Course): Observable<Course> {
    const url = `${this.topicsURL}/${topicId}/courses`;

    return this.restDataService.add<Course>(url, course).pipe(
      tap((nCourse: Course) => this.log(`added course w/ id=${nCourse.id}`)),
      catchError(this.handleError<Course>('addCourse'))
    );
  }

  updateCourse(topicId: string, course: Course): Observable<Course> {
    const url = `${this.topicsURL}/${topicId}/courses/${course.id}`;

    return this.restDataService.update<Course>(url, course).pipe(
      tap((nCourse: Course) => this.log(`added course w/ id=${nCourse.id}`)),
      catchError(this.handleError<Course>('addCourse'))
    );
  }

  deleteCourse(topicId: string, courseId: string): Observable<void> {
    const url = `${this.topicsURL}/${topicId}/courses/${courseId}`;

    return this.restDataService.delete(url).pipe(
      tap(() => this.log(`deleted course id=${courseId} topic id=${topicId}`)),
      catchError(this.handleError<void>(`deleteTopic course id=${courseId} topic id=${topicId}`))
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
