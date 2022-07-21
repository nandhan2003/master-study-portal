import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { RegisterService } from '../_service/register.service';

@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.css']
})

export class AdminregisterComponent implements OnInit {
  RegisterForm: FormGroup;
  arryOfRegisterData = [];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private RegisterService: RegisterService,
  ) { }

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      'username': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'prePassword': ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get getControl() { return this.RegisterForm.controls; }

  get Email() {
    return this.RegisterForm.get('email');
  }
  createUser(obj) {
    console.log("registered successfully---", obj)
    try {
      if (this.RegisterForm.invalid) {

        console.error("clicked submit->form is not valid");
        let errorStr = "";
        Object.keys(this.RegisterForm.controls).forEach(key => {

          const controlErrors: ValidationErrors = this.RegisterForm.get(key).errors;
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

        this.RegisterService.createUser(objData).subscribe(res => {
          console.log("obj ----",obj)
          if (res && res.success === true) {
            Swal.fire({
              title: "Saved!",
              text: "Registered Successfully",
              icon: "success",
            })
            this.arryOfRegisterData = res.data[0];
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
