import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isList: number;
  isMenu: boolean = false;
  isSearch: boolean = false;


  successMsgHidden: boolean = true;

  constructor(private route: Router) { }

  ngOnInit(): void {

  }

  candyRouting(){
    this.route.navigateByUrl("/candy");
  }

  suggestionRouting() {
    this.route.navigateByUrl("/suggestion/false");
  }


  

}
