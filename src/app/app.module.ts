import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { AdsListComponent } from './ads-list/ads-list.component';
import { AllAdsComponent } from './all-ads/all-ads.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AdsListComponent,
    AllAdsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
