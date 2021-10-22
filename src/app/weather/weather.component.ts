import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherForm: FormGroup;
  weatherData?:any;
  err?:string;

  city: FormControl;
  constructor(private weatherService:WeatherService, private route:Router) {

    this.city = new FormControl('',[Validators.required, Validators.minLength(4)]);

    this.weatherForm = new FormGroup({
      city: this.city
    });


   }
   ngOnInit() {
      if(!sessionStorage.getItem("user")) {
        this.route.navigateByUrl('/login');
      }
   }

   formSubmitted(){
    this.weatherService.get(this.weatherForm.value.city).subscribe(
      data => {
        this.weatherData=data;this.err="";
      },
      err=>{
        console.log(err);this.err="No records found";this.weatherData = {};
      }
    );
   }

   logout() {
     console.log("in logout");
     sessionStorage.removeItem("user");
     this.route.navigateByUrl("/login");
   }

}
