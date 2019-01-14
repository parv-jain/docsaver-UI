import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  constructor(private storage: Storage, private router: Router){

  }

  ngOnInit(){
    this.storage.get('data').then((data) => {
      if(data == null) this.router.navigate(['']);
    });
    this.storage.get('apiToken').then((data) => {
      if(data == null) this.router.navigate(['']);
    });

  }
}
