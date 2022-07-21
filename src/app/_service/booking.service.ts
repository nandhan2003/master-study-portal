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
export class BookingService {
  private api: string = environment.apiUrl;

  constructor(
    private router: Router,
    // private httpa: Http,
    private http: HttpClient,
    private https: HttpClientService

  ) {
    
  }
  
  update_booking_status(obj){
    return this.https.post('/api/booking/UpdateBookingStatusDetails', obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  delete_booking(obj){
    return this.https.post('/api/booking/DeleteBookingDetails', obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  get_booking_list(param: any){
    return this.https.post('/api/booking/getBookingDetails', param )
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  get_booking_list_ById(param: any){
    return this.https.post('/api/booking/getByBookingIdDetails', param )
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  save_booking(param: any){
    return this.https.post('/api/booking/SaveNewBooking', param )
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  update_booking(param: any){
    return this.https.post('/api/booking/UpdateBookingDetails', param )
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/admin']);
  }



}
