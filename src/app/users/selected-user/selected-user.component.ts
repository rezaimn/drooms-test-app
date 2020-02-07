import {Component, OnInit} from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {UserModel} from '../users-table/user.model';
import {ActivatedRoute} from '@angular/router';
import {HttpCallService} from '../../shared/services/http-call.service';

@Component({
  selector: 'app-selected-user',
  templateUrl: './selected-user.component.html',
  styleUrls: ['./selected-user.component.css']
})
export class SelectedUserComponent implements OnInit {
  selectedUser: UserModel;
  selectedId:string;
  constructor(public dataService: DataService, private httpCallService:HttpCallService,
              private route:ActivatedRoute) {
      this.selectedId=this.route.snapshot.paramMap.get('id');
      this.getSelectedUser();
  console.log(this.selectedId)
  }

  ngOnInit() {


  }
  getSelectedUser(){
    this.httpCallService.get(this.selectedId).subscribe(
      res => {
        this.selectedUser=res[0];
      }
    );
  }
}
