import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { ServiceService } from '../../_service/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  HttpEventType } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
// import { DatePipe} from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StudymaterialsService} from '../../_service/studymaterials.service';
import { AdditemsService } from '../../_service/additems.service'

@Component({
  selector: 'app-listmaterial',
  templateUrl: './listmaterial.component.html',
  styleUrls: ['./listmaterial.component.css'],
  // providers: [DatePipe]
})
export class ListmaterialComponent implements OnInit {
  studyMaterialForm: FormGroup;
  arryOfData = [];
  arryOfUserDetailsData = [];
  modalRef: BsModalRef;
  objSelected: any;
  formUserSearch: FormGroup;
  intGlblUserId: any;
  IntmaterialId:any;
  arrayFileName=[];
  arryallServiceData=[];
  arryuploadItemDetails=[];
  intGblId:any;
  fileLogo:any;


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
    private router: Router,
    private formBuilder: FormBuilder,
    private studymaterialsSRV:StudymaterialsService,
    private serviceSrv: ServiceService,
    private modalService: BsModalService,
    private activatedRoute:ActivatedRoute,
    // private datepipe:DatePipe,
    private addItmSrvs: AdditemsService,
  ) { }

  ngOnInit(): void {
   
    this.studyMaterialForm = this.formBuilder.group({
      'subject': [''],
      'semester':[''],
      'logoUrl': [],
      'material': [''],
      'description': [''],
      'cmbDetailSubCategoryType':['']
    });

    // let todayDate = new Date()
    // var newDate = this.datepipe.transform(todayDate, 'yyyy-MM-dd');
    // var time = this.datepipe.transform(todayDate, 'hh:mm');
    // this.formUserSearch.patchValue({ date:  newDate });
    // this.formUserSearch.patchValue({ time:  time });

   
    this.IntmaterialId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.getAllList()
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
   });

   if(this.IntmaterialId){
     var obj = {
       id : this.IntmaterialId
     }
     this.setFunctionBookingData(obj);
    }
    
  }
  get getControl() { return this.studyMaterialForm.controls;
   
  }


  async setFunctionBookingData(obj){
    await this.studymaterialsSRV.GetListById(obj).subscribe((res: any) => {
      if(res && res.data && res.data.length){
        this.studyMaterialForm.patchValue({ cmbDetailSubCategoryType:  res.data[0].fkIntCategoryId });
        this.studyMaterialForm.patchValue({ description:  res.data[0].description });
        this.fileLogo =  res.data[0].logoUrl;
        // this.studyMaterialForm.patchValue({ date: this.datepipe.transform(res.data[0].date, 'yyyy-MM-dd')});
        this.studyMaterialForm.patchValue({ semester:  res.data[0].semester });
        this.studyMaterialForm.patchValue({ subject:  res.data[0].subject });
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

      this.addItmSrvs.listItem(objData).subscribe((res: any) => {
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

  studymaterials(obj){
    console.log("#########----",obj)
      try {
        if (this.studyMaterialForm.invalid) {
    
          console.error("clicked submit->form is not valid");
          Object.keys(this.studyMaterialForm.controls).forEach(key => {
    
            const controlErrors: ValidationErrors = this.studyMaterialForm.get(key).errors;
            if (controlErrors != null) {
              Object.keys(controlErrors).forEach(keyError => {
                console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
              });
            }
          });
          Swal.fire("warning!", "Validators Required", "warning");
          return;
        }
        var category ={};
         category =this.arryOfData.filter(x => x.id === obj.cmbDetailSubCategoryType)[0];
   
        if (this.IntmaterialId) {
          const objData = {
            _id: this.IntmaterialId,
            category : category,
            subject: obj.subject,
            semester:obj.semester,
            description:obj.description,
            logoUrl:this.fileLogo
          }
          console.log("shd----", objData)
          this.studymaterialsSRV.studymaterialUpdate(objData).subscribe(res => {
            if (res && res.success === true) {
              Swal.fire({
                title: "Study Material!",
                text: "Updated Successfully",
                icon: "success",
              })
              // this.arryOfUserDetailsData=res.data[0];
              this.router.navigate(['/studymaterialslist']);
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
            category : category,
            subject: obj.subject,
            semester:obj.semester,
            description:obj.description,
            logoUrl:this.fileLogo
          }
        }
         console.log("rrr----",addData)
        this.studymaterialsSRV.studymaterials(addData).subscribe(res => {
          if (res && res.success === true) {
            Swal.fire({
              title: "Study Material!",
              text: "Updated Successfully",
              icon: "success",
            })
            this.arryOfUserDetailsData = res.data[0];
            this.router.navigate(['/studymaterialslist']);
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
    
          this.serviceSrv.uploadFiles(objUpload).subscribe((event) => {
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
      this.router.navigate(['/studymaterialslist']);
    }   
  }
  