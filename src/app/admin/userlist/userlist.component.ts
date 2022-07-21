import { Component, OnInit,TemplateRef } from '@angular/core';
// import Swal from "sweetalert2";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
import {UserService} from '../../_service/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  arryallUserData =[];
  arryOfUserDetailsData =[];
  modalRef: BsModalRef;
  objSelected :any;
  UserForm:FormGroup;
  formUserSearch:FormGroup;
  intGlblUserId:any;


  pager: any = {};
  intTotalCount = 0;
  intPageLimit = 10;
  pageLimit: any[];
  intSkipCount = 0;

  constructor(
    private pageServiceObj: PagerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    private userSRV:UserService
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

    this.formUserSearch = this.formBuilder.group({
      'name': [""],
      'email': [""],
      'mobile': [""]
    });

    this.getuserList();
    this.pageLimit = this.pageServiceObj.showPagelist;


  }

  get getControl() { return this.formUserSearch.controls; }

  getuserList() {
    let skipCount = this.intSkipCount;

    if (this.pager.intSkipCount) {
      skipCount = this.pager.intSkipCount;
    }
    try {
      var objData = {
        intSkipCount: skipCount,
        intPageLimit: this.intPageLimit,
        email :  this.getControl.email.value,
        mobile :  this.getControl.mobile.value,
        userName :  this.getControl.name.value,
      }
      console.log("objData=----",objData)
      this.userSRV.get_user_list(objData).subscribe((res: any) => {
        console.log("rea=----",res)
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
    this.getuserList();
  }

  onCreate(){
    this.router.navigate(['/add-user']);
  }



}
