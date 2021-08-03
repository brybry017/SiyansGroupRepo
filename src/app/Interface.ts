export interface current{
  temperatur: number;
  feel_likes: number;
  wind:number;
  visibility:number;
  humidity:number;
  pressure:number;
  dewpoint:number;
  icon:string;
  description:string;
  low:number;
}
export interface forecast{
  temperatur: number;
  feel_likes: number;
  wind:number;
  visibility:number;
  humidity:number;
  pressure:number;
  dewpoint:number;
}

export interface tableAndDay{
  temp:{
    day:number;
    night:number;
    eve:number;
    morn:number;
  }
  feel:{
    day:number;
    night:number;
    eve:number;
    morn:number;
  }
  gap:{
    sunset:any;
    sunrise:any;
    gapp: any;
  }
}
