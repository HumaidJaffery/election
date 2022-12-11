import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {
  @ViewChild('scrollelement') scrollElement: any;

  Pages: any[] = [];
  currentPageNumber = 0;
  lastPage: boolean = false;
  hasBeenLiked = false;
  redirect: boolean;
    

  constructor(private http: HttpClient, private suggestionService: SuggestionService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.redirect = this.actRoute.snapshot.paramMap.get('redirect') == 'true' ? true : false;

    this.suggestionService.getSuggestionPage(this.currentPageNumber).subscribe((response: any)=>{
      this.Pages.push(response);
    })

  }

  scroll(data: any){
    // visible height + pixel scrolled >= total height 
    if (data.target.offsetHeight + data.target.scrollTop >= data.target.scrollHeight && !this.lastPage) {
      this.currentPageNumber += 1;
      this.loadSuggestions();
      if(this.Pages[this.Pages.length-1].last){
        this.lastPage = true;
      }
    }
  }

  loadSuggestions(){
    this.suggestionService.getSuggestionPage(this.currentPageNumber).subscribe((response: any)=>{
      this.Pages.push(response);
    })
  }


  

}
