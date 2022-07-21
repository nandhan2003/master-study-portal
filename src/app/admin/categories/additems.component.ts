import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { ServiceService } from '../../_service/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
import { DatePipe} from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdditemsService } from '../../_service/additems.service';
@Component({
  selector: 'app-additems',
  templateUrl: './additems.component.html',
  styleUrls: ['./additems.component.css'],
  providers: [DatePipe]
})
export class AdditemsComponent implements OnInit {

  arryallUserData = [];
  arryOfUserDetailsData = [];
  modalRef: BsModalRef;
  objSelected: any;
  ItemsForm: FormGroup;
  formUserSearch: FormGroup;
  intGlblUserId: any;
  ItemId:any;
  arryallServiceData=[];

  pager: any = {};
  intTotalCount = 0;
  intPageLimit = 10;
  pageLimit: any[];
  intSkipCount = 0;

  constructor(
    private formBuilder: FormBuilder,
    private addItmSrvs: AdditemsService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private serviceSrv: ServiceService,
    private modalService: BsModalService,
    private datepipe:DatePipe,
  ) { }
  ngOnInit(): void {

    this.getAllList()
    this.ItemsForm = this.formBuilder.group({
      
      'fieldName': [''],
      'description': ['']
    });

//  let todayDate = new Date()
//     var newDate = this.datepipe.transform(todayDate, 'yyyy-MM-dd');
//     var time = this.datepipe.transform(todayDate, 'hh:mm');
//     this.formUserSearch.patchValue({ date:  newDate });
//     this.formUserSearch.patchValue({ time:  time });

   
    this.ItemId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
   });

   if(this.ItemId){
     var obj = {
       id : this.ItemId
     }
     this.GetListById(obj);
    }
    
  }
  async GetListById(obj){
    await this.addItmSrvs.GetListById(obj).subscribe((res: any) => {
      console.log("res-----",res)
      if(res && res.data && res.data.length){
        this.ItemsForm.patchValue({ fieldName:  res.data[0].fieldName });
        this.ItemsForm.patchValue({ description:  res.data[0].description });
      }else{
        Swal.fire("Error!", res.message, "error");
      }
    })
  }

  get getControl() { return this.formUserSearch.controls;
  }
  getAllList() {
    try {
      var objData = {
        intSkipCount: 0,
        intPageLimit: 0,
      }

      this.addItmSrvs.listItem(objData).subscribe((res: any) => {
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

addItems(obj){
  console.log("skosdy 00----", obj)
  try {
    if (this.ItemsForm.invalid) {

      console.error("clicked submit->form is not valid");
      Object.keys(this.ItemsForm.controls).forEach(key => {

        const controlErrors: ValidationErrors = this.ItemsForm.get(key).errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
      Swal.fire("warning!", "Validators Required", "warning");
      return;
    }

    if (this.ItemId) {
      const objData = {
        _id: this.ItemId,
        fieldName: obj.fieldName,
        description:obj.description

      }
      console.log("UpdateItemUpdateItem----", objData)
      this.addItmSrvs.UpdateItem(objData).subscribe(res => {
        if (res && res.success === true) {
          Swal.fire({
            title: "Item!",
            text: "Updated Successfully",
            icon: "success",
          })
          // this.arryOfUserDetailsData=res.data[0];
          this.router.navigate(['/itemlist']);
        } else {
          Swal.fire("Error!", res.message, "error");
          if (res.message === "Token Error") {
            this.router.navigate(['./admin']);
          }

        }

      }, (error: HttpErrorResponse) => {
        // Swal.fire("warning!", error.message, "warning");
        console.log(error.error);
        if (error.message === "jwt expired") {
          this.router.navigate(['./admin']);
        }
      });
    } else {
      var addData = {
        fieldName: obj.fieldName,
        description:obj.description,
      }
    }
    console.log("UpdateItemUpdateItem----", addData)
    this.addItmSrvs.addItems(addData).subscribe(res => {
      if (res && res.success === true) {
        Swal.fire({
          title: "Add Category!",
          text: "Updated Successfully",
          icon: "success",
        })
        this.arryOfUserDetailsData = res.data[0];
        this.router.navigate(['/itemlist']);
      } else {
        Swal.fire("Error!", res.message, "error");
        if (res.message === "Token Error") {
          this.router.navigate(['./admin']);
        }

      }

    }, (error: HttpErrorResponse) => {
      // Swal.fire("warning!", error.message, "warning");
      console.log(error.error);
      if (error.message === "jwt expired") {
        this.router.navigate(['./admin']);
      }
    });
  }
  catch (error) {
    Swal.fire("Error!", error, "error");
  }
  }
  onCancel()
  {
    this.router.navigate(['/itemlist']);
  }
}