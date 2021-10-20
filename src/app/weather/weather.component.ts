import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  weatherForm: FormGroup;
  weatherData?:any;
  err?:string;

  city: FormControl;
  constructor(private weatherService:WeatherService) {

    this.city = new FormControl('', [Validators.required,Validators.minLength(2)]);

    this.weatherForm = new FormGroup({
      city: this.city
    });


   }

   formSubmitted(){
console.log(this.weatherForm.value.city);
    this.weatherService.get(this.weatherForm.value.city).subscribe(
      data => {this.weatherData=data;console.log(this.weatherData.main);this.err="";},
      err=>{console.log(err);this.err="No records found";this.weatherData = "";}
    );
   }

}
