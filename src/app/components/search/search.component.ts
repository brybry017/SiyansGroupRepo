import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { APICALLService } from 'src/app/service/apicall.service';
import { current, forecast, tableAndDay } from 'src/app/Interface';

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

  datForeCast: forecast[] = [];

  @Output() image = new EventEmitter<string>();

  constructor(private service: APICALLService) { }

  ngOnInit(): void {
  }
  search(sertz:HTMLInputElement){
    if(sertz.value == ''){
      alert("Input Location")
    }else{
      console.log(sertz.value);
      this.service.Mapbox(sertz.value).subscribe((res)=>{
        this.City = sertz.value;
        this.sertzMap = res;
        sertz.value = '';
        this.City = this.sertzMap.features[0].place_name;
        console.log(this.sertzMap.features[0].center)
        this.MapBoxSertz(this.sertzMap.features[0].center);
      })
    }
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
      let upp:string = this.WeatherData.current.weather[0].description;
      console.log(upp.charAt(0).toUpperCase() + upp.slice(1));
      this.datCurrent.description = upp;
      this.datCurrent.low = this.WeatherData.daily[0].temp.min;
      this.service.Currentt(this.datCurrent);
      console.log(this.datCurrent);
      this.datForeCast = this.WeatherData.daily;
      this.service.Forecastt(this.datForeCast);

      this.table.temp.day = this.WeatherData.daily[0].temp.day;
      this.table.temp.eve = this.WeatherData.daily[0].temp.eve;
      this.table.temp.morn = this.WeatherData.daily[0].temp.morn;
      this.table.temp.night = this.WeatherData.daily[0].temp.night;

      // console.log("DI NAKA TIMES:",this.WeatherData.daily[0].sunrise)
      // console.log("NAKA TIMES:",new Date(this.WeatherData.daily[0].sunrise*1000));

      let sunrise:any = new Date(this.WeatherData.daily[0].sunrise*1000);
      let sunset:any = new Date(this.WeatherData.daily[0].sunset*1000);

      console.log(this.WeatherData);
      let sunsT:any;
      let sunsR:any;
      console.log(sunset.getHours());
      console.log(sunrise.getHours());
      if(12>sunset.getHours()){
        sunsT = (sunset.getHours())+':'+ sunset.getMinutes();
        console.log(sunsT);
        console.log(true);
      }else{
        sunsT = (sunset.getHours()-12)+':'+ sunset.getMinutes();
        console.log(sunsT);
        console.log(false);
      }
      if(12>sunrise.getHours()){
        sunsR = (sunrise.getHours())+':'+ sunrise.getMinutes();
        console.log(sunsR);
        console.log(true);
      }else{
        sunsR = (sunrise.getHours()-12)+':'+sunrise.getMinutes();
        console.log(sunsR);
        console.log(false);
      }


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
      this.service.Tablee(this.table);

      if(upp.includes("clouds") || upp.includes("sky")){
        this.image.emit('url(../../assets/ezgif-7-0de4b57f22dc.gif)');
      }else if(upp.includes("rain")){
       this.image.emit('url(https://bestanimations.com/media/rain/512938024city-view-rain-falling-gif.gif)')
      }else if(upp.includes("snow")){
        this.image.emit('url(https://i.gifer.com/7YWG.gif)')
      }else{

      }
    })
  }
}
