import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdditemsService } from '../../_service/additems.service'
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  formUserSearch: FormGroup;
  ItemsForm:FormGroup;
  arryOfItemData =[];
  arryOfUserDetailsData =[];
  modalRef: BsModalRef;
  objSelected :any;
  intGlblUserId:any;

  pager: any = {};
  intTotalCount = 0;
  intPageLimit = 10;
  pageLimit: any[];
  intSkipCount = 0;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private addItmSrvs: AdditemsService,
    private categorySRV:AdditemsService,
    private pageServiceObj: PagerService,
     ) { }

  ngOnInit(): void {
    console.log("GetItemList------",)
    this.GetItemList()
   
  }

  GetItemList() {
    console.log("GetItemList------",)
    try {
      var objData = {
        intSkipCount: 0,
        intPageLimit:0
      }

      this.categorySRV.listItem(objData).subscribe((res: any) => {
      console.log("rrrrrrr------",res)
        if (res && res.success === true) {
          this.arryOfItemData = res.data[0]
        
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

  onClick(obj){
    console.log("rrrrrrr------",obj)
    this.router.navigate(['/secondpage'],{queryParams:{id:obj._id}});
  }
}
