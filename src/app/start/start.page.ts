import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup  } from '@angular/forms';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  private signInForm: FormGroup;
  private signUpForm: FormGroup;
  private userAction: any;
  
  constructor(private formBuilder: FormBuilder, private router: Router) { 
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
  }

  signIn() {
    console.log(this.signInForm.value.email);
    console.log(this.signInForm.value.password);
    this.router.navigate(['/dash/tab1']);
  }

  signUp() {
    console.log(this.signUpForm.value.email);
    console.log(this.signUpForm.value.password);
    console.log(this.signUpForm.value.name);
  }
}
