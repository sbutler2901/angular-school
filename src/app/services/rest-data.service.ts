import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RestDataService {

  constructor( private http: HttpClient, private messageService: MessageService ) { }

  /**
   * Performs an http get request to the specified url to retrieve a single object
   * @param {string} url api rest service url for single object
   * @return {Observable<T>} observable of object requested
   */
  getOne<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  /**
   * Performs an http get request to the specified url to retrieve multiple objects
   * @param {string} url api rest service url for multiple objects
   * @return {Observable<T[]>} observable array of objects requested
   */
  getMany<T>(url: string): Observable<T[]> {
    return this.http.get<T[]>(url);
  }

  /**
   * Performs an http post request to the specified url to add a single object
   * @param {string} url api rest service url for adding a single object
   * @param {T} obj object to be submitted to server for addition
   * @return {Observable<T>} observable to course being submitted to server
   */
  add<T>(url: string, obj: T): Observable<T> {
    return this.http.post<T>(url, obj, httpOptions);
  }

  /**
   * Performs an http delete request to the specified url to delete a single object
   * @param {string} url api rest service url for deleting a single object
   * @return {Observable<void>} observable to course being deleted from server
   */
  delete(url: string): Observable<void> {
    return this.http.delete<void>(url);
  }

  /**
   * Performs and http put request to the specified url to update a specific object
   * @param {string} url api rest service url for updating a single object
   * @param {T} obj object being updated
   * @return {Observable<T>} observable to the object being updated
   */
  update<T>(url: string, obj: T): Observable<T> {
    return this.http.put<T>(url, obj, httpOptions);
  }
}
