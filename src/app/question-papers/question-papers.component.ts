import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AddquestionService} from '../_service/addquestion.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-question-papers',
  templateUrl: './question-papers.component.html',
  styleUrls: ['./question-papers.component.scss']
})
export class QuestionPapersComponent implements OnInit {
  // toggle1 = false;
  // toggle2 = false;
  arryOfItemData =[];
  
  constructor(private AddquestionSRV:AddquestionService,) { }

  ngOnInit(): void {
    
    this.collapsibl();
    this.QuestionUpload();
  }

  QuestionUpload(){
    // console.log("loadItem=----",this.getControl.subject.value,
    // this.getControl.year.value)
    this.arryOfItemData =[];

    try {
      var objData = {
        intSkipCount: 0,
        intPageLimit: 0,
        // subject :  this.getControl.subject.value,
        // semester:  this.getControl.semester.value,
        
      }
      console.log("objData=----",objData)
      this.AddquestionSRV.GetAllQuestionGroupData(objData).subscribe((res: any) => {
        console.log("arryOfItemData   %%%%%%%%%%%%%%%%%%%%%%%%----",res)
        if (res && res.success === true) {

          this.arryOfItemData = res.data[0];
          console.log("arry",this.arryOfItemData)
        } else {
          if( res.message === "Token Error"){
            // this.router.navigate( ['./questionlist']);
          }
        }
      },(error:HttpErrorResponse) => {

        console.log(error);
        // if( error.message === "Token Error"){
        //   this.router.navigate( ['./admin']);
        // }
    });
    } catch (error) {
    }
}




  collapsibl(){
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }
  
  
Downloadimages(event){

  if(event){
    window.location.href =  event;
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

openPrediction(event) {
  console.log("yyy--",event)
 
  if(event){
    window.open(event);
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
// constructor() { }

// ngOnInit(): void {
//   this.ChangeTab('page1')
  
// }

// ChangeTab(change) {
//   var i;
//   const classArr: any = document.querySelectorAll('.buttonChange');
//   for (i = 0; i < classArr.length; i++) {
//     classArr[i].style.display = "none";
//   }

//   document.getElementById(change).style.display = "block";
//   if(change === "page1" ){
//     this.toggle1 = true;
//     this.toggle2 = false;
    
//   }else if(change === "page2"){
//     this.toggle1 = false;
//     this.toggle2 = true;
//   }
// }

// }