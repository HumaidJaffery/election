import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { newSuggestion } from './newSuggestion';

@Component({
  selector: 'app-add-suggestion',
  templateUrl: './add-suggestion.component.html',
  styleUrls: ['./add-suggestion.component.scss']
})
export class AddSuggestionComponent implements OnInit {
  @Output('reloadSuggestion') reloadSuggestion = new EventEmitter<void>();
  @Output('likeNewSuggestion') likeNewSuggestion = new EventEmitter<any>();


  isFormHidden: boolean = true;

  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  submit(data: any){
    this.isFormHidden = true;
    console.log(data.value);
    var newSuggestion: newSuggestion = {
      "text": data.value.text,
      "public": data.value.isPublic == 'public' ? true : false,
      "likes": 0
    }
    this.http.post(`${environment.apiServerUrl}/addSuggestion`, newSuggestion).subscribe((response: any)=>{
      console.log(response);
    })

  }

  like(suggestion: any){
    this.likeNewSuggestion.emit(suggestion);
  }


}
