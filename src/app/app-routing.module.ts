import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAdsComponent } from './all-ads/all-ads.component';

const routes: Routes = [
  {path: 'all', component: AllAdsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
