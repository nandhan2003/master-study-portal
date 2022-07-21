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
export class NetService {

  constructor(
    private router: Router,
    // private httpa: Http,
    private http: HttpClient,
    private https: HttpClientService
  ) { 
  
  }
net(value){
  return this.https.post('/api/course/net', value)
  .map(res => res.json())
  .catch(this.https.hamdleError);
}
AddMaterials(param: any){
  console.log("param=----",param)
  return this.https.post('/api/course/netList', param )
  .map(res => res.json())
  .catch(this.https.hamdleError);

}
UpdateNet(value) {
  return this.https.post('/api/course/UpdateNet', value)
    .map(res => res.json())
    .catch(this.https.hamdleError);
}
delete(value) {
  return this.https.post('/api/course/DeleteNetDetails', value)
    .map(res => res.json())
    .catch(this.https.hamdleError);
}

GetListById(value) {
  return this.https.post('/api/course/GetListIdNet', value)
    .map(res => res.json())
    .catch(this.https.hamdleError);
}
}
