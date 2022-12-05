import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(private http: HttpClient) { }

  public getSuggestionPage(pageNumber: number): Observable<any> {
    return this.http.get(`${environment.apiServerUrl}/publicSuggestions/${pageNumber}`);
  }

  public addLike(id: number, amountOfLikes: number): Observable<void>{
    return this.http.put<void>(`${environment.apiServerUrl}/likes/${id}/${amountOfLikes}`, null);
  }

  public addComment(comment: any): Observable<any>{
    return this.http.post(`${environment.apiServerUrl}/addComment`, comment);
  }

}
