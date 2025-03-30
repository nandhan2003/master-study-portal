import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NetService }from '../_service/net.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { FormBuilder,Validators,FormGroup,ValidationErrors} from '@angular/forms';
import { Observable, Observer } from "rxjs";
import { AddquestionService} from '../_service/addquestion.service';

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
    private http: HttpClient,
    private AddquestionSRV:AddquestionService,
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

// Downloadimages(event){
//   if(event){
//     this.http.get(event, { responseType: 'blob' }).subscribe(val => {
//       console.log(val);
//       const url = URL.createObjectURL(val);
//       var filteredUrl = event.slice(0,32)
//       this.downloadUrl(url, filteredUrl);
//       URL.revokeObjectURL(url);
//     });

//   }else{
//     Swal.fire({
//       title: "Error",
//       text: "No Image Found",
//       icon: "error",
//       confirmButtonText: "Ok",
//     });
//   }
// }

  Downloadimages(event: string) {
    Swal.fire({
      title: "Enter Your Registered Email",
      input: "email",
      inputPlaceholder: "Enter your email",
      showCancelButton: true,
      confirmButtonText: "Submit",
      preConfirm: (email) => {
        if (!email) {
          Swal.showValidationMessage("Email is required!");
        }
        return email;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const email = result.value;
        this.loadCustomer({ email },event);
      }
    });
  }
  
  loadCustomer(Obj, event) {
    try {
      var objData = {
        email: Obj.email,
      };
      console.log("objData---", objData);
  
      this.AddquestionSRV.getCustomerDataByEmail(objData).subscribe(
        (res: any) => {
          console.log("res---", res);
  
          // Check if res.data exists and is an array with valid entries
          if (res?.data?.length > 0 && res?.data[0]?.length > 0 && res?.data[0][0]?._id) {
            // Proceed with download
            if (event) {
              this.http.get(event, { responseType: "blob" }).subscribe((val) => {
                const url = URL.createObjectURL(val);
                const filteredUrl = event.slice(0, 32);
                this.downloadUrl(url, filteredUrl);
                URL.revokeObjectURL(url);
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "No Image Found",
                icon: "error",
                confirmButtonText: "Ok",
              });
            }
          } else {
            // Show warning if no data found
            Swal.fire({
              title: "Warning",
              text: "To download the data, you need to register your email!",
              icon: "warning",
              confirmButtonText: "Ok",
            });
          }
        },
        (error) => {
          console.error("Error fetching data:", error);
          Swal.fire({
            title: "Error",
            text: "Something went wrong! Please try again later.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
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

videoLink(event){
  console.log("link--",event)
  this.router.navigateByUrl(event);

}
}

