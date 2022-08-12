import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AddquestionService} from '../_service/addquestion.service';
import { Observable, Observer } from "rxjs";
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
  name = "Mr";
  base64Image: any;

  
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
console.log("show iamge url ",event)
  if(event){
    let imageUrl = event
    

  this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
    console.log(base64data);
    this.base64Image = "data:image/jpg;base64," + base64data;
    // save image to disk
    var link = document.createElement("a");

    document.body.appendChild(link); // for Firefox

    link.setAttribute("href", this.base64Image);
    link.setAttribute("download", event.slice(30));
    link.click();
  });
  
  
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

getBase64ImageFromURL(url: string) {
  return Observable.create((observer: Observer<string>) => {
    const img: HTMLImageElement = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    if (!img.complete) {
      img.onload = () => {
        observer.next(this.getBase64Image(img));
        observer.complete();
      };
      img.onerror = err => {
        observer.error(err);
      };
    } else {
      observer.next(this.getBase64Image(img));
      observer.complete();
    }
  });
}

getBase64Image(img: HTMLImageElement) {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const dataURL: string = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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