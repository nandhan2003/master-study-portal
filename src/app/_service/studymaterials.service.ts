import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { HttpClientService } from '../common/http-client.service';
import { throwError, concat, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudymaterialsService {
  private api: string = environment.apiUrl;
  constructor(
    private router: Router,
    // private httpa: Http,
    private http: HttpClient,
    private https: HttpClientService
  ) { }

studymaterials(value){
  console.log("value valuevalue ",value)
  return this.https.post('/api/material/studymaterial', value)
  .map(res => res.json())
  .catch(this.https.hamdleError);
}
loadMaterials(param: any){
  console.log("param=----",param)
  return this.https.post('/api/material/getMaterialList', param )
  .map(res => res.json())
  .catch(this.https.hamdleError);
}
studymaterialUpdate(value) {
  return this.https.post('/api/course/Updatestudymaterial', value)
    .map(res => res.json())
    .catch(this.https.hamdleError);
}
delete(value) {
  console.log("delete------",value)
  return this.https.post('/api/course/DeletematerialDetails', value)
    .map(res => res.json())
    .catch(this.https.hamdleError);
}

GetListById(value) {
  return this.https.post('/api/course/GetListMaterial', value)
    .map(res => res.json())
    .catch(this.https.hamdleError);
}

get_semesterById(value) {
  return this.https.post('/api/course/GetSemesterListById', value)
    .map(res => res.json())
    .catch(this.https.hamdleError);
}

}