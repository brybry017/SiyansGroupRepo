import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APICALLService } from 'src/app/service/apicall.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css','./owfont-regular.css','./owfont-regular.min.css',],
})
export class CurrentComponent implements OnInit {

  templist:any;
  visiKM: any;
  icon: string = '';

  constructor(private service: APICALLService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    // const id:any = this.route.snapshot.paramMap.get('day')!;
    // console.log(id);
    // if(id == null){

    // }else{

    // }
    this.service.intCurrent.subscribe(res=>{
      this.templist = res;
      this.visiKM = Math.round(this.templist.visibility/1000);
      if(this.visiKM>=0){
        this.visiKM = this.visiKM + " KM ";
      }else{
        this.visiKM = " N/A "
      }
      console.log("HU",this.templist.icon);
      this.icon = "https://openweathermap.org/img/w/"+this.templist.icon+".png"
    })
  }

}
