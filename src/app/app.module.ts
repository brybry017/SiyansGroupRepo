import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { CurrentComponent } from './components/current/current.component';
import { TableAndDaylightComponent } from './components/table-and-daylight/table-and-daylight.component';
import { AppRoutingModule } from './app-routing.module';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
