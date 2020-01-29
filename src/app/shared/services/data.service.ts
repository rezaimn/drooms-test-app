import {Injectable} from '@angular/core';
import {UserModel} from '../../users/users-table/user.model';


@Injectable()
export class DataService {
  selectedUser: UserModel = new UserModel({});
}
