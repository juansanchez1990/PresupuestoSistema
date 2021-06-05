import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
    constructor(private LoginService: LoginService) { }
  
    ngOnInit(): void {
    }
  
    async OnRegister(){
      const {email, password}= this.registerForm.value
      try {
        this.LoginService.SignUp(email, password)
      }
      catch(error){
        
      }
    }
  
}
