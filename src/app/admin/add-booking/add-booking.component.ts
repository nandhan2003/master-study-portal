import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {BookingService} from '../../_service/booking.service';
import {ServiceService} from '../../_service/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormBuilder,Validators,FormGroup,ValidationErrors} from '@angular/forms';
import { DatePipe} from '@angular/common';
// import { PasswordStrengthValidator } from "./password-strength.validators";

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
  providers: [DatePipe]
})
export class AddBookingComponent implements OnInit {
  arryallUserData =[];
  arryOfUserDetailsData =[];
  modalRef: BsModalRef;
  objSelected :any;
  bookingForm:FormGroup;
  UpdateForm:FormGroup;
  frmTaskSarchData:FormGroup;
  intGlblUserId:any;
  arryallServiceData=[];

  pager: any = {};
  intTotalCount = 0;
  intPageLimit = 10;
  pageLimit: any[];
  intSkipCount = 0;
  IntBookingId:any;

  user = JSON.parse(localStorage.getItem("user_details"));

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private modalService: BsModalService,
    private bookingSrv:BookingService,
    private serviceSrv:ServiceService,
    private datepipe:DatePipe
    
  ) { }

  ngOnInit(): void {

    this.getAllServiceList()
    this.bookingForm = this.formBuilder.group({
      'cmbDetailServiceType': ['',[Validators.required]],
      'date': [''],
      'time': [''],
      'address': [""],
    });

    let todayDate = new Date()
    var newDate = this.datepipe.transform(todayDate, 'yyyy-MM-dd');
    var time = this.datepipe.transform(todayDate, 'hh:mm');
    this.bookingForm.patchValue({ date:  newDate });
    this.bookingForm.patchValue({ time:  time });

    this.IntBookingId = this.activatedRoute.snapshot.queryParamMap.get('id');

    this.activatedRoute.queryParams.subscribe(params => {
       console.log(params);
    });

    if(this.IntBookingId){
      var obj = {
        id : this.IntBookingId
      }
      this.setFunctionBookingData(obj);
    }
  }

  async setFunctionBookingData(obj){
    await this.bookingSrv.get_booking_list_ById(obj).subscribe((res: any) => {
      if(res && res.data && res.data.length){
        this.bookingForm.patchValue({ cmbDetailServiceType:  res.data[0].objService._id });
        this.bookingForm.patchValue({ date: this.datepipe.transform(res.data[0].date, 'yyyy-MM-dd')});
        this.bookingForm.patchValue({ time:  res.data[0].time });
        this.bookingForm.patchValue({ address:  res.data[0].address });
      }else{
        Swal.fire("Error!", res.message, "error");
      }
    })
  }

  get getControl() { return this.bookingForm.controls; }
  get Email() { return this.bookingForm.get('email'); } 

  getAllServiceList() {
    try {
      var objData = {
        intSkipCount: 0,
        intPageLimit: 0,
      }

      this.serviceSrv.get_service_list(objData).subscribe((res: any) => {
        console.log("asdhcsujb ==--",res)
        if (res && res.success === true) {

          this.arryallServiceData = res.data[0]
        
        } else {
          this.arryallServiceData = [];
          if( res.message === "Token Error"){
            this.router.navigate( ['./admin']);
          }
        }
      },(error:HttpErrorResponse) => {

        console.log(error);
        if( error.message === "Token Error"){
          this.router.navigate( ['./admin']);
        }
    });
    } catch (error) {
    }

  }

  createUser(obj){
    console.log("skosdy 00----",obj)
    try {
      if (this.bookingForm.invalid) {

        console.error("clicked submit->form is not valid");
        Object.keys(this.bookingForm.controls).forEach(key => {

          const controlErrors: ValidationErrors = this.bookingForm.get(key).errors;
            if (controlErrors != null) {
              Object.keys(controlErrors).forEach(keyError => {
                console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
              });
            }
          });
          Swal.fire("warning!", "Validators Required" , "warning");
        return;
      }

      if(this.IntBookingId){
        const objData ={
          intBookingId:this.IntBookingId,
          intServiceId : obj.cmbDetailServiceType,
          date :obj.date,
          time  : obj.time,
          address  : obj.address,
          intLoginUserId: this.user[0]._id,

        }
console.log("shd----",objData)
        this.bookingSrv.update_booking(objData).subscribe(res => {
          if (res && res.success === true) {
            Swal.fire({
              title: "Booking!",
              text: "Updated Successfully",
              icon: "success",
            })
              // this.arryOfUserDetailsData=res.data[0];
              this.router.navigate(['/bookinglist']);
          } else {
            Swal.fire("Error!", res.message, "error");
            if( res.message === "Token Error"){
              this.router.navigate( ['./admin']);
            }
           
          }

        },(error:HttpErrorResponse) => {
          // Swal.fire("warning!", error.message, "warning");
          console.log(error.error);
          if( error.message === "jwt expired"){
            this.router.navigate( ['./admin']);
          }
        });
      }else{
        const objData ={
          intServiceId : obj.cmbDetailServiceType,
          date :obj.date,
          time  : obj.time,
          address  : obj.address,
          intLoginUserId: this.user[0]._id,
          
        }

        this.bookingSrv.save_booking(objData).subscribe(res => {
          if (res && res.success === true) {
            Swal.fire({
              title: "Booking!",
              text: "Saved Successfully",
              icon: "success",
            })
              this.arryOfUserDetailsData=res.data[0];
              this.router.navigate(['/bookinglist']);
          } else {
            Swal.fire("Error!", res.message, "error");
            if( res.message === "Token Error"){
              this.router.navigate( ['./admin']);
            }
           
          }

        },(error:HttpErrorResponse) => {
          // Swal.fire("warning!", error.message, "warning");
          console.log(error.error);
          if( error.message === "jwt expired"){
            this.router.navigate( ['./admin']);
          }
        });
      }
       
    

    } catch (error) {
      Swal.fire("Error!", error, "error");

    }

  }

  onDelete(event):void{
    console.log("Delete confirmed for sitetype:"+event);
  
  }


}