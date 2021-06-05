import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

public IsLogged = false;
public user: any;
  constructor( private LoginS: LoginService) { }

  ngOnInit() {
   this.LoginS.isSessionActive$.subscribe(data=>{
     this.IsLogged = data;
   })

   this.LoginS.userData$.subscribe(data=>{
     this.user = data;
   })
  }
   onLogout(){
    
       this.LoginS.SignOut();
  
  
  }

}
