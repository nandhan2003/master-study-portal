import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddquestionService} from '../_service/addquestion.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer } from "rxjs";
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
    private http: HttpClient,
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
  
   downloadUrl(url: string, fileName: string) {
    const a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  };
  
  Downloadimages(event){
    console.log("event =-- -0----",event)
    if(event){
      this.http.get(event, { responseType: 'blob' }).subscribe(val => {
        console.log(val);
        const url = URL.createObjectURL(val);
        var filteredUrl = event.slice(0,32)
        this.downloadUrl(url, filteredUrl);
        URL.revokeObjectURL(url);
      });

    }else{
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