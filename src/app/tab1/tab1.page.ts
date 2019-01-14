import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private data: any;
  constructor(){
    this.data = JSON.parse(atob(document.cookie.replace('data=','')));
  }

  parseJSON(json){
    return JSON.parse(json);
  }

  view(url){
    console.log(url)
  }

  replaceUnderscores(str){
    return str.replace(/[^a-z0-9]+/gi,' ');
  }
}
