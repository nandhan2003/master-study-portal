import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { ServiceService } from '../../_service/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
// import { LocalDataSource } from '';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe} from '@angular/common';
import {FormBuilder,Validators,FormGroup,ValidationErrors} from '@angular/forms';
import{AddmaterialService} from '../../_service/addmaterial.service';
import { AdditemsService } from '../../_service/additems.service'
@Component({
  selector: 'app-addmaterial',
  templateUrl: './addmaterial.component.html',
  styleUrls: ['./addmaterial.component.css'],
  providers: [DatePipe]
})
export class AddmaterialComponent implements OnInit {

  addMaterialForm:FormGroup;
  arryOfData = [];
  arryOfSubCategoryData = [];
  modalRef: BsModalRef;
  objSelected: any;

  // bookingForm:FormGroup;
  ItemsForm: FormGroup;
  formUserSearch: FormGroup;
  intGlblUserId: any;
  semesterId:any;
  arryallServiceData=[];

  pager: any = {};
  intTotalCount = 0;
  intPageLimit = 10;
  pageLimit: any[];
  intSkipCount = 0;
  IntsemesterId:any;
  // source: LocalDataSource = new LocalDataSource();
  constructor(
    private formBuilder: FormBuilder,
    private addMaterialS:AddmaterialService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private serviceSrv: ServiceService,
    private modalService: BsModalService,
    private addItmSrvs: AdditemsService,
    private sucategoryUpdate:AddmaterialService,
    private datepipe:DatePipe
  ) { }

  ngOnInit(): void {
    
    this.getAllList()
    this.addMaterialForm = this.formBuilder.group({
      'semester': [''],
     'description':[''],
      'cmbDetailCategoryType':[""],
     
    });

    // let todayDate = new Date()
    // var newDate = this.datepipe.transform(todayDate, 'yyyy-MM-dd');
    // var time = this.datepipe.transform(todayDate, 'hh:mm');
    // this.formUserSearch.patchValue({ date:  newDate });
    // this.formUserSearch.patchValue({ time:  time });

   
    this.IntsemesterId = this.activatedRoute.snapshot.queryParamMap.get('id');
    console.log("IntsemesterId =----",this.IntsemesterId)
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
   });

   if(this.IntsemesterId){
     var obj = {
       id : this.IntsemesterId
     }
     this.setFunctionBookingData(obj);
   }

  }
  get getControl() { return this.formUserSearch.controls;
  }

  async setFunctionBookingData(obj){
    await this.addMaterialS.GetListById(obj).subscribe((res: any) => {
     
      if(res && res.data && res.data.length){
        console.log("GetListById ---",res.data)
        this.addMaterialForm.patchValue({ cmbDetailCategoryType:  res.data[0].fkIntCategoryId });
        // this.formUserSearch.patchValue({ cmbDetailCategoryType: this.datepipe.transform(res.data[0].date, 'yyyy-MM-dd')});
        // if(res.data[0].category){
        //   this.source.load(res.data[0].category);
        //   this.arryOfData = res.data[0].category;
        // }
        this.addMaterialForm.patchValue({ semester:  res.data[0].semester });
        this.addMaterialForm.patchValue({ description:  res.data[0].description });
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


  addMaterial(obj){
    console.log("obj111  ----",obj)
      try {
        if (this.addMaterialForm.invalid) {
    
          console.error("clicked submit->form is not valid");
          Object.keys(this.addMaterialForm.controls).forEach(key => {
    
            const controlErrors: ValidationErrors = this.addMaterialForm.get(key).errors;
            if (controlErrors != null) {
              Object.keys(controlErrors).forEach(keyError => {
                console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
              });
            }
          });
          Swal.fire("warning!", "Validators Required", "warning");
          return;
        }
        let objNo = this.arryOfData.filter(x => x.id === obj.cmbDetailCategoryType);
        var category = {};
        category = objNo[0];
        if(objNo &&  objNo.length ){
          category = objNo[0];
        console.log("ppppppp-",objNo)
        if (this.IntsemesterId) {
          const object = {
           intsemesterId: this.IntsemesterId,
           semester: obj.semester,
           description:obj.description,
           category : category,
          }
          console.log("shd----", object)
          this.addMaterialS.subcategoryUpdate(object).subscribe(res => {
            if (res && res.success === true) {
              Swal.fire({
                title: "Add SubCategory!",
                text: "Updated Successfully",
                icon: "success",
              })
              // this.arryOfSubCategoryData=res.data[0];
              this.router.navigate(['./subcategorylist']);
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
            // semesterId: this.semesterId,
            semester: obj.semester,
            description:obj.description,
            category : category,
          }
        }
        console.log("ttttt----",addData)
        this.addMaterialS.addMaterial(addData).subscribe(res => {
          if (res && res.success === true) {
            Swal.fire({
              title: "Add Category!",
              text: "Updated Successfully",
              icon: "success",
            })
            this.arryOfSubCategoryData = res.data[0];
            this.router.navigate(['./subcategorylist']);
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

      }else{
        // alert("Invalied EMN No")
        Swal.fire({
          title: "Error",
          text: "Invalied category",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      }
  
      catch (error) {
        Swal.fire("Error!", error, "error");
    
      }
  
    }
    onCancel()
    {
      this.router.navigate(['/subcategorylist']);
    }
  }
