import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { FormBuilder,Validators,FormGroup,ValidationErrors} from '@angular/forms';
import { AddquestionService}from '../../_service/addquestion.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-questionlist',
  templateUrl: './questionlist.component.html',
  styleUrls: ['./questionlist.component.css']
})
export class QuestionlistComponent implements OnInit {
  addquestionForm:FormGroup;
  formUserSearch:FormGroup;
  arryOfItemData =[];
  arrayAllObjData =[];
  modalRef: BsModalRef;
  objSelected :any;
  arryOfData=[]
  UpdateForm:FormGroup;
  user=[];

  pager: any = {};
  intTotalCount = 0;
  intPageLimit = 10;
  pageLimit: any[];
  intSkipCount = 0;

  constructor(
    private formBuilder: FormBuilder,
    private AddquestionSRV:AddquestionService,
    private router: Router,
    private userSRV: AddquestionService ,
    private pageServiceObj: PagerService,
    private modalService: BsModalService
    ) { }

  ngOnInit():void {
    this.addquestionForm = this.formBuilder.group({
      
      'subject': [''],
      'year_1': [''],
      'year_2': [''],
      'year_3': [''],
      
  });
  this.formUserSearch=this.formBuilder.group({
    
    'subject': [''],
    'semester': [''],
    
  });
  this.UpdateForm=this.formBuilder.group({
    
    'subject': [''],
    'semester': [''],
    
  });

  this.QuestionUpload()
  this.pageLimit = this.pageServiceObj.showPagelist;
  }
  get getControl() { return this.formUserSearch.controls; }
  QuestionUpload(){
    // console.log("loadItem=----",this.getControl.subject.value,
    // this.getControl.year.value)
    this.arryOfItemData =[];
    let skipCount = this.intSkipCount;

    if (this.pager.intSkipCount) {
      skipCount = this.pager.intSkipCount;
    }
    try {
      var objData = {
        intSkipCount: skipCount,
        intPageLimit: this.intPageLimit,
        subject :  this.getControl.subject.value,
        semester:  this.getControl.semester.value,
        
      }
      console.log("objData=----",objData)
      this.AddquestionSRV.QuestionUpload(objData).subscribe((res: any) => {
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
            this.router.navigate( ['./questionlist']);
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
  this. QuestionUpload();
}
  onCreate(){
    this.router.navigate(['/addquestion']);
  }
  openModal(template: TemplateRef<any>,objData:any) {
    console.log("asnx ---",objData)
    this.objSelected =objData;
    this.modalRef = this.modalService.show(template);
  
    this.UpdateForm.patchValue({cmbDetailStatusType:objData.status})
  
  }
  
  updateQuestion(event){
    console.log("cci --",event)
    this.router.navigate(['/addquestion'],{queryParams:{id:event._id}});
  }
  
  clearStatus(){
    this.UpdateForm.patchValue({cmbDetailStatusType : ""})
  }
  onUpdate(event):void{
    console.log(event);
    this.router.navigate(['/addquestion'],{queryParams:{id:event._id}});
  }

  onDeleteConfirm(obj){
    console.log("onDeleteConfirm --",obj)
    var objData ={
      _id : obj._id,
    }
  
    this.userSRV.delete(objData).subscribe(res => {
      if (res && res.success === true) {
        Swal.fire({
          title: "Item!",
          text: "Deleted Successfully",
          icon: "success",
        })
        this.QuestionUpload();
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
