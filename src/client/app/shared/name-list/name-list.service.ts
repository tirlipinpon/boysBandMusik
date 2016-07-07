import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Musique} from '../+home/../../+home/musique';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/catch';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class NameListService {

  /**
   * The array of initial names provided by the service.
   * @type {Array}
   */
  names: string[];

  /**
   * Contains the currently pending request.
   * @type {Observable<string[]>}
   */
  private request: Observable<string[]>;

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource. If there was a previous successful request
   * (the local names array is defined and has elements), the cached version is returned
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<string[]> {
    if (this.names && this.names.length) {
      return Observable.from([this.names]);
    }
    if (!this.request) {
      this.request = this.http.get('/assets/data.json')
        .map((response: Response) => response.json())
        .map((data: string[]) => {
          this.request = null;
          return this.names = data;
        }).publishReplay(1).refCount();
    }
    return this.request;
  }


  load(): Observable<Musique[]>{
    return this.http.get('http://localhost/php/datas.php')
    .map(this.extractData)
    //.catch(this.handleError);
  }

  private extractData(res: Response) {
    //console.log(res);
  let body = res.json();
  //console.log(body);
  return body || { };
}

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  /**
   * Adds the given name to the array of names.
   * @param {string} value - The name to add.
   */
  add(value: string): void {
    this.names.push(value);
  }
}
