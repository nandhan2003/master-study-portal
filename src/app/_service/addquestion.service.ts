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
export class AddquestionService {
  private api: string = environment.apiUrl;
  
  constructor(
    private router: Router,
    // private httpa: Http,
    private http: HttpClient,
    private https: HttpClientService
  ) { }
  addquestion(value){
    return this.https.post('/api/course/Question', value)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }
  GetAllQuestionData(param: any){
    console.log("param=----",param)
    return this.https.post('/api/course/getQuestionList', param )
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }
  GetAllQuestionGroupData(param: any){
    console.log("param=----",param)
    return this.https.post('/api/course/getQuestionGroupList', param )
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }
  
  GetCourseData(param: any){
    console.log("param=----",param)
    return this.https.post('/api/course/getCourseList', param )
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }
  updateQuestion(value) {
    return this.https.post('/api/course/updateQuestion', value)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }
  delete(value) {
    return this.https.post('/api/course/DeletequestionDetails', value)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }
  
  GetListById(value) {
    return this.https.post('/api/course/GetListIdquestionPapers', value)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }

  get_subjectById(value) {
    return this.https.post('/api/course/GetListIdSubject', value)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }


  getCustomerDataByEmail(value) {
    return this.https.post('/api/email/GetCustomerByEmail', value)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }
}
