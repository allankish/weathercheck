import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherAPI:string;
  appID:string;

  constructor(private httpClient : HttpClient) {
    
    this.weatherAPI=environment.weatherAPI;
    this.appID=environment.AppID;
  }

  get(city:string):Observable<object[]>{
    return this.httpClient.get<object[]>(this.weatherAPI + "?q=" + city + "&appid=" + this.appID + "&units=metric");
  }
  
}
