import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { first } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { DatePipe} from '@angular/common';
import { UserService } from '../../app/_service/user.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers: [DatePipe]
})
export class ContactUsComponent implements OnInit {

  ContactForm: FormGroup;
  constructor(
  private formBuilder: FormBuilder,
  private sendDocumentEmail: UserService,) { }

  ngOnInit(): void {
    this.ContactForm = this.formBuilder.group({
    'name': [''],
    'mobile': [''],
    'messege': [''],
    'email': [''],
    'subject': [''],
  });




  }

  get getControl() { return this.ContactForm.controls; }

  createEntry(){
      console.log("dsjfds =---")
    const obj = {
    name:this.getControl.name.value,
    mobile: this.getControl.mobile.value,
    messege:this.getControl.messege.value ,
    email:this.getControl.email.value,
    subject: this.getControl.subject.value,
    }
    console.log("objobj =---",obj)
  this.sendDocumentEmail.sendDocumentEmail(obj)
  .pipe(first())
    .subscribe(
      data => {
        console.log(data);
        if((data as any).success==true){
          Swal.fire({
            title: "Thank you",
            text: (data as any).message,
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
        this.clear()
      },
      error => {
      
      });
  }

  clear(){
    this.ContactForm.patchValue({ name:  "" });
    this.ContactForm.patchValue({ mobile:  "" });
    this.ContactForm.patchValue({ messege:  "" });
    this.ContactForm.patchValue({ email:  "" });
    this.ContactForm.patchValue({ subject:  "" });
  }

}