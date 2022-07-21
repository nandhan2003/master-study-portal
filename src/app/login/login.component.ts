import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../_service/login.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  password ;
  show = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userSRV:LoginService
) { }

  ngOnInit(): void {
    this.password = 'password';

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  get getControl() { return this.loginForm.controls; }
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  login(value) {
    console.log("jgygd 00-----",value)
    if (value.password) {

      const objUser = {
        email: value.email,
        password: value.password,
        
      };

      this.userSRV.login(objUser).subscribe(res => {
console.log("res ---------------",res)
        if (res.success === true) {
          Swal.fire({
            title: "Login",
            text: "Logined  Successfully",
            icon: "success",
          })

          localStorage.setItem('user_details',  JSON.stringify(res.data));
          this.router.navigate( ['/userlist']);
            if (res.data) {
              localStorage.setItem('token',  JSON.stringify(res.token));
            }
        } else {
          Swal.fire("warning!", res.message, "warning");
        }
      },(error:HttpErrorResponse) => {
       
        console.log(error.error);
      
    });

    }
  }

}
