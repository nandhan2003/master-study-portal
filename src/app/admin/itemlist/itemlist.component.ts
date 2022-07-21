import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdditemsService } from '../../_service/additems.service'
@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  formUserSearch: FormGroup;
  ItemsForm:FormGroup;
  arryOfItemData =[];
  arryOfUserDetailsData =[];
  modalRef: BsModalRef;
  objSelected :any;
  intGlblUserId:any;
  UpdateForm:FormGroup;
  user=[];

  pager: any = {};
  intTotalCount = 0;
  intPageLimit = 10;
  pageLimit: any[];
  intSkipCount = 0;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private addItmSrvs: AdditemsService,
    private userSRV:AdditemsService,
    private pageServiceObj: PagerService,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.formUserSearch = this.formBuilder.group({
      'fieldName':[''],
      'description':['']
    });
    this.UpdateForm = this.formBuilder.group({
      'fieldName':[''],
      'description':['']
    });

    this.loadItem();
    this.pageLimit = this.pageServiceObj.showPagelist;
  }
  get getControl() { return this.formUserSearch.controls; }

  loadItem() {

    this.arryOfItemData =[];
    let skipCount = this.intSkipCount;
  
    if (this.pager.intSkipCount) {
      skipCount = this.pager.intSkipCount;
    }
    try {
      console.log("loadItem=----")
      var objData = {
        intSkipCount: skipCount,
        intPageLimit: this.intPageLimit,
        fieldName :  this.getControl.fieldName.value,
        // description :  this.getControl.description.value,
      }
      console.log("rea=----",objData)
      this.addItmSrvs.listItem(objData).subscribe((res: any) => {
        console.log("rea=----",res)
        if (res && res.success === true) {

          this.arryOfItemData = res.data[0];
          this.intTotalCount = res.data[1].intTotalCount;
          this.pager = this.pageServiceObj.getPager(
            this.intTotalCount,
            this.pager.currentPage,
            this.intPageLimit
          );
        } else {
          if( res.message === "Token Error"){
            this.router.navigate( ['./additems']);
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
  // Item(){
    
  // }

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
    this.loadItem();
  }
  onCreate(){
    this.router.navigate(['/additems']);
  }
  openModal(template: TemplateRef<any>,objData:any) {
    console.log("asnx ---",objData)
    this.objSelected =objData;
    this.modalRef = this.modalService.show(template);
  
    // this.UpdateForm.patchValue({cmbDetailStatusType:objData.status})
  
  }
  
  UpdateItem(event){
    console.log("cci --",event)
    this.router.navigate(['/additems'],{queryParams:{id:event._id}});
  }
  
  clearStatus(){
    this.UpdateForm.patchValue({cmbDetailStatusType : ""})
  }
  
  onUpdate(event):void{
    console.log(event);
    this.router.navigate(['/additems'],{queryParams:{id:event._id}});
  }
  onDeleteConfirm(obj){
    console.log()
    var objData ={
      _id : obj._id
    }
  
    this.userSRV.delete(objData).subscribe(res => {
      if (res && res.success === true) {
        Swal.fire({
          title: "Item!",
          text: "Deleted Successfully",
          icon: "success",
        })
        this.loadItem();
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
