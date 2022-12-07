import { Component, OnInit, Input } from '@angular/core';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-like-btn',
  templateUrl: './like-btn.component.html',
  styleUrls: ['./like-btn.component.scss']
})
export class LikeBtnComponent implements OnInit {
  @Input('suggestion') suggestion;
  hasBeenLiked: boolean = false;

  constructor(private suggestionService: SuggestionService) { }

  ngOnInit(): void {
  }

  like(suggestion){
    this.hasBeenLiked = true;
    this.suggestionService.addLike(suggestion.suggestionId, suggestion.likes).subscribe();
  }

}
