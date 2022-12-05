import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isList: number;
  isMenu: boolean = false;
  isSearch: boolean = false;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  candyRouting(){
    this.route.navigateByUrl("/candy");
  }

  suggestionRouting() {
    this.route.navigateByUrl("/suggestion");
  }


  

}
