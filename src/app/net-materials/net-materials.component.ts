import { Component, OnInit } from '@angular/core';
import { NetService }from '../_service/net.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { FormBuilder,Validators,FormGroup,ValidationErrors} from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable, Observer } from "rxjs";

@Component({
  selector: 'app-net-materials',
  templateUrl: './net-materials.component.html',
  styleUrls: ['./net-materials.component.scss']
})
export class NetMaterialsComponent implements OnInit {
  arryOfItemData =[];
  name = "Mr";
  base64Image: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private NetSRV:NetService,
  ) { }

  ngOnInit(): void {
    this.AddMaterials()
  }
  AddMaterials(){
    this.arryOfItemData =[];

    try {
      var objData = {
        intSkipCount: 0,
        intPageLimit: 0,
        
      }
      console.log("objData=----",objData)
      
      this.NetSRV.AddMaterials(objData).subscribe((res: any) => {
        console.log("rea=----",res)
        if (res && res.success === true) {

          this.arryOfItemData = res.data[0];
        
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


Downloadimages(event){
  console.log("show iamge url ",event)
    if(event){
      let imageUrl = event
      
  
    this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
      console.log(base64data);
      this.base64Image = "data:image/jpeg;base64," + base64data;
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
