import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  private data: any;
  private dataLoaded: boolean = false;
  
  constructor(private storage: Storage, private router: Router){
    this.storage.get('data').then((data) => {
      this.data = JSON.parse(atob(data));      
      this.dataLoaded = true;
    });
  }

  doRefresh($event){
    this.storage.get('data').then((data) => {
      this.data = JSON.parse(atob(data));
    });
    setTimeout(() => {
      $event.target.complete();
    }, 2000);
  }

  logout(){
    this.storage.remove('data');
    this.storage.remove('apiToken');
    this.router.navigate(['']);
  }
}
