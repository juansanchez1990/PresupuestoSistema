import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm = new FormGroup({
  email: new FormControl(''),
  password: new FormControl(''),
})
  constructor(private LoginService: LoginService) { }

  ngOnInit(): void {
  }

  async OnLogin(){
    const {email, password}= this.loginForm.value
    try {
      this.LoginService.SignIn(email, password)
    }
    catch(error){
      
    }
  }

}
