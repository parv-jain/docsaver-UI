import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private data: any;
  private dataLoaded: boolean = false;
  constructor(private storage: Storage){
    this.storage.get('data').then((data) => {
      this.data = JSON.parse(atob(data));
      this.dataLoaded = true;
    });
  }

  parseJSON(json){
    return JSON.parse(json);
  }

  view(url){
    window.open(url);
  }

  replaceUnderscores(str){
    return str.replace(/[^a-z0-9]+/gi,' ');
  }

  doRefresh($event){
    this.storage.get('data').then((data) => {
      this.data = JSON.parse(atob(data));
      this.dataLoaded = true;
    });
    setTimeout(() => {
      $event.target.complete();
    }, 2000);
  }
}
