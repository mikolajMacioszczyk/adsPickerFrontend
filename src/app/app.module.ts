import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { AllAdsComponent } from './all-ads/all-ads.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { SearchByQueryComponent } from './search-by-query/search-by-query.component';
import {MatSelectModule} from '@angular/material/select';
import { ExampleComponent } from './example/example.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AllAdsComponent,
    DetailsComponent,
    EditComponent,
    CreateComponent,
    SearchByQueryComponent,
    ExampleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
