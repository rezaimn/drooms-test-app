import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * this service is for handling RESTFUL APIs
 */
@Injectable()
export class HttpCallService {
  /**
   * @param http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * @param {string:url}
   *  Here we can call a get request to get an/array item/s.
   *  @return {Observable}
   */
  get(): Observable<any> {
    return this.http.get('./assets/user-list.json').pipe();
  }

}
