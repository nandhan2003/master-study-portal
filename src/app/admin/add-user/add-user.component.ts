
import { Component, OnInit,TemplateRef } from '@angular/core';
import Swal from "sweetalert2";
import {UserService} from '../../_service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormBuilder,Validators,FormGroup,ValidationErrors} from '@angular/forms';
import { PasswordStrengthValidator } from "./password-strength.validators";
import { DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [DatePipe]
})
export class AddUserComponent implements OnInit {

  arryallUserData =[];
  arryOfUserDetailsData =[];
  modalRef: BsModalRef;
  objSelected :any;
  UserForm:FormGroup;
  UpdateForm:FormGroup;
  frmTaskSarchData:FormGroup;
  intGlblUserId:any;

  pager: any = {};
  intTotalCount = 0;
  intPageLimit = 10;
  pageLimit: any[];
  intSkipCount = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    private userSRV:UserService,
    private datepipe:DatePipe
  ) { }

  ngOnInit(): void {

    this.UserForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required,Validators.minLength(8)]],
      'prePassword': ['', [Validators.required,Validators.minLength(8)]],
      'userName': ["",[Validators.required]],
      'mobile': ["",[Validators.required]],
      'firstName': ["",],
      'lastName': ["",],
    });

    let todayDate = new Date()
    var newDate = this.datepipe.transform(todayDate, 'yyyy-MM-dd');
    this.UserForm.patchValue({ dob:  newDate });

  }

  get getControl() { return this.UserForm.controls; }

  get Email() {
    return this.UserForm.get('email');
  } 

  createUser(obj){
    console.log("skosdy 00----",obj)
    try {
      if (this.UserForm.invalid) {

        console.error("clicked submit->form is not valid");
        let errorStr="";
        Object.keys(this.UserForm.controls).forEach(key => {

          const controlErrors: ValidationErrors = this.UserForm.get(key).errors;
            if (controlErrors != null) {
              Object.keys(controlErrors).forEach(keyError => {
                console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
              });
            }
          });
          Swal.fire("warning!", "Validators Required" , "warning");
        return;
      }

      if( this.getControl.password.value === this.getControl.prePassword.value){
        var objData ={
          email : obj.email,
          userName :obj.userName,
          mobile  : obj.mobile,
          password  : obj.password,
          firstName  : obj.firstName,
          lastName :obj.lastName,
          userType : "ADMIN_USER"
        }

        this.userSRV.register_user(objData).subscribe(res => {
          console.log("res shoe in here =---",res)
          if (res && res.success === true) {
            Swal.fire({
              title: "Saved!",
              text: "Registered Successfully",
              icon: "success",
            })
              this.arryOfUserDetailsData=res.data[0];
              this.router.navigate(['/userlist']);
          } else {
            Swal.fire("Error!", res.message, "error");
            if( res.message === "Token Error"){
              this.router.navigate( ['./admin']);
            }
           
          }
        },(error:HttpErrorResponse) => {
          // Swal.fire("warning!", error.message, "warning");
          console.log(error.error);
          if( error.message === "jwt expired"){
            this.router.navigate( ['./admin']);
          }
        });


      }else{
        Swal.fire("warning!", "Password Miss Match", "warning");
      }

    } catch (error) {
      Swal.fire("Error!", error, "error");

    }

  }

  onCancel(){
    this.router.navigate(['/userlist']);
  }
 
}
