import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CandyComponent } from './candy/candy.component';
import { SuggestionComponent } from './suggestion/suggestion.component'
import { FormsModule } from '@angular/forms';
import { AddSuggestionComponent } from './add-suggestion/add-suggestion.component';
import { CommentsComponent } from './comments/comments.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CandyComponent,
    SuggestionComponent,
    AddSuggestionComponent,
    CommentsComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
