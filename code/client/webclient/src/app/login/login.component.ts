import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;  
 
 
  constructor(fb: FormBuilder) {  
    this.loginForm = fb.group({  
      'username':  ['', Validators.required]  
    });
  }
 
  onSubmit(value: string): void {  
    //this.router.navigate(['/chat/']);    
    console.log('you submitted value: ', value);  
  }

}
