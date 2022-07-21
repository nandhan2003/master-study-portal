import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment} from '../../environments/environment';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import {Http, Headers, Response} from '@angular/http';
import { HttpClientService } from '../common/http-client.service';
import { throwError, concat, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private api: string = environment.apiUrl;

  constructor(
    private router: Router,
    // private httpa: Http,
    private http: HttpClient,
    private https: HttpClientService

  ) {
    
  }
  
  get_service_list(obj){
    return this.https.post('/api/service/getServiceDetails', obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  get_service_list_ById(obj){
    return this.https.post('/api/service/getByServiceIdDetails', obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  save_service(obj){
    return this.https.post('/api/service/SaveNewService', obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  update_service(obj){
    return this.https.post('/api/service/UpdateServiceDetails', obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  delete_service(obj){
    return this.https.post('/api/service/DeleteServiceDetails', obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }


  uploadFiles(objUpload) {
    const formData = new FormData();
    const {file,  } = objUpload;

    formData.append('file', file);
    // formData.append('strUserId', strUserId);
   // formData.append('intLoginUserId', intLoginUserId);

    return this.http.post(`${this.api}/api/Upload/file_upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).map((event) => {
      return event;
    }).catch(this.https.hamdleError);

  }


}
