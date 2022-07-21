import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import  Swal from "sweetalert2";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../_service/login.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  LoginForm: FormGroup;
  arryOfLoginData = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private LoginService: LoginService) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      'username': ['',[Validators.required]],
      'email': ['',[Validators.required, Validators.email]],
      'password': ['',[Validators.required, Validators.minLength(8)]],
    });
  }
  get getControl() { return this.LoginForm.controls; }

  get Email() {
    return this.LoginForm.get('email');
  }
  login(obj) {
    console.log("created user---", obj)
    this.LoginService.login(obj).subscribe(res => {

      console.log("res  successfull---", res)
    })
    try {
      if (this.LoginForm.invalid) {

        console.error("clicked submit->form is not valid");
        let errorStr = "";
        Object.keys(this.LoginForm.controls).forEach(key => {

          const controlErrors: ValidationErrors = this.LoginForm.get(key).errors;
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
          }
        });
        Swal.fire("warning!", "Validators Required", "warning");
        return;
  }
  if (this.getControl.password.value === this.getControl.prePassword.value) {
    var objData = {
      userName: obj.userName,
      email: obj.email,
      password: obj.password,
      prePassword: obj.prePassword
    }
    this.LoginService.login(objData).subscribe(res => {
      console.log("obj ----",obj)
      if (res && res.success === true) {
        Swal.fire({
          title: "Saved!",
          text: "Registered Successfully",
          icon: "success",
        })
        this.arryOfLoginData = res.data[0];
        this.router.navigate(['/userlist']);
      } else {
        Swal.fire("Error!", res.message, "error");
        if (res.message === "Token Error") {
          this.router.navigate(['./admin']);
        }

      }
    }, (error: HttpErrorResponse) => {
      console.log(error.error);
      if (error.message === "jwt expired") {
        this.router.navigate(['./admin']);
      }
    });
  }
  else {
    Swal.fire("warning!", "Password Miss Match", "warning");
  }
}
catch (error) {
  Swal.fire("Error!", error, "error");
}
}
}