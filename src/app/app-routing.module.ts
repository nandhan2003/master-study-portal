import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from'./register/register.component';
import { CourseComponent } from'./course/course.component';
import { SemesterComponent } from'./semester/semester.component';
import { Sem1Component } from'./sem1/sem1.component';
import { Sem3Component } from'./sem3/sem3.component';
import { Sem4Component } from'./sem4/sem4.component';
import { Semester1Component } from'./semester1/semester1.component';
import { Mcasem1Component } from'./mcasem1/mcasem1.component';
import { Mcasem2Component } from'./mcasem2/mcasem2.component';
import { Mcasem3Component } from'./mcasem3/mcasem3.component';
import { QuestionComponent } from'./question/question.component';
import { QuestionmcaComponent } from'./questionmca/questionmca.component';
import { NetComponent } from'./net/net.component';
import { AdminloginComponent } from'./adminlogin/adminlogin.component';
import { AdminregisterComponent } from'./adminregister/adminregister.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from './shared/shared.module';
import { SecondpageComponent } from './secondpage/secondpage.component';
import { SecondpageMcaComponent} from './secondpage-mca/secondpage-mca.component';
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

  const routes: Routes = [

    {
      path: "",
      redirectTo: "home",
      pathMatch: "full"
    },

    { path: 'home', component: LandingPageComponent},
    // { path: 'register', component: RegisterComponent},
    // { path: 'course', component: CourseComponent},
    // { path: 'semester', component: SemesterComponent},
    // { path: 'sem1', component: Sem1Component},
    // { path: 'sem3', component: Sem3Component},
    // { path: 'sem4', component: Sem4Component},
    // { path: 'semester1', component: Semester1Component},
    // { path: 'mcasem1', component: Mcasem1Component},
    // { path: 'mcasem2', component: Mcasem2Component},
    // { path: 'mcasem3', component: Mcasem3Component},
    // { path: 'question', component: QuestionComponent},
    // { path: 'questionmca', component: QuestionmcaComponent},
    // { path: 'net', component: NetComponent},
    // { path: 'adminlogin', component: AdminloginComponent},
    // { path: 'adminregister', component: AdminregisterComponent},
    // { path: 'Contactpage', component: ServiceComponent},
    // { path: 'category', component: CategoryComponent},
    { path: 'secondpage', component: SecondpageComponent},
    { path: 'secondpageMca', component: SecondpageMcaComponent},
    { path: 'questionPapers', component: QuestionPapersComponent},
    { path: 'netMaterials', component: NetMaterialsComponent},
    { path: 'mscSeme1', component: MscSeme1Component},
    { path: 'mscSeme2', component: MscSeme2Component},
    { path: 'mscSeme3', component: MscSeme3Component},
    { path: 'mscSeme4', component: MscSeme4Component},
    { path: 'mcaSeme1', component: McaSeme1Component},
    { path: 'mcaSeme2', component: McaSeme2Component},
    { path: 'mcaSeme3', component: McaSeme3Component},
    { path: 'mscSyllabus', component: MscSyllabusComponent},
    { path: 'mcaSyllabus', component: McaSyllabusComponent},
    { path: 'subject-view', component: SubjectViewComponent},



    { path: "", redirectTo: "admin", pathMatch: "full" },
    { path: 'admin', loadChildren: () => import('./accounts/accounts.module').then(x => x.AccountsModule) },
    {
      path: '',
      loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)
    },
    // { path: '**', component: ErrorComponent},

  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes),SharedModule],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
