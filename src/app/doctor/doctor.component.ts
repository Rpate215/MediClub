import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']

})
export class DoctorComponent implements OnInit  {
  //initialize the call using StudentService 
constructor(private _myService: DoctorService, private router:Router, public route: ActivatedRoute) { }

ngOnInit() {
  this.route.paramMap.subscribe((paramMap: ParamMap ) => {
      if (paramMap.has('_id')){
          this.mode = 'Edit'; /*request had a parameter _id */ 
          this.id = paramMap.get('_id');

           //request student info based on the id
           this._myService.getDoctors(this.id).subscribe(
              data => { 
                  //read data and assign to private variable student
                  this.doctor = data;
                  //populate the firstName and lastName on the page
                  //notice that this is done through the two-way bindings
              
                  this.firstName = this.doctor.firstName;
                  this.lastName = this.doctor.lastName;
                  this.gender = this.doctor.gender;
                  this.specialty = this.doctor.specialty;
                  this.education = this.doctor.education;
                  this.emailid = this.doctor.emailid;
                  this.contactno = this.doctor.contactno;
                  this.bio = this.doctor.bio;
                  this.hospitalname = this.doctor.hospitalname;
                  this.street = this.doctor.street;
                  this.city = this.doctor.city;
                  this.state = this.doctor.state;
                  this.zipcode = this.doctor.zipcode;
                  this.availabletime = this.doctor.availabletime;
                  this.website = this.doctor.website;
              },
              err => console.error(err),
              () => console.log('finished loading')
          );
      } 
      else {
          this.mode = 'Add';
          this.id = null; 
      }
  });
}


 @Input() firstName: string = "";
 @Input() lastName: string = "";
 @Input() gender: string = "";
 @Input() specialty: string = "";
 @Input() education: string = "";
 @Input() emailid: string = "";
 @Input() contactno: string = "";
 @Input() bio: string = "";
 @Input() hospitalname: string = "";
 @Input() street: string = "";
 @Input() city: string = "";
 @Input() state: string = "";
 @Input() zipcode: string = "";
 @Input() availabletime: string = "";
 @Input() website: string = "";

 public mode = 'Add'; //default mode
 private id: any; //student ID
 private doctor: any;
  



 


 /*profileForm = new FormGroup({
  FirstName: new FormControl('', Validators.required),
   LastName: new FormControl('', Validators.required),
   city: new FormControl('', Validators.required),
   State: new FormControl('', Validators.required),
   zipcode: new FormControl('', Validators.required),
       });*/

       onSubmit(){
        console.log("You submitted: " + this.firstName + " " + this.lastName + " " + this.gender + " " +  this.specialty + " " + this.education + " " + this.emailid + " " + this.contactno + " " + this.bio + " " + this.hospitalname + " " + this.street + " " + this.city + " " + this.state + " " + this.zipcode + " " + this.availabletime + " " + this.website);
        if (this.mode == 'Add')
        this._myService.addDoctors(this.firstName ,this.lastName ,this.gender ,this.specialty ,this.education,this.emailid,this.contactno,this.bio,this.hospitalname,this.street,this.city,this.state,this.zipcode,this.availabletime,this.website);
        if (this.mode == 'Edit')
    this._myService.updateDoctors(this.id,this.firstName ,this.lastName ,this.gender ,this.specialty ,this.education,this.emailid,this.contactno,this.bio,this.hospitalname,this.street,this.city,this.state,this.zipcode,this.availabletime,this.website);
        this.router.navigate(['/listDoctors']);
      }

       
}

