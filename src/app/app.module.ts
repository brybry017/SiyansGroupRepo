import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { CurrentComponent } from './components/current/current.component';
import { TableAndDaylightComponent } from './components/table-and-daylight/table-and-daylight.component';
import { AppRoutingModule } from './app-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ForecastComponent,
    CurrentComponent,
    TableAndDaylightComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSliderModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
