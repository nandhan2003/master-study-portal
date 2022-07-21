import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { FormBuilder,Validators,FormGroup,ValidationErrors} from '@angular/forms';
import { NetService }from '../../_service/net.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-netquestion',
  templateUrl: './netquestion.component.html',
  styleUrls: ['./netquestion.component.css']
})
export class NetquestionComponent implements OnInit {
  netForm:FormGroup;
  formUserSearch:FormGroup;
  arryOfItemData =[];
  arrayAllObjData =[];
  modalRef: BsModalRef;
  objSelected :any;
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
    private NetSRV:NetService,
    private userSRV: NetService ,
    private pageServiceObj: PagerService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.netForm = this.formBuilder.group({
      
      'material': [''],
      'questionPaper': [''],
      
  });
  this.formUserSearch=this.formBuilder.group({
    
    'material': [''],
    'questionPaper': [''],
    
  });
  this.UpdateForm=this.formBuilder.group({
    
    'material': [''],
    'questionPaper': [''],
    
  });
  this.AddMaterials()
  this.pageLimit = this.pageServiceObj.showPagelist;
  }
  get getControl() { return this.formUserSearch.controls; }
  AddMaterials(){
    console.log("loadItem=----",this.getControl.material.value,
    this.getControl.questionPaper.value)

    this.arryOfItemData =[];
    let skipCount = this.intSkipCount;

    if (this.pager.intSkipCount) {
      skipCount = this.pager.intSkipCount;
    }
    try {
      var objData = {
        intSkipCount: skipCount,
        intPageLimit: this.intPageLimit,

        material :  this.getControl.material.value,
        questionPaper :  this.getControl.questionPaper.value

      }
      console.log("objData=----",objData)
      
      this.NetSRV.AddMaterials(objData).subscribe((res: any) => {
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
            this.router.navigate( ['./netquestion']);
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
this.AddMaterials()
}
  onCreate(){
    this.router.navigate(['/netmaterials']);
  }
  openModal(template: TemplateRef<any>,objData:any) {
    console.log("asnx ---",objData)
    this.objSelected =objData;
    this.modalRef = this.modalService.show(template);
  
    this.UpdateForm.patchValue({cmbDetailStatusType:objData.status})
  
  }
  
  UpdateNet(event):void{
    console.log("cci --",event)
    this.router.navigate(['/netmaterials'],{queryParams:{id:event._id}});
  }
  onUpdate(event):void{
    console.log(event);
    this.router.navigate(['/netmaterials'],{queryParams:{id:event._id}});
  }

  clearStatus(){
    this.UpdateForm.patchValue({cmbDetailStatusType : ""})
  }
  
  onDeleteConfirm(obj){
    var objData ={
      _id : obj._id
    }
  
    this.NetSRV.delete(objData).subscribe(res => {
      if (res && res.success === true) {
        Swal.fire({
          title: "Item !",
          text: "Deleted Successfully",
          icon: "success",
        })
        this.AddMaterials();
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
