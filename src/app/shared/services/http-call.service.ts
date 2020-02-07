import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {delay, filter, map, tap} from 'rxjs/operators';
import {UserModel} from '../../users/users-table/user.model';
import {DataService} from './data.service';

/**
 * this service is for handling RESTFUL APIs
 */
@Injectable()
export class HttpCallService {
  /**
   * @param http
   */
  constructor(private http: HttpClient,private dataService:DataService) {
  }

  /**
   * @param {string:url}
   *  Here we can call a get request to get an/array item/s.
   *  @return {Observable}
   */
  get(id:string): Observable<any> {
    this.dataService.loader.emit(true);
    return this.http.get('./assets/user-list.json').pipe( delay( 5000 ),
      map((users: Array<UserModel>) =>{
        this.dataService.loader.emit(false);
        return users.filter(item => item._id === id || !id)
        },
    ));

  }

}
