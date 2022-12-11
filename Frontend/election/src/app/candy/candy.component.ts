import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Candy } from '../Candy';


@Component({
  selector: 'app-candy',
  templateUrl: './candy.component.html',
  styleUrls: ['./candy.component.scss']
})
export class CandyComponent implements OnInit, AfterViewInit {
  @ViewChild('contact') contact: any;
  @ViewChild('errormsg') errorMsg: any;
  @ViewChild('candymsg') candyMsg: any;
  @ViewChild('candysubmsg') candySubMsg: any;
  @ViewChild('first') firstNumber: any;
  @ViewChild('second') secondNumber: any;
  @ViewChild('third') thirdNumber: any;
  @ViewChild('fourth') fourthNumber: any;

  lockerNumberInputs: any[] = []
  isFormValid: boolean = true;
  lockerNumber: number;



  typeOfCandies: any = [
    ["blueberry", "../../assets/images/blueberry.png"],
    ["cherry", "../../assets/images/cherry.png"],
    ["grape", "../../assets/images/grape.png"],
    ["orange", "../../assets/images/orange.png"],
    ["watermelon", "../../assets/images/watermelon.png"],
  ]

  isPartOneHidden: boolean = false;
  isPartTwoHidden: boolean = true;
  numberOfCandies: number;
  moreCandyToClaim: boolean;

  constructor(private http: HttpClient, private route: Router, private actRoute: ActivatedRoute, private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.actRoute.queryParams
  }



  ngAfterViewInit(): void {
    this.lockerNumberInputs = [this.firstNumber.nativeElement, this.secondNumber.nativeElement, this.thirdNumber.nativeElement, this.fourthNumber.nativeElement];
  }

  keyup(data: any) {
    if(data.key.length == 1 && data.path[0].value.length > 0){ //make sure it isnt backspace or letter
      if(data.path[0].name == '3') { //if it is the last input
        this.contact.nativeElement.focus();
        this.lockerNumberInputs[parseInt(data.path[0].name)].disabled = true; //disable last input
        this.isFormValid = false;
      } else {
        var nextNumber = this.lockerNumberInputs[parseInt(data.path[0].name) + 1];

        this.lockerNumberInputs[parseInt(data.path[0].name)].disabled = true; // disables previous input
        nextNumber.focus();
      }
      


    } else if (data.key == 'Backspace' && data.path[0].name != '0') { //Check if Backspace and not first input
      var previousNumber = this.lockerNumberInputs[parseInt(data.path[0].name) - 1];

      this.lockerNumberInputs[parseInt(data.path[0].name) - 1].disabled = false; //undisables previous input
      previousNumber.focus(); //focuses previous input
    }
  }

  reset() {
    this.lockerNumberInputs.forEach(input => {
      input.value = '';
      input.disabled = false;
    });
    this.lockerNumberInputs[0].focus();
    this.isFormValid = true;
  }

  
  checkCandyAvailability(first, second, third, fourth, contact, name) {
    var lockerNumber: string = "";
    var hasContactInfo: boolean;

    lockerNumber = first.value.toString() + second.value.toString() + third.value.toString() + fourth.value.toString()
    this.lockerNumber = parseInt(lockerNumber);
    console.log(lockerNumber)

    //checking if locker is only 4 numbers long
    if(lockerNumber.length != 4){
      this.errorMsg.nativeElement.innerHTML = "The locker Number must be four letters long!"
      this.errorMsg.nativeElement.hidden = false;
      this.reset();
      return;
    } 

    //checking grade and name
    if(name.value == '' || name.value == null) {
      this.errorMsg.nativeElement.innerHTML = "Please Provide a name, We cant give you the candy without a name"
      this.errorMsg.nativeElement.hidden = false;
      return;
    }

    //validating and getting contact info
    var regx: RegExp = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$")
    if(contact.value == ''){
      hasContactInfo = false;
    } else if (!regx.test(contact.value)) {
      this.errorMsg.nativeElement.innerHTML = "Please enter a valid email adress or phone number or keep the field blank (no dashes for phone number)";
      this.errorMsg.nativeElement.hidden = false;
      return;
    } else {
      hasContactInfo = true
    }
    
    //GET request to /candyAvailability
    this.http.get(`${environment.apiServerUrl}/candyAvailability?locker=${this.lockerNumber}&hasContactInfo=${hasContactInfo}`,).subscribe(
    (response: any) => {
        if(response.numberOfCandies == 0){
          console.log("here")
          this.candyMsg.nativeElement.hidden = false;
          this.candySubMsg.nativeElement.hidden = false;
          if(response.moreCandyToClaim){
            this.candyMsg.nativeElement.innerHTML = "You have already claimed your first free candy";
            this.candySubMsg.nativeElement.innerHTML = "If you want to claim your second, you have to fill out your contact info";
          }
          this.candyMsg.nativeElement.innerHTML = "You have already claimed both your free candies";
          this.candySubMsg.nativeElement.innerHTML = "Thank You";
          return;
        }

        this.isPartOneHidden = true;
        this.isPartTwoHidden = false;
        this.numberOfCandies = response.numberOfCandies;
        this.moreCandyToClaim = response.moreCandyToClaim;
    }, (error: HttpErrorResponse)=> {
          this.candyMsg.nativeElement.innerHTML ="Something went wrong";
          this.candySubMsg.nativeElement.innerHTML = "Please try again";
          this.candyMsg.nativeElement.hidden = false;
          this.candySubMsg.nativeElement.hidden = false;
    })
  }



  submit(data: any){
    console.log(data)
    console.log(data.value)
      var newCandy: Candy = {
        "locker": this.lockerNumber,
        "contactInfo": data.value.contact == undefined ? null : data.value.contact,
        "firstCandyType": data.value.firstCandy,
        "secondCandyType": data.value.secondCandy == undefined ? null : data.value.secondCandy,
        "name": data.value.name,
        "grade": data.value.grade == '' ? 'eight' : data.value.grade
      }

      this.http.post(`${environment.apiServerUrl}/addCandy`, newCandy).subscribe((response: any)=>{
        this.route.navigateByUrl("/suggestion/true");
      })
    }


}
