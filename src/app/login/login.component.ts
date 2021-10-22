import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:FormControl;
  password:FormControl;
  loginForm:FormGroup;
  err?:string;

  constructor(private httpClient:HttpClient, private route:Router) {

    this.username = new FormControl('',[Validators.required,Validators.minLength(5)]);
    this.password = new FormControl('',[Validators.required,Validators.minLength(5)]);

    this.loginForm = new FormGroup({
      username:this.username,
      password:this.password
    });

  }

  ngOnInit(): void {
  }

  login(){
    this.httpClient.get<any>('http://localhost:4200/assets/data.json').subscribe(
      data=> {
        let user;
        for(let i = 0; i < data.users.length; i++) {
          if(data.users[i].username == this.loginForm.value.username) {
            user = data.users[i];
            break;
          }
        }

        if(user && user.password == this.loginForm.value.password) {
          sessionStorage.setItem("user",JSON.stringify({...user,password:undefined}));
          this.route.navigateByUrl('weather-checker');
        }
        else {
          this.err = "Username or Password is wrong";
        }
      },
      error=> {
        this.err = "Unexpected error has occured. Please try again";
      }
    );

  }

}
