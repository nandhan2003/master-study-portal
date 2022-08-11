import { Component, OnInit } from '@angular/core';
import { NetService }from '../_service/net.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { FormBuilder,Validators,FormGroup,ValidationErrors} from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-net-materials',
  templateUrl: './net-materials.component.html',
  styleUrls: ['./net-materials.component.scss']
})
export class NetMaterialsComponent implements OnInit {
  arryOfItemData =[];

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
