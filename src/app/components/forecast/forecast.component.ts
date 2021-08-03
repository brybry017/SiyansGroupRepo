import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APICALLService } from 'src/app/service/apicall.service';
import { current,tableAndDay } from 'src/app/Interface';
@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  datFor: any;
  rev: any;
  day: any;
  days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  dates: string[] = [];

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


  constructor(private service: APICALLService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.intForecast.subscribe((res)=>{
      this.datFor = res;
      console.log(this.datFor);
      console.log(this.datFor);
      for(const hu in this.datFor){
        this.day = new Date(this.datFor[hu].dt*1000);
        console.log(this.days[this.day.getDay()])
        const ff = this.days[this.day.getDay()]
        this.dates.push(ff)
      }
    })
  }
  hu(id:number){
    console.log(this.datFor[id].temp.max);
    console.log(this.datFor[id].temp.min);
    this.datCurrent.temperatur = (this.datFor[id].temp.max + this.datFor[id].temp.min)/2;
    this.datCurrent.feel_likes = (this.datFor[id].feels_like.day
      +this.datFor[id].feels_like.night+this.datFor[id].feels_like.eve+this.datFor[id].feels_like.morn)/4
    console.log(this.datCurrent.feel_likes);
    this.datCurrent.wind = this.datFor[id].wind_speed;
    this.datCurrent.visibility = 0;
    this.datCurrent.humidity = this.datFor[id].humidity;
    this.datCurrent.pressure = this.datFor[id].pressure;
    this.datCurrent.dewpoint = this.datFor[id].dew_point;
    this.datCurrent.description = this.datFor[id].weather[0].description;
    this.datCurrent.icon = this.datFor[id].weather[0].icon;
    this.datCurrent.low = this.datFor[id].temp.min;
    this.service.Currentt(this.datCurrent);
    console.log(this.dates[id]);
    console.log("TANGGGA",this.datFor[id]);

    this.table.temp.day = this.datFor[id].temp.day;
    this.table.temp.eve = this.datFor[id].temp.eve;
    this.table.temp.morn = this.datFor[id].temp.morn;
    this.table.temp.night = this.datFor[id].temp.night;


    let sunrise:any = new Date(this.datFor[id].sunrise*1000);
    let sunset:any = new Date(this.datFor[id].sunset*1000);

    let sunsT:any = sunset.getHours()+':'+ sunset.getMinutes();
    let sunsR:any = sunrise.getHours()+':'+sunrise.getMinutes();

    this.table.feel.day = this.datFor[id].feels_like.day;
    this.table.feel.eve = this.datFor[id].feels_like.eve;
    this.table.feel.morn = this.datFor[id].feels_like.morn;
    this.table.feel.night = this.datFor[id].feels_like.night;

    this.table.gap.sunrise = sunsR;
    this.table.gap.sunset = sunsT;

    let dif = Math.abs( sunset - sunrise);
    let difH = Math.floor((dif/(1000*60*60))%24);
    let difM = Math.floor((dif/(1000*60)%60));
    let gapps = difH+' HR '+':'+difM+' M';
    this.table.gap.gapp = gapps;


    console.log(this.table);
    this.service.Tablee(this.table);


  }
}
