import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAFTwtBCYDaL-zaaNZOeF1M3AP7A9apzGw'
    })
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule],
    
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
