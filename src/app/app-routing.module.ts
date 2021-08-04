import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { CurrentComponent } from './components/current/current.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'forecast/:day', component: AppComponent},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
