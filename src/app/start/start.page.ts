import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup  } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  private signInForm: FormGroup;
  private signUpForm: FormGroup;
  private userAction: string;
  private processing: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private toastCtrl: ToastController, private storage: Storage) { 
    this.userAction = 'signIn';
    this.signInForm = this.formBuilder.group({
      email : ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password : ['', Validators.compose([
        Validators.required
      ])]
    });

    this.signUpForm = this.formBuilder.group({
      email : ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      name : ['', Validators.compose([
        Validators.required
      ])],
      password : ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  ngOnInit() {
    this.storage.get('data').then((data) => {
      if(data != null){
        this.storage.get('apiToken').then((data) => {
          if(data != null)
          this.router.navigate(['/dash/tab1']);
        });
      }
    });
  }

  signIn() {
    this.processing = true;
    let email = this.signInForm.value.email;
    let password = this.signInForm.value.password;
    let apiToken = btoa(JSON.stringify({
      "email": email,
      "password": password
    }));
    this.apiService.getAuthenticatedUser(apiToken).subscribe((data) => {
      let encrptedData = btoa(JSON.stringify(data));
      this.storage.set("data", encrptedData);
      this.storage.set("apiToken", apiToken);
      this.router.navigate(['/dash/tab1']);
      this.processing = false;
    }, (error) => {
      this.presentToastWithOptions("Some error occured. Please make sure you have entered correct auth details.");
      this.processing = false;
    });
  }

  signUp() {
    this.processing = true;
    let name = this.signUpForm.value.name;
    let email = this.signUpForm.value.email;
    let password = this.signUpForm.value.password;
    let json = {
      "name": name,
      "email": email,
      "password": password
    }
    this.apiService.signUp(json).subscribe((data) => {
      let apiToken = btoa(JSON.stringify({
        "email": email,
        "password": password
      }));  
      let encrptedData = btoa(JSON.stringify(data));
      this.storage.set("data", encrptedData);
      this.storage.set("apiToken", apiToken);
      this.router.navigate(['/dash/tab1']);
      this.processing = false;
    }, (error) => {
      this.presentToastWithOptions("Some error occured. Please make sure this email is not already registered with us.");
      this.processing = false;
    });
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      position: 'bottom',
      duration: 5000,
      closeButtonText: 'Dismiss'
    });
    toast.present();
  }
}
