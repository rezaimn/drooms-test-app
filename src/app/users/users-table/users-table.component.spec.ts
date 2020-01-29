import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersTableComponent} from './users-table.component';
import {DataService} from '../../shared/services/data.service';
import {HttpCallService} from '../../shared/services/http-call.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {BrowserModule, By} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {AppComponent} from '../../app.component';
import {SelectedUserComponent} from '../selected-user/selected-user.component';
import {FormsModule} from '@angular/forms';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;
  let searchInputTag;
  const sampleUsers = [
    {
      '_id': '5e2f01f6ca33a8b3adcfd816',
      'index': 0,
      'guid': '8e60a387-9c89-424f-93c7-21c667594a23',
      'isActive': true,
      'balance': '$2,533.46',
      'picture': 'http://placehold.it/32x32',
      'age': 29,
      'eyeColor': 'green',
      'name': 'Compton Mccullough',
      'gender': 'male',
      'company': 'SCENTRIC',
      'email': 'comptonmccullough@scentric.com',
      'phone': '+1 (953) 578-2491',
      'address': '537 Florence Avenue, Navarre, New Jersey, 9232',
      'registered': '2019-02-14T02:15:40 -04:-30',
      'latitude': -24.013659,
      'longitude': -120.290998
    },
    {
      '_id': '5e2f01f6831c9b6fadf9419d',
      'index': 1,
      'guid': '34e346d0-eff8-43a0-b178-6e8b59607571',
      'isActive': false,
      'balance': '$1,108.56',
      'picture': 'http://placehold.it/32x32',
      'age': 29,
      'eyeColor': 'brown',
      'name': 'Lott Goff',
      'gender': 'male',
      'company': 'MUSIX',
      'email': 'lottgoff@musix.com',
      'phone': '+1 (924) 563-2971',
      'address': '496 Thatford Avenue, Bergoo, Northern Mariana Islands, 7084',
      'registered': '2014-10-13T09:33:36 -04:-30',
      'latitude': 2.058457,
      'longitude': -43.060364
    },
    {
      '_id': '5e2f01f687554fbd5e3d6488',
      'index': 2,
      'guid': 'dc545b54-ea96-4267-bd64-6e1c6a1f1fb3',
      'isActive': true,
      'balance': '$2,412.49',
      'picture': 'http://placehold.it/32x32',
      'age': 22,
      'eyeColor': 'brown',
      'name': 'Melinda Wilder',
      'gender': 'female',
      'company': 'UNQ',
      'email': 'melindawilder@unq.com',
      'phone': '+1 (847) 530-3080',
      'address': '171 Oriental Court, Echo, Arizona, 6428',
      'registered': '2014-04-12T08:58:47 -05:-30',
      'latitude': 12.88671,
      'longitude': -124.318469
    },
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersTableComponent, SelectedUserComponent],
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
      ],
      providers: [
        DataService,
        HttpCallService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    searchInputTag = fixture.debugElement.query(By.css('input[name="search-input"]')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should split the search input text to array of words', async(() => {
    fixture.detectChanges();
    searchInputTag.value = 'Lott Goff';
    searchInputTag.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.searchTextArray.length).toEqual(2);
      }
    );
  }));

  it('should not call the searchUser function for spaces', async(() => {

    spyOn(component, 'searchInputToArray').and.callThrough();
    spyOn(component, 'searchUser');
    searchInputTag.value = 'Lott ';
    searchInputTag.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.searchUser).not.toHaveBeenCalled();
      }
    );
  }));

  it('should return a user with name "Lott Goff" when I enter "lo gof" or "496 av mari" ', async(() => {
    component.searchTextArray = ['lo', 'gof'];
    let user=component.checkUserFields(sampleUsers[1],component.searchFieldsList,component.searchTextArray);
    expect(user.name).toEqual('Lott Goff');

    component.searchTextArray = ['496', 'av' , 'mari'];
    user=component.checkUserFields(sampleUsers[1],component.searchFieldsList,component.searchTextArray);
    expect(user.name).toEqual('Lott Goff');
  }));

});
