import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAdsComponent } from './all-ads/all-ads.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { SearchByQueryComponent } from './search-by-query/search-by-query.component';

const routes: Routes = [
  {path: 'all', component: AllAdsComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'create', component: CreateComponent},
  {path: 'search', component: SearchByQueryComponent},
  {path: '', component: AllAdsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
