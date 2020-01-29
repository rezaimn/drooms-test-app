import {Component, OnInit} from '@angular/core';
import {HttpCallService} from '../../shared/services/http-call.service';
import {UserModel} from './user.model';
import {Router} from '@angular/router';
import {DataService} from '../../shared/services/data.service';
import {element} from 'protractor';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  /**
   * stores list of users
   */
  userList: UserModel[] = [];
  /**
   * stores list of filtered users
   */
  usersFilteredList: UserModel[] = [];
  /**
   * stores input text, but it is one character behind the real search input,
   * and we are using this advantage for ignoring search entered spaces.
   */
  searchText = '';
  /**
   * stores list of words we want to search for. extracted from input text.
   */
  searchTextArray: string[] = [];
  /**
   * Columns list to show users
   */
  colNames = [
    '#',
    'Avatar',
    'Name',
    'Age',
    'Eye',
    'Gender',
    'Company',
    'Email',
    'Phone Number',
    'Address'
  ];
  /**
   * fields list we want to search on.
   */
  searchFieldsList = [
    'name',
    'company',
    'email',
    'address',
    'phone'
  ];

  constructor(
    private httpCallService: HttpCallService,
    private router: Router,
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.getUsers();
  }

  /**
   * get user list from our json file
   */
  getUsers() {
    this.httpCallService.get().subscribe(
      res => {
        this.userList = res;
        // copy all users in filtered user list to show all the list in the firs view.
        this.usersFilteredList = [...this.userList];
      }
    );
  }

  /**
   * navigate to user details page.
   * @param user
   */
  showSelectedUser(user: UserModel) {
    // save selected user in a shared service to use in user details page
    this.dataService.selectedUser = user;
    this.router.navigate(['/user-details']);
  }

  /**
   * this function is responsible to get data from search input and
   * decide to search or not considering we ar adding/deleting a space or a character.
   * I had to limit the search calls to prevent searching for unnecessary space adding/deleting.
   * @param event
   */
  searchInputToArray(event) {
    // create a array of words using space separator.
    this.searchTextArray = event.target.value.split(' ');
    // this condition check to make sure you are not adding a space or not deleting the last space, and if it is so ignore the search process.
    if (event.target.value.trim().length === event.target.value.length) {
      // making sure that we are deleting chars or the last space.
      if (event.target.value.length < this.searchText.length) {
        // we must be sure the deleted item is a char or is the last space, so we can ignore unnecessary search
        if (this.searchText.trim().length === this.searchText.length) {
          this.searchUser(this.userList);
        }
      } else {
        // if we are adding new chars so we dont need to search on the all users again,
        // so we can use the last filtered version of user lists to decrease the search process steps.
        this.searchUser(this.usersFilteredList);
      }
    } else {
      //make sure we are deleting characters, so we need to search on the whole users again
      if (this.searchText.trim().length > event.target.value.trim().length) {
        this.searchUser(this.userList);
      }
    }
    // storing entered text to current search text
    this.searchText = event.target.value;
  }

  /**
   * getting a list of users to search on it using filter method
   * @param userListForSearch
   */
  searchUser(userListForSearch: UserModel[]) {
    this.usersFilteredList = userListForSearch.filter(user => {
        return this.checkUserFields(user, this.searchFieldsList, this.searchTextArray);
      }
    );
  }

  /**
   * this is a pure function getting a user and searchable fields and an array of words to search
   * it is returning the user if all the words is in a field of the user
   * @param user
   * @param searchFieldsList
   * @param searchTextArray
   */

  checkUserFields(user: UserModel, searchFieldsList, searchTextArray) {
    for (const searchField of searchFieldsList) {
      // this is a flag to make sure all the words we are looking for is in a specific user field
      let itemIsInField = true;
      for (const searchItem of searchTextArray) {
        // checks if one of the user fields is not includes a searching word so we can ignore the rest of words and start checking next user field
        if (!(user[searchField].toLowerCase().includes(searchItem.toLowerCase()))) {
          itemIsInField = false;
          break;
        }
      }
      // if we find a mach so we dont need to continue checking other words and fields, we can just return the user as a hit.
      if (itemIsInField) {
        return user;
      }
    }
  }
}
