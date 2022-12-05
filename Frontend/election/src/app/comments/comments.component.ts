import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input('suggestion') suggestion: any;

  @ViewChild('noComments') noCommentsText: ElementRef;

  isFirstPage: boolean = true;
  isLastPage: boolean = false;
  comments: any[] = [];
  commentsHidden: boolean = true;
  currentPageNumber: number = 0;
  isFormHidden: boolean = true;

  constructor(private http: HttpClient, private suggestionService: SuggestionService) { }

  ngOnInit(): void {
  }

  getComments(pageNumber: number){
    this.http.get(`${environment.apiServerUrl}/getComments/${this.suggestion.suggestionId}/${pageNumber}`,).subscribe((response: any)=>{
      for(var comment of response.content){
        this.comments.push(comment)
      }

      if(this.isFirstPage){
        this.isFirstPage = false;
        this.commentsHidden = false;
        if(response.content.length == 0){
          this.isLastPage = true;
          this.noCommentsText.nativeElement.hidden = false;
          return;
        }
      }

      if(response.last){
        this.isLastPage = true;
        return;
      }

      this.currentPageNumber += 1;

    })
  }

  hideComments(){
    this.commentsHidden = true;
    this.isFirstPage = true;
    this.isLastPage = false;
    this.comments = [];
    this.currentPageNumber = 0;

    this.noCommentsText.nativeElement.hidden = true;
  }

  revealForm(){
    this.isFormHidden = !this.isFormHidden;
  }

  addComment(data: any){
    this.isFormHidden = true;
    var comment: any = {
      "text": data.value.newComment,
      "suggestion": this.suggestion
    }
    this.suggestionService.addComment(comment).subscribe();

  }



}
