import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddmaterialService } from '../../_service/addmaterial.service';
@Component({
  selector: 'app-subcategorylist',
  templateUrl: './subcategorylist.component.html',
  styleUrls: ['./subcategorylist.component.css']
})
export class SubcategorylistComponent implements OnInit {
  formUserSearch: FormGroup;
  addMaterialForm: FormGroup;
  arryOfItemData = [];
  arryOfUserDetailsData = [];
  modalRef: BsModalRef;
  objSelected: any;
  intGlblUserId: any;

  UpdateForm:FormGroup;
  
  pager: any = {};
  intTotalCount = 0;
  intPageLimit = 10;
  pageLimit: any[];
  intSkipCount = 0;


  user = JSON.parse(localStorage.getItem("user_details"));
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private addmaterialSRV: AddmaterialService,
    private modalService: BsModalService,
    private userSRV: AddmaterialService,
    private pageServiceObj: PagerService,
  ) { }

  ngOnInit(): void {
  console.log("user",)
    this.addMaterialForm = this.formBuilder.group({
      'semester': [''],
      
    });

    this.UpdateForm = this.formBuilder.group({
      'cmbDetailStatusType': [""],
    });

    this.formUserSearch = this.formBuilder.group({
      'semester': [''],
      'description': [''],
    });
    this.loadSubcategory();
    this.pageLimit = this.pageServiceObj.showPagelist;
  }
  get getControl() { return this.formUserSearch.controls; }

loadSubcategory(){
  console.log(" loadSubcategory()=----",this.getControl.semester.value)
  this.arryOfItemData = [];
  let skipCount = this.intSkipCount;

  if (this.pager.intSkipCount) {
    skipCount = this.pager.intSkipCount;
  }
  try {
    var objData = {
      intSkipCount: skipCount,
      intPageLimit: this.intPageLimit,
      semester: this.getControl.semester.value,
      description: this.getControl.description.value
    }
    console.log("objData=----", objData)
    this.addmaterialSRV.loadSubcategory(objData).subscribe((res: any) => {
      console.log("rea=----", res)
      if (res && res.success === true) {

        this.arryOfItemData = res.data[0];
        this.intTotalCount = res.data[1].intTotalCount;
        this.pager = this.pageServiceObj.getPager(
          this.intTotalCount,
          this.pager.currentPage,
          this.intPageLimit
        );
      } else {
        if (res.message === "Token Error") {
          this.router.navigate(['']);
        }
      }
    }, (error: HttpErrorResponse) => {

      console.log(error);
      if (error.message === "Token Error") {
        this.router.navigate(['./admin']);
      }
    });
  } catch (error) {
  }
}
Material(){

}
getPageLimit(value$){
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
  this.loadSubcategory();
}
onCreate(){
  this.router.navigate(['/addmaterial']);
}

openModal(template: TemplateRef<any>,objData:any) {
  console.log("asnx ---",objData)
  this.objSelected =objData;
  this.modalRef = this.modalService.show(template);

  this.UpdateForm.patchValue({cmbDetailStatusType:objData.status})

}

onUpdate(event){
  console.log("cci --",event)
  this.router.navigate(['/addmaterial'],{queryParams:{id:event._id}});
}

clearStatus(){
  this.UpdateForm.patchValue({cmbDetailStatusType : ""})
}

onDeleteConfirm(obj){
  console.log("rrrr --",this.user)
  var objData ={
    _id : obj._id,
    // categoryId : this.user[0]._id,
  }

  this.addmaterialSRV.delete(objData).subscribe(res => {
    if (res && res.success === true) {
      Swal.fire({
        title: "Item!",
        text: "Deleted Successfully",
        icon: "success",
      })
      this.loadSubcategory();
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
