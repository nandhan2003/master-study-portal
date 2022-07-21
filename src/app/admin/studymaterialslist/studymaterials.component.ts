import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StudymaterialsService} from '../../_service/studymaterials.service';
@Component({
  selector: 'app-studymaterials',
  templateUrl: './studymaterials.component.html',
  styleUrls: ['./studymaterials.component.css']
})
export class StudymaterialsComponent implements OnInit {
  
  formUserSearch: FormGroup;
  studyMaterialForm:FormGroup;
  arryOfItemData =[];
  arryOfData =[];
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
    private studymaterialsSRV: StudymaterialsService,
    private userSRV: StudymaterialsService ,
    private pageServiceObj: PagerService,
    private modalService: BsModalService
    )
    { }

    ngOnInit(): void {
   
      this.studyMaterialForm= this.formBuilder.group({
        'semester': [''],
        'subject':[''],
        
      });
  
      this.formUserSearch = this.formBuilder.group({
        'semester': [''],
        'subject':[''],
      });

      this.UpdateForm = this.formBuilder.group({
        'semester': [''],
        'subject':[''],
      });
  
      this.loadMaterials();
      this.pageLimit = this.pageServiceObj.showPagelist;
    }
    get getControl() { return this.formUserSearch.controls; }
    loadMaterials(){
        console.log("loadItem=----",this.getControl.semester.value,
        this.getControl.subject.value)
        this.arryOfItemData =[];
        let skipCount = this.intSkipCount;
    
        if (this.pager.intSkipCount) {
          skipCount = this.pager.intSkipCount;
        }
        try {
          var objData = {
            intSkipCount: skipCount,
            intPageLimit: this.intPageLimit,
            semester :  this.getControl.semester.value,
            subject :  this.getControl.subject.value
          }
          console.log("objData=----",objData)
          this.studymaterialsSRV.loadMaterials(objData).subscribe((res: any) => {
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
                this.router.navigate( ['./studymaterialslist']);
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
      this.loadMaterials();
    }
  onCreate() {
    this.router.navigate(['/studymaterial']);
  }
  openModal(template: TemplateRef<any>,objData:any) {
    console.log("asnx ---",objData)
    this.objSelected =objData;
    this.modalRef = this.modalService.show(template);
  
    this.UpdateForm.patchValue({cmbDetailStatusType:objData.status})
  
  }
  
  studymaterialUpdate(event){
    console.log("cci --",event)
    this.router.navigate(['/studymaterial'],{queryParams:{id:event._id}});
  }
  
  clearStatus(){
    this.UpdateForm.patchValue({cmbDetailStatusType : ""})
  }
  onUpdate(event):void{
    console.log("onUpdate------",event);
    this.router.navigate(['/studymaterial'],{queryParams:{id:event._id}});
  }
  onDeleteConfirm(obj){
    console.log("onDeleteConfirm --",obj)
    var objData ={
      _id : obj._id,
    }
  
    this.studymaterialsSRV.delete(objData).subscribe(res => {
      if (res && res.success === true) {
        Swal.fire({
          title: "Item!",
          text: "Deleted Successfully",
          icon: "success",
        })
        this.loadMaterials();
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
