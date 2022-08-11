import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { ServiceService } from '../../_service/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  HttpEventType } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { FormBuilder,Validators,FormGroup,ValidationErrors} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NetService }from '../../_service/net.service';
@Component({
  selector: 'app-netmaterials',
  templateUrl: './netmaterials.component.html',
  styleUrls: ['./netmaterials.component.css'],
})
export class NetmaterialsComponent implements OnInit {
  netForm:FormGroup;
  arryOfData=[];
  arryOfItemData =[];
  arrayAllObjData =[];
  arryuploadItemDetails=[];
  arrayFileName=[];
  arryallServiceData=[];
  modalRef: BsModalRef;
  objSelected :any;
  intGlblUserId:any;
  IntServiceId:any;
  intGblId:any;
  fileLogo1:any;
  fileLogo2:any;
  _id:any;
  IntNetId:any;

  blnAllRemove=false;
  blnProfileImage =true;
  intTotalQueeProgress:0;
 

  public img_url: string = environment.img_url;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute:ActivatedRoute,
    private NetSRV:NetService,
    private serviceSRV: ServiceService,
    private modalService: BsModalService,

    ) { }

  ngOnInit(): void {
    // this.getAllList()
    this.netForm = this.formBuilder.group({
      'material': [''],
      'questionPaper': [''],
      'videoLink': [''],
      'logoUrl1': [],
      'logoUrl2': [],
      
    });
 
    // let todayDate = new Date()
    // var newDate = this.datepipe.transform(todayDate, 'yyyy-MM-dd');
    // var time = this.datepipe.transform(todayDate, 'hh:mm');
    // this.formUserSearch.patchValue({ date:  newDate });
    // this.formUserSearch.patchValue({ time:  time });

   
    this.IntNetId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
   });

   if(this.IntNetId){
     var obj = {
       id : this.IntNetId
     }
     this.setFunctionBookingData(obj);
   }

  }
  get getControl() { return this.netForm.controls;
  }

  async setFunctionBookingData(obj){
    await this.NetSRV.GetListById(obj).subscribe((res: any) => {
      console.log("yyyy--",res)
      if(res && res.data && res.data.length){
        this.fileLogo1 = res.data[0].material ;
        this.fileLogo2 = res.data[0].questionPaper ;
        this.netForm.patchValue({ videoLink:  res.data[0].videoLink });
      }else{
        Swal.fire("Error!", res.message, "error");
      }
    })
  }
//   getAllList() {
//     try {
//       var objData = {
//         intSkipCount: 0,
//         intPageLimit: 0,
//       }

//       this.NetSRV.AddMaterials(objData).subscribe((res: any) => {
//         console.log("asdhcsujb ==--",res)
//         if (res && res.success === true) {

//           this.arryOfData = res.data
//           console.log("arryOfData =----",this.arryOfData)
        
//         } else {
//           this.arryOfData = [];
//           if( res.message === "Token Error"){
//             this.router.navigate( ['./admin']);
//           }
//         }
//       },(error:HttpErrorResponse) => {

//         console.log(error);
//         if( error.message === "Token Error"){
//           this.router.navigate( ['./admin']);
//         }
//     });
//     } catch (error) {
//     }
// }

net(obj){
    console.log("values added ----",obj)
    try {
      if (this.netForm.invalid) {
  
        console.error("clicked submit->form is not valid");
        Object.keys(this.netForm.controls).forEach(key => {
  
          const controlErrors: ValidationErrors = this.netForm.get(key).errors;
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
          }
        });
        Swal.fire("warning!", "Validators Required", "warning");
        return;
      }
  
      if (this.IntNetId) {
        const objData = {
          _id: this.IntNetId,
          material: this.fileLogo1,
          questionPaper:this.fileLogo2,
          videoLink:obj.videoLink
        }
        console.log("shd----", objData)
        this.NetSRV.UpdateNet(objData).subscribe(res => {
          if (res && res.success === true) {
            Swal.fire({
              title: "NET Materials!",
              text: "Updated Successfully",
              icon: "success",
            })
            // this.arrayAllObjData=res.data[0];
            this.router.navigate(['/netquestion']);
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
          material: this.fileLogo1,
          questionPaper:this.fileLogo2,
          videoLink:obj.videoLink
        }
      }
  
      this.NetSRV.net(addData).subscribe(res => {
        if (res && res.success === true) {
          Swal.fire({
            title: "NET Materials!",
            text: "Updated Successfully",
            icon: "success",
          })
          this.arrayAllObjData = res.data[0];
          this.router.navigate(['/netquestion']);
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
getMultipleFileInfo1(data) {
  this.fileLogo1="";

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

      this.setUploaded1();

    this.blnProfileImage = false;
}

}

setUploaded1() {

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


      this.fileLogo1 = this.img_url+'/uploads/'+img_body;
        console.log("shafdchs =---",this.fileLogo1)
     

      }
    });
    } else{

    }
  }

}

getMultipleFileInfo2(data) {
  this.fileLogo2="";

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

      this.setUploaded2();

    this.blnProfileImage = false;
}

}

setUploaded2() {

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


      this.fileLogo2 = this.img_url+'/uploads/'+img_body;
        console.log("shafdchs =---",this.fileLogo2)
     

      }
    });
    } else{

    }
  }

}

onCancel()
{
  this.router.navigate(['/netquestion']);
}
}
