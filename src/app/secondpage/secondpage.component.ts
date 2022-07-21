import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudymaterialsService} from '../_service/studymaterials.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-secondpage',
  templateUrl: './secondpage.component.html',
  styleUrls: ['./secondpage.component.scss']
})
export class SecondpageComponent implements OnInit {

  IntSemesterId:any;
  arryOfSemester =[];

  constructor(private activatedRoute:ActivatedRoute,
    private studymaterialsSRV:StudymaterialsService,
    private router: Router,) { }

  ngOnInit(): void {

    this.IntSemesterId = this.activatedRoute.snapshot.queryParamMap.get('id');
    console.log("ttttttt",this.IntSemesterId)
    // this.getAllList()
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
   });
   this.getSemesterList(this.IntSemesterId);
  }


  getSemesterList(event) {
    this.arryOfSemester =[];
    console.log("lll----",event)
    try {
      var objData = {
        category:event
      }
      this.studymaterialsSRV.get_semesterById(objData).subscribe((res: any) => {
      console.log("get_subcategoryById------",res)
        if (res && res.success === true) {
          this.arryOfSemester = res.data
          console.log("nnn---",this.arryOfSemester)
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
  
  onClick(obj){
    console.log("rrrrrrr------",obj)
    this.router.navigate(['/mscSeme1'],{queryParams:{id:obj._id}});
  }
}
