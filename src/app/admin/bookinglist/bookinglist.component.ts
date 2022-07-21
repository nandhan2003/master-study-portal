import { Component, OnInit,TemplateRef } from '@angular/core';
import {BookingService} from '../../_service/booking.service';
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
// import {BookingService} from '../../_service/booking.service';
import {ServiceService} from '../../_service/service.service';



@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.css']
})
export class BookinglistComponent implements OnInit {
  arryallUserData =[];
  arryOfUserDetailsData =[];
  modalRef: BsModalRef;
  objSelected :any;
  UserForm:FormGroup;
  formUserSearch:FormGroup;
  UpdateForm:FormGroup;
  intGlblUserId:any;
 

  pager: any = {};
  intTotalCount = 0;
  intPageLimit = 10;
  pageLimit: any[];
  intSkipCount = 0;

  user = JSON.parse(localStorage.getItem("user_details"));
  constructor(
    private pageServiceObj: PagerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    private bookingService:BookingService
  ) { }

  ngOnInit(): void  {
   
    this.UserForm = this.formBuilder.group({
      'txtName': ['', <any>Validators.required],
      'noofproduct': ['', <any>Validators.required],
      'plan': ['', <any>Validators.required],
      'rate': ['', <any>Validators.required],
      'totalsale': ['', <any>Validators.required],
      'txtstatus': ['Active', <any>Validators.required],
    });

    this.UpdateForm = this.formBuilder.group({
      'cmbDetailStatusType': [""],
    });

    this.formUserSearch = this.formBuilder.group({
      'name': [""],
      'date': [""],
      'cmbDetailStatusType1': [""]
    });

    this.getAllBookingList();
    this.pageLimit = this.pageServiceObj.showPagelist;

  }
  get getControl() { return this.formUserSearch.controls; }

  getAllBookingList() {
    let skipCount = this.intSkipCount;

    if (this.pager.intSkipCount) {
      skipCount = this.pager.intSkipCount;
    }
    try {
      var objData = {
        intSkipCount: skipCount,
        intPageLimit: this.intPageLimit,
        // email :  this.getControl.email.value,
        // mobile :  this.getControl.mobile.value,
        // userName :  this.getControl.name.value,
      }

      this.bookingService.get_booking_list(objData).subscribe((res: any) => {
      console.log("rrrrrrr------",res)
        if (res && res.success === true) {
          this.arryallUserData = res.data[0]
          this.intTotalCount = res.data[1].intTotalCount;
          this.pager = this.pageServiceObj.getPager(
            this.intTotalCount,
            this.pager.currentPage,
            this.intPageLimit
          );
         
        } else {
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
 
  getPageLimit(value$) {
    this.intPageLimit = value$;
    this.setPage(1);
  }

  setPage(page) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pageServiceObj.getPager(
      this.intTotalCount,
      page,
      this.intPageLimit
    );
    this.getAllBookingList();
  }

  onCreate(){
    this.router.navigate(['/add-booking']);
  }

  openModal(template: TemplateRef<any>,objData:any) {
    console.log("asnx ---",objData)
    this.objSelected =objData;
    this.modalRef = this.modalService.show(template);

    this.UpdateForm.patchValue({cmbDetailStatusType:objData.status})

  }

  onStatusChange(obj,objSelected){
    var objData ={
      intBookingId : objSelected._id,
      intLoginUserId : this.user[0]._id,
      bookingStatus : obj.cmbDetailStatusType
    }

    this.bookingService.update_booking_status(objData).subscribe(res => {
      if (res && res.success === true) {
        Swal.fire({
          title: "Booking!",
          text: "Status updated Successfully",
          icon: "success",
        })
        this.getAllBookingList();
        this.clearStatus();
      } else {
        Swal.fire("Error!", res.message, "error");
      }

    },(error:HttpErrorResponse) => {
      Swal.fire("warning!", error.message, "warning");
      console.log(error.error);
      if( error.message === "Token Error"){
        this.router.navigate( ['./admin']);
      }
    });
  }

  clearStatus(){
    this.UpdateForm.patchValue({cmbDetailStatusType : ""})
  }

  onUpdate(event):void{
    console.log(event);
    this.router.navigate(['/add-booking'],{queryParams:{id:event._id}});
  }

  onDeleteConfirm(obj){
    var objData ={
      intBookingId : obj._id,
      intLoginUserId : this.user[0]._id,
    }

    this.bookingService.delete_booking(objData).subscribe(res => {
      if (res && res.success === true) {
        Swal.fire({
          title: "Booking!",
          text: "Deleted Successfully",
          icon: "success",
        })
        this.getAllBookingList();
      } else {
        Swal.fire("Error!", res.message, "error");
      }
    },(error:HttpErrorResponse) => {
      Swal.fire("warning!", error.message, "warning");
      console.log(error.error);
      if( error.message === "Token Error"){
        this.router.navigate( ['./admin']);
      }
    });
  }
  

}

