import { Component } from '@angular/core';
import {DataService} from './shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading=false;
  constructor(private dataService:DataService){
    this.dataService.loader.subscribe(
      (loader=>{
        this.loading=loader;
      })
    )
  }
}
