import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { NgImageSliderModule } from 'ng-image-slider';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HttpClientService } from './common/http-client.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSlickJsModule } from 'ngx-slickjs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { SampleLoginComponent } from './sample-login/sample-login.component';
import { RegisterComponent } from './register/register.component';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';
import { SemesterComponent } from './semester/semester.component';
import { Sem1Component } from './sem1/sem1.component';
import { Sem2Component } from './sem2/sem2.component';
import { Sem3Component } from './sem3/sem3.component';
import { Sem4Component } from './sem4/sem4.component';
import { Semester1Component } from './semester1/semester1.component';
import { Mcasem1Component } from './mcasem1/mcasem1.component';
import { Mcasem2Component } from './mcasem2/mcasem2.component';
import { Mcasem3Component } from './mcasem3/mcasem3.component';
import { QuestionComponent } from './question/question.component';
import { QuestionmcaComponent } from './questionmca/questionmca.component';
import { NetComponent } from './net/net.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeWebModule } from './home_web/home-web.module';
import { SharedModule } from './shared/shared.module';
import { SecondpageComponent } from './secondpage/secondpage.component';
import { SecondpageMcaComponent } from './secondpage-mca/secondpage-mca.component';
import { QuestionPapersComponent } from './question-papers/question-papers.component';
import { NetMaterialsComponent } from './net-materials/net-materials.component';
import { MscSeme1Component } from './msc-seme1/msc-seme1.component';
import { MscSeme2Component } from './msc-seme2/msc-seme2.component';
import { MscSeme3Component } from './msc-seme3/msc-seme3.component';
import { MscSeme4Component } from './msc-seme4/msc-seme4.component';
import { McaSeme1Component } from './mca-seme1/mca-seme1.component';
import { McaSeme2Component } from './mca-seme2/mca-seme2.component';
import { McaSeme3Component } from './mca-seme3/mca-seme3.component';
import { MscSyllabusComponent } from './msc-syllabus/msc-syllabus.component';
import { McaSyllabusComponent } from './mca-syllabus/mca-syllabus.component';
import { SubjectViewComponent } from './subject-view/subject-view.component';
// import { SubcategorylistComponent } from './admin/subcategorylist/subcategorylist.component';





// import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    // SampleLoginComponent,
    RegisterComponent,
    CourseComponent,
    LoginComponent,
    SemesterComponent,
    Sem1Component,
    Sem2Component,
    Sem3Component,
    Sem4Component,
    Semester1Component,
    Mcasem1Component,
    Mcasem2Component,
    Mcasem3Component,
    QuestionComponent,
    QuestionmcaComponent,
    NetComponent,
    AdminloginComponent,
    AdminregisterComponent,
    LandingPageComponent,
    SecondpageComponent,
    SecondpageMcaComponent,
    QuestionPapersComponent,
    NetMaterialsComponent,
    MscSeme1Component,
    MscSeme2Component,
    MscSeme3Component,
    MscSeme4Component,
    McaSeme1Component,
    McaSeme2Component,
    McaSeme3Component,
    MscSyllabusComponent,
    McaSyllabusComponent,
    SubjectViewComponent,
   
    
   
  
    // SubcategorylistComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule,
    CarouselModule.forRoot(),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgImageSliderModule,
    SlickCarouselModule,
    NgxSlickJsModule,
    BsDropdownModule.forRoot() ,
    HomeWebModule,
    SharedModule,
    // NgbCarouselModule,
    // SlickCarouselModule

  ],
  providers: [HttpClientService,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
    // // provider used to create fake backend
    // fakeBackendProvider
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
