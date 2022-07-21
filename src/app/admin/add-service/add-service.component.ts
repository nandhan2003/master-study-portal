import { Component, OnInit,TemplateRef } from '@angular/core';
import Swal from "sweetalert2";
import {ServiceService} from '../../_service/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormBuilder,Validators,FormGroup,ValidationErrors} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {  HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  arryallUserData =[];
  arryOfServiceDetailsData =[];
  modalRef: BsModalRef;
  objSelected :any;
  ServiceForm:FormGroup;
  UpdateForm:FormGroup;
  frmTaskSarchData:FormGroup;
  intGlblUserId:any;
  IntServiceId:any;

  pager: any = {};
  intTotalCount = 0;
  intPageLimit = 10;
  pageLimit: any[];
  intSkipCount = 0;

  intFileName=[];
  fileLogo:any;
  intTotalQueeProgress:0;
  intGblId:any;
  blnProfileImage =true;
  blnAllRemove=false;
  arryuploadItemDetails=[];
  strProfileUrl:any;
  arrayFileName=[];

  user = JSON.parse(localStorage.getItem("user_details"));

  public img_url: string = environment.img_url;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    private serviceSRV:ServiceService,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.ServiceForm = this.formBuilder.group({
      'serviceName': ['', [Validators.required]],
      'arabicName': [''],
      'sortNo': [1,[Validators.required]],
      'logoUrl': [],
      'iconName': [''],
    });

    this.IntServiceId = this.activatedRoute.snapshot.queryParamMap.get('id');

    this.activatedRoute.queryParams.subscribe(params => {
       console.log(params);
    });

    if(this.IntServiceId){
      console.log("shauda==",this.IntServiceId)
      var obj = {
        id : this.IntServiceId
      }
      this.setFunctionServiceData(obj);
    }

  }

  async setFunctionServiceData(objData){
    await this.serviceSRV.get_service_list_ById(objData).subscribe((res: any) => {
      if(res && res.data && res.data.length){
        this.ServiceForm.patchValue({ serviceName:  res.data[0].serviceName });
        this.ServiceForm.patchValue({ arabicName:  res.data[0].arabicName });
        this.ServiceForm.patchValue({ sortNo:  res.data[0].sortNo });
        this.ServiceForm.patchValue({ iconName:  res.data[0].iconName });
        this.fileLogo = res.data[0].logoUrl
      }else{
        Swal.fire("Error!", res.message, "error");
      }
    })
  }

  get getControl() { return this.ServiceForm.controls; }

  createUser(obj){
    try {
      if (this.ServiceForm.invalid) {

        console.error("clicked submit->form is not valid");
        let errorStr="";
        Object.keys(this.ServiceForm.controls).forEach(key => {

          const controlErrors: ValidationErrors = this.ServiceForm.get(key).errors;
            if (controlErrors != null) {
              Object.keys(controlErrors).forEach(keyError => {
                console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
              });
            }
          });
          Swal.fire("warning!", "Validators Required" , "warning");
        return;
      }

      if(this.IntServiceId){
        const objData ={
          IntServiceId :this.IntServiceId,
          serviceName : obj.serviceName,
          arabicName :obj.arabicName,
          logoUrl  : this.fileLogo,
          sortNo  : parseInt(obj.sortNo) ,
          iconName  : obj.iconName,
          intLoginUserId: this.user[0]._id
        }
        console.log("objData 00----",objData)
        this.serviceSRV.update_service(objData).subscribe(res => {
          console.log("res shoe in here =---",res) 
          if (res && res.success === true) {
            Swal.fire({
              title: "Service!",
              text: "Updated Successfully",
              icon: "success",
            })
              // this.arryOfServiceDetailsData=res.data[0];
              this.router.navigate(['/servicelist']);
          } else {
            Swal.fire("Error!", res.message, "error");
            // if( res.message === "Token Error"){
            //   this.router.navigate( ['./admin']);
            // }
            
          }
  
        },(error:HttpErrorResponse) => {
          // Swal.fire("warning!", error.message, "warning");
          console.log(error.error);
          if( error.message === "Token Error"){
            this.router.navigate( ['./admin']);
          }
        });
      }else{
        const objData ={
          serviceName : obj.serviceName,
          arabicName :obj.arabicName,
          logoUrl  : this.fileLogo,
          sortNo  : parseInt(obj.sortNo) ,
          iconName  : obj.iconName,
          intLoginUserId: this.user[0]._id
        }
        console.log("objData 00----",objData)
        this.serviceSRV.save_service(objData).subscribe(res => {
          console.log("res shoe in here =---",res) 
          if (res && res.success === true) {
            Swal.fire({
              title: "Service!",
              text: "Saved Successfully",
              icon: "success",
            })
              this.arryOfServiceDetailsData=res.data[0];
              this.router.navigate(['/servicelist']);
          } else {
            Swal.fire("Error!", res.message, "error");
            // if( res.message === "Token Error"){
            //   this.router.navigate( ['./admin']);
            // }
            
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


}
