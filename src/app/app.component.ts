import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { APICALLService } from './service/apicall.service';
import { current,forecast,tableAndDay } from './Interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit{
  title = 'WeatherApp-Siyans';
  lat: any;
  long: any;

  city: any;
  city1: any;

  WeatherData: any;

  datCurrent: current ={
    temperatur: 0,
    feel_likes: 0,
    wind: 0,
    visibility: 0,
    humidity: 0,
    pressure: 0,
    dewpoint: 0,
    icon: '',
    description: '',
    low: 0,
  }
  datForeCast: forecast[] = [];


  table: tableAndDay ={
    temp:{
      day:0,
      night:0,
      eve:0,
      morn:0
    },
    feel:{
      day:0,
      night:0,
      eve:0,
      morn:0,
    },
    gap:{
      sunset: 0,
      sunrise: 0,
      gapp: 0,
    }
  }

  constructor(private service: APICALLService, private route: ActivatedRoute){}

  ngOnInit(){
    if(!navigator.geolocation){
      console.log('Location Not Supported')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
        this.long = position.coords.longitude;
        this.lat = position.coords.latitude;
        this.MapBox(this.long,this.lat);
    })
  }
  MapBox(long:any,lat:any){
    this.service.Mapbox(long,lat).subscribe((res)=>{
    this.city = res;
    this.city1 = this.city.features[0].context[2].text;
    console.log(this.city1);
    this.Weather(lat,long);
    })

  }
  Weather(lat:any,long:any){
    this.service.Weather(lat,long).subscribe((res)=>{
      this.WeatherData = res;

      console.log(this.WeatherData);
      this.datCurrent.temperatur = this.WeatherData.current.temp;
      this.datCurrent.feel_likes = this.WeatherData.current.feels_like;
      this.datCurrent.wind = this.WeatherData.current.wind_speed;
      this.datCurrent.visibility = this.WeatherData.current.visibility;
      this.datCurrent.humidity = this.WeatherData.current.humidity;
      this.datCurrent.pressure = this.WeatherData.current.pressure;
      this.datCurrent.dewpoint = this.WeatherData.current.dew_point;
      this.datCurrent.icon = this.WeatherData.current.weather[0].icon;
      this.datCurrent.description = this.WeatherData.current.weather[0].description;
      this.datCurrent.low = this.WeatherData.daily[0].temp.min;
      this.service.Currentt(this.datCurrent);
      // const dew = Math.log(this.WeatherData.main.humidity/100)
      // const dew1 = (17.625*this.WeatherData.main.temp)/(243.04+this.WeatherData.main.temp);
      // console.log(243.04*(dew+dew1)/(17.625-(dew)-dew1))
      // const dews = 243.04*(dew+dew1)/(17.625-(dew)-dew1)

      // this.datCurrent.dewpoint = dews;
      // this.service.Currentt(this.datCurrent);
      console.log(this.datCurrent);

      this.table.temp.day = this.WeatherData.daily[0].temp.day;
      this.table.temp.eve = this.WeatherData.daily[0].temp.eve;
      this.table.temp.morn = this.WeatherData.daily[0].temp.morn;
      this.table.temp.night = this.WeatherData.daily[0].temp.night;


      let sunrise:any = new Date(this.WeatherData.daily[0].sunrise*1000);
      let sunset:any = new Date(this.WeatherData.daily[0].sunset*1000);

      let sunsT:any = sunset.getHours()+':'+ sunset.getMinutes();
      let sunsR:any = sunrise.getHours()+':'+sunrise.getMinutes();

      this.table.feel.day = this.WeatherData.daily[0].feels_like.day;
      this.table.feel.eve = this.WeatherData.daily[0].feels_like.eve;
      this.table.feel.morn = this.WeatherData.daily[0].feels_like.morn;
      this.table.feel.night = this.WeatherData.daily[0].feels_like.night;

      this.table.gap.sunrise = sunsR;
      this.table.gap.sunset = sunsT;

      let dif = Math.abs( sunset - sunrise);
      let difH = Math.floor((dif/(1000*60*60))%24);
      let difM = Math.floor((dif/(1000*60)%60));
      let gapps = difH+' HR '+':'+difM+' M';
      this.table.gap.gapp = gapps;


      this.datForeCast = this.WeatherData.daily;
      this.service.Forecastt(this.datForeCast);

      this.service.Tablee(this.table);
    })
  }
}
