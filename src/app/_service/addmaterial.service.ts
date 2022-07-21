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
export class AddmaterialService {
  private api: string = environment.apiUrl;

  constructor(
    private router: Router,
    // private httpa: Http,
    private http: HttpClient,
    private https: HttpClientService
  ) { }

  addMaterial(value) {
    return this.https.post('/api/course/Course', value)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }
  loadSubcategory(param: any) {
    console.log("param=----", param)
    return this.https.post('/api/course/getCourseList', param)
      .map(res => res.json())
      .catch(this.https.hamdleError);

  }
  subcategoryUpdate(value) {
    return this.https.post('/api/course/subcategoryUpdate', value)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }
  delete(value) {
    return this.https.post('/api/course/DeleteCourseDetails', value)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }

  GetListById(value) {
    return this.https.post('/api/course/GetListById', value)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }

}
