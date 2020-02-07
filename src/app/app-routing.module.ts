import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersTableComponent} from './users/users-table/users-table.component';
import {SelectedUserComponent} from './users/selected-user/selected-user.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersTableComponent
  },
  {
    path: 'users/:id',
    component: SelectedUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
