import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddquestionService} from '../_service/addquestion.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import Swal from "sweetalert2";

@Component({
  selector: 'app-msc-seme1',
  templateUrl: './msc-seme1.component.html',
  styleUrls: ['./msc-seme1.component.scss']
})
export class MscSeme1Component implements OnInit {

  IntSubjectId:any;
  arryOfsubject =[];
  semester='';

  constructor(private activatedRoute:ActivatedRoute,
    private AddquestionSRV:AddquestionService,
    private router: Router) { }

  ngOnInit(): void {

    this.IntSubjectId = this.activatedRoute.snapshot.queryParamMap.get('id');
    console.log("ttttttt",this.IntSubjectId)
    // this.getAllList()
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
   });
   this.getSubjectList(this.IntSubjectId);

  }

  getSubjectList(event) {
    this.arryOfsubject =[];
    console.log("lll----",event)
    try {
      var objData = {
        semester:event
      }
      this.AddquestionSRV.get_subjectById(objData).subscribe((res: any) => {
      console.log("get_subcategoryById------",res)
        if (res && res.success === true) {
          this.arryOfsubject = res.data
          this.semester = this.arryOfsubject[0].semester.semester;
          console.log("nnn---",this.arryOfsubject)
        } else {
          if( res.message === "Token Error"){
            this.router.navigate( ['./admin']);
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

  Downloadimages(event){
    console.log("yyy--",event)
    if(event){
      window.location.href =  event.logoUrl;
    }else{
      // alert('No Image Found')
      Swal.fire({
        title: "Error",
        text: "No Image Found",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }
  

}