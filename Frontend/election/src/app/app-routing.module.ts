import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSuggestionComponent } from './add-suggestion/add-suggestion.component';
import { CandyComponent } from './candy/candy.component';
import { HomeComponent } from './home/home.component';
import { SuggestionComponent } from './suggestion/suggestion.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'candy', component: CandyComponent},
  {path: 'suggestion', component: SuggestionComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
