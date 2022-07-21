import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { ServiceService } from '../../_service/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  HttpEventType } from '@angular/common/http';
import { DatePipe} from '@angular/common';
import {environment} from '../../../environments/environment';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddquestionService}from '../../_service/addquestion.service';
@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css'],
  providers: [DatePipe]
})
export class AddquestionComponent implements OnInit {
  addquestionForm:FormGroup;
  formUserSearch:FormGroup;
  ServiceForm:FormGroup;
  arryOfData =[];
  arryOfItemData =[];
  arryuploadItemDetails=[];
  arrayFileName=[];
  arryOfUserDetailsData =[];
  arryallServiceData=[];
  modalRef: BsModalRef;
  objSelected :any;
  IntquestionId:any;
  IntServiceId:any;
  intGblId:any;
  fileLogo:any;

  _id:any;
  
  blnAllRemove=false;
  blnProfileImage =true;
  intTotalQueeProgress:0;
  pager: any = {};
  intTotalCount = 0;
  intPageLimit = 10;
  pageLimit: any[];
  intSkipCount = 0;


  public img_url: string = environment.img_url;
  constructor(
    private formBuilder: FormBuilder,
    private AddquestionSRV:AddquestionService,
    private router: Router,
    private serviceSRV: ServiceService,
    private activatedRoute:ActivatedRoute,
    private modalService: BsModalService,
    private datepipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.getAllList()
    this.addquestionForm = this.formBuilder.group({
      
      'subject': [''],
      'year1': [''],
      'pdf1': [''],
      'year2': [''],
      'pdf2': [''],
      'year3': [''],
      'pdf3': [''],
      'logoUrl1': [''],
      'logoUrl2': [''],
      'logoUrl3': [''],
      'cmbDetailSubCategoryType':['']

  });  
// let todayDate = new Date()
// var newDate = this.datepipe.transform(todayDate, 'yyyy-MM-dd');
// var time = this.datepipe.transform(todayDate, 'hh:mm');
// this.formUserSearch.patchValue({ date:  newDate });
// this.formUserSearch.patchValue({ time:  time });


this.IntquestionId = this.activatedRoute.snapshot.queryParamMap.get('id');
this.activatedRoute.queryParams.subscribe(params => {
  console.log(params);
});

if(this.IntquestionId){
 var obj = {
   id : this.IntquestionId
 }
 this.setFunctionBookingData(obj);
}

}
get getControl() { return this.formUserSearch.controls;
}

async setFunctionBookingData(obj){
await this.AddquestionSRV.GetListById(obj).subscribe((res: any) => {
  if(res && res.data && res.data.length){
    this.addquestionForm.patchValue({ subject:  res.data[0].subject });
    this.addquestionForm.patchValue({ semester:  res.data[0].semester });
  }else{
    Swal.fire("Error!", res.message, "error");
  }
})
}
  getAllList() {
    try {
      var objData = {
        intSkipCount: 0,
        intPageLimit: 0,
      }

      this.AddquestionSRV.QuestionUpload(objData).subscribe((res: any) => {
        console.log("asdhcsujb ==--",res)
        if (res && res.success === true) {

          this.arryOfData = res.data[0]
          console.log("arryOfData =----",this.arryOfData)
        
        } else {
          this.arryOfData = [];
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
  addquestion(obj){
    console.log("values added ----",obj)
    try {
      if (this.addquestionForm.invalid) {
  
        console.error("clicked submit->form is not valid");
        Object.keys(this.addquestionForm.controls).forEach(key => {
  
          const controlErrors: ValidationErrors = this.addquestionForm.get(key).errors;
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
          }
        });
        Swal.fire("warning!", "Validators Required", "warning");
        return;
      }
  
      if (this._id) {
        const obj = {
          _id: this._id
        }
        console.log("shd----", obj)
        this.AddquestionSRV.addquestion(obj).subscribe(res => {
          if (res && res.success === true) {
            Swal.fire({
              title: "Add Category!",
              text: "Updated Successfully",
              icon: "success",
            })
            // this.arryOfUserDetailsData=res.data[0];
            this.router.navigate(['/questionlist']);
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
        const objData = {
          _id: obj._id,
          subject: obj.subject,
          year_1:obj.year_1,
          pdf1:obj.pdf1,
          year_2:obj.year_2,
          pdf2:obj.pdf2,
          year_3:obj.year_3,
          pdf3:obj.pdf3,
        }
      }
  
      this.AddquestionSRV.addquestion(obj).subscribe(res => {
        if (res && res.success === true) {
          Swal.fire({
            title: "Add Category!",
            text: "Updated Successfully",
            icon: "success",
          })
          this.arryOfUserDetailsData = res.data[0];
          this.router.navigate(['/questionlist']);
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
getMultipleFileInfo(data) {
  this.fileLogo="";

  try {
  this.arryuploadItemDetails=[]
  for (let i = 0; i < data.target.files.length; i++ ) {

    this.arrayFileName.push(data.target.files[i].name)


      const intSize = (data.target.files[i].size / 1024) / 1024;
      const uploadFile = {
        strFileName : data.target.files[i].name,
        intFileSize : parseFloat(intSize.toFixed(2)),
        intProgress : 0,
        isSuccess: true,
        isCancel: true,
        isError: true,
        isReady: false,
        isUploading: false,
        isbtnCancel: true,
        isbtnRemove: true,
        intSizeValue: data.target.files[i].size,
        strType: data.target.files[i].type,
        files: data.target.files,
        intDocumentId: this.intGblId
      };

      this.arryuploadItemDetails.push(uploadFile);
      this.blnProfileImage = true;
}

}
catch(e){
  console.log(e);
}
finally {
  this.intTotalQueeProgress = 0;
    this.blnAllRemove = false;

      this.setUploaded();

    this.blnProfileImage = false;
}

}

setUploaded() {

  this.intTotalQueeProgress = 0;
  this.blnAllRemove = false;
  for (let i = 0; i < this.arryuploadItemDetails.length; i++ ) {


    if (this.arryuploadItemDetails[i].isSuccess === true ) {
      this.arryuploadItemDetails[i].isReady = true;
      this.arryuploadItemDetails[i].isbtnCancel = false;
      const file = this.arryuploadItemDetails[i].files[i];

      const objUpload = {
      file: file,
      };

      this.serviceSRV.uploadFiles(objUpload).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.arryuploadItemDetails[i].intProgress = Math.round(event.loaded / event.total * 100);

      } else if (event.type === HttpEventType.Response ) {
        this.arryuploadItemDetails[i].isSuccess = false;
        this.arryuploadItemDetails[i].isbtnCancel = true;
        this.arryuploadItemDetails[i].isbtnRemove = false;

    }
    if(event.body && event.body.success === true){

      var img_body = event.body.data.fileName


      this.fileLogo = this.img_url+'/uploads/'+img_body;
        console.log("shafdchs =---",this.fileLogo)
     

      }
    });
    } else{

    }
  }

}
onCancel()
{
  this.router.navigate(['/questionlist']);
}

}
