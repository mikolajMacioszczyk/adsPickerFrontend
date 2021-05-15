import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAdsComponent } from './all-ads/all-ads.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path: 'all', component: AllAdsComponent},
  {path: 'details/:id', component: DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
