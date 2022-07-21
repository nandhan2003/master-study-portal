import { Component, OnInit,TemplateRef } from '@angular/core';
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
import {UserService} from '../../_service/user.service';
import {ServiceService} from '../../_service/service.service';


@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.css']
})
export class ServicelistComponent implements OnInit {

 
  arrayOfServiceData =[];
  modalRef: BsModalRef;
  objSelected :any;
  UserForm:FormGroup;
  formServiceSearch:FormGroup;
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
    private serviceSRV:ServiceService
  ) { }

  ngOnInit(): void {
   
    this.UserForm = this.formBuilder.group({
      'txtName': ['', <any>Validators.required],
      'noofproduct': ['', <any>Validators.required],
      'plan': ['', <any>Validators.required],
      'rate': ['', <any>Validators.required],
      'totalsale': ['', <any>Validators.required],
      'txtstatus': ['Active', <any>Validators.required],
    });

    this.formServiceSearch = this.formBuilder.group({
      'serviceName': [""],
      'arabicName': [""],
      'sortNo': [0]
    });

    this.getAllServiceList();
    this.pageLimit = this.pageServiceObj.showPagelist;


  }

  openModal(template: TemplateRef<any>,objData:any) {
    console.log("asnx ---",objData)
    this.objSelected =objData;
    this.modalRef = this.modalService.show(template);
  }

  get getControl() { return this.formServiceSearch.controls; }

  getAllServiceList() {
    let skipCount = this.intSkipCount;

    if (this.pager.intSkipCount) {
      skipCount = this.pager.intSkipCount;
    }
    try {
      var objData = {
        intSkipCount: skipCount,
        intPageLimit: this.intPageLimit,
        serviceName :  this.getControl.serviceName.value,
        arabicName :  this.getControl.arabicName.value,
        sortNo :  this.getControl.sortNo.value,
      }

      this.serviceSRV.get_service_list(objData).subscribe((res: any) => {
        console.log("asdhcsujb ==--",res)
        if (res && res.success === true) {

          this.arrayOfServiceData = res.data[0]
          this.intTotalCount = res.data[1].intTotalCount;
          this.pager = this.pageServiceObj.getPager(
            this.intTotalCount,
            this.pager.currentPage,
            this.intPageLimit
          );
        } else {
          this.arrayOfServiceData = [];
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
    this.getAllServiceList();
  }

  onCreate(){
    this.router.navigate(['/add-service']);
  }

  onUpdate(event):void{
    console.log(event);
    this.router.navigate(['/add-service'],{queryParams:{id:event._id}});
  }

  onDeleteConfirm(obj){
    var objData ={
      intServiceId : obj._id,
      intLoginUserId : this.user[0]._id,
    }

    this.serviceSRV.delete_service(objData).subscribe(res => {
      if (res && res.success === true) {
        Swal.fire({
          title: "Service!",
          text: "Deleted Successfully",
          icon: "success",
        })
        this.getAllServiceList();
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
  }


}


