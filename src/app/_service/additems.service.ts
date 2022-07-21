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
export class AdditemsService {

  private api: string = environment.apiUrl;

  constructor(
    private router: Router,
    // private httpa: Http,
    private http: HttpClient,
    private https: HttpClientService
  ) {}
  addItems(value) {
       return this.https.post('/api/course/Item', value)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }
  listItem(param: any){
    console.log("param=----",param)
    return this.https.post('/api/course/GetItemList', param )
    .map(res => res.json())
    .catch(this.https.hamdleError);
  
  }
  UpdateItem(value) {
    return this.https.post('/api/course/UpdateItem', value)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }
  delete(value) {
    return this.https.post('/api/course/DeleteItemDetails', value)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }

  GetListById(value) {
    return this.https.post('/api/course/GetListIdItem', value)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }


}
