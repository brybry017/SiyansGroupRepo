import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { APICALLService } from 'src/app/service/apicall.service';
import { current, forecast } from 'src/app/Interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() City='';
  sertzMap: any;
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

  constructor(private service: APICALLService) { }

  ngOnInit(): void {
  }
  search(sertz:HTMLInputElement){
    console.log(sertz.value);
    this.service.MapBoxSertz(sertz.value).subscribe((res)=>{
      this.City = sertz.value;
      this.sertzMap = res;
      sertz.value = '';
      this.City = this.sertzMap.features[0].place_name;
      console.log(this.sertzMap.features[0].center)
      this.MapBoxSertz(this.sertzMap.features[0].center);

    })
  }

  MapBoxSertz(coords: any[]){
    const long = coords[0];
    const lat = coords[1];
    this.service.Weather(lat,long).subscribe((res) =>{
      this.WeatherData = res;
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
      console.log(this.datCurrent);
      this.datForeCast = this.WeatherData.daily;
      this.service.Forecastt(this.datForeCast);
    })
  }
}
