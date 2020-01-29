import {Component, OnInit} from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {UserModel} from '../users-table/user.model';

@Component({
  selector: 'app-selected-user',
  templateUrl: './selected-user.component.html',
  styleUrls: ['./selected-user.component.css']
})
export class SelectedUserComponent implements OnInit {
  selectedUser: UserModel = new UserModel({});

  constructor(public dataService: DataService) {
  }

  ngOnInit() {
    this.selectedUser = {...this.dataService.selectedUser};
  }

}
