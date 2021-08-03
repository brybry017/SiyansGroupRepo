import { Component, OnInit } from '@angular/core';
import { APICALLService } from 'src/app/service/apicall.service';
import { tableAndDay } from 'src/app/Interface';
@Component({
  selector: 'app-table-and-daylight',
  templateUrl: './table-and-daylight.component.html',
  styleUrls: ['./table-and-daylight.component.css']
})
export class TableAndDaylightComponent implements OnInit {
  dsunset: any;
  dsunrise: any;
  sunrise: string ='';
  sunset:  string ='';
  gap: string = '';
  table: any;
  constructor(private service: APICALLService) { }

  ngOnInit(): void {
    this.service.intTable.subscribe((res)=>{
      this.table = res;
      console.log(this.table);
      // this.dsunset = new Date(this.table.gap.sunset*1000);
      // this.dsunrise = new Date(this.table.gap.sunrise*1000);


      // this.sunrise = this.dsunset.getHours()+':'+this.dsunset.getMinutes();
      // this.sunset = this.dsunrise.getHours()+':'+this.dsunrise.getMinutes();

      // let dif = Math.abs(this.dsunset - this.dsunrise);
      // let difH = Math.floor((dif/(1000*60*60))%24);
      // let difM = Math.floor((dif/(1000*60)%60));
      // this.gap = difH+' HR '+':'+difM+' M';
    })
  }

}
