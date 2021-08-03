import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { current,forecast } from '../Interface';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class APICALLService {

  //121.09111539999999,.json?access_token=

  private MapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  private MapboxKey = 'pk.eyJ1Ijoic21kcGdzMDE3IiwiYSI6ImNrMWhpNWw1NjE4YXEzZGxidTM3aGFpN3kifQ.BkhS66yR3Qx7M3o11qjOEQ'
  private WeatherKey = '&appid=b8efcbdcd739d958f9b705f653f4c249&units=metric';
  private dataas = new BehaviorSubject<current>({} as any);
  intCurrent = this.dataas.asObservable();

  private dataasF = new BehaviorSubject<forecast>({} as any);
  intForecast = this.dataasF.asObservable();

  private tablee = new BehaviorSubject<current>({} as any);
  intTable = this.tablee.asObservable();

  constructor(private http: HttpClient) { }


  Mapbox(long:number,lat:number){
    return this.http.get(`${this.MapboxURL}${long},${lat}.json?access_token=${this.MapboxKey}`);
  }

  Weather(lat1:number,long1:number){
    const WeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat1+'&lon='+long1+'&exclude=hourly,minutely';
    console.log(`${WeatherURL}${this.WeatherKey}`);
    return this.http.get(`${WeatherURL}${this.WeatherKey}`);
  }

  //UPDATE OBSERVABLE BEHAVIOUR
  Currentt(daa: any){
    this.dataas.next(daa);
  }
  Forecastt(dat: any){
    this.dataasF.next(dat);
  }
  Tablee(dataaa: any){
    this.tablee.next(dataaa);
  }
  //-------------------------

  MapBoxSertz(City:string){
    return this.http.get(`${this.MapboxURL}${City}.json?access_token=${this.MapboxKey}`)
  }
}
