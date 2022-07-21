import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ErrorComponent } from '../error/error.component';
import {AuthGuard} from '../_helpers/auth.guard';
import { UserlistComponent } from '../admin/userlist/userlist.component';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ServicelistComponent } from './servicelist/servicelist.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { BookinglistComponent } from './bookinglist/bookinglist.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { AdditemsComponent } from'./categories/additems.component';
import { AddquestionComponent } from'./addquestion/addquestion.component';
import { AddmaterialComponent } from'./subcategories/addmaterial.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { SubcategorylistComponent } from './subcategorylist/subcategorylist.component';
import { QuestionlistComponent } from './questionlist/questionlist.component';
import { StudymaterialsComponent } from'./studymaterialslist/studymaterials.component';
import { ListmaterialComponent} from './studymaterial/listmaterial.component';
import { NetmaterialsComponent } from './netmaterials/netmaterials.component';
import { NetquestionComponent } from './netquestion/netquestion.component';
const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "userlist", pathMatch: "full" },
      { path: 'userlist', component: UserlistComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'servicelist', component: ServicelistComponent },
      { path: 'add-service', component: AddServiceComponent },
      { path: 'bookinglist', component: BookinglistComponent },
      { path: 'add-booking', component: AddBookingComponent },
      { path: 'addmaterial', component: AddmaterialComponent},
      { path: 'additems', component: AdditemsComponent},
      { path: 'addquestion', component: AddquestionComponent},
      { path: 'itemlist', component: ItemlistComponent},
      { path: 'subcategorylist', component:SubcategorylistComponent},
      { path: 'questionlist', component: QuestionlistComponent},
      { path: 'studymaterialslist', component: StudymaterialsComponent},
      { path: 'studymaterial', component: ListmaterialComponent},
      { path: 'netmaterials', component: NetmaterialsComponent},
      { path: 'netquestion', component: NetquestionComponent},
    ]
  },
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
