import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {SidebarComponent} from '../common/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import {NavigationComponent} from '../common/navigation/navigation.component';
import { UserlistComponent } from '../admin/userlist/userlist.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ServicelistComponent } from './servicelist/servicelist.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { BookinglistComponent } from './bookinglist/bookinglist.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { AdminComponent } from './admin.component';
import { AddmaterialComponent } from './subcategories/addmaterial.component';
import { AdditemsComponent } from './categories/additems.component';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { NetquestionComponent } from './netquestion/netquestion.component';
import { NetmaterialsComponent } from './netmaterials/netmaterials.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { SubcategorylistComponent } from './subcategorylist/subcategorylist.component';
import { StudymaterialsComponent } from './studymaterialslist/studymaterials.component';
import { ListmaterialComponent } from './studymaterial/listmaterial.component';
import { QuestionlistComponent } from './questionlist/questionlist.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavigationComponent,
    LayoutComponent,
    UserlistComponent,
    AddUserComponent,
    ServicelistComponent,
    AddServiceComponent,
    BookinglistComponent,
    AddBookingComponent,
    AdminComponent,
    AddmaterialComponent,
    AdditemsComponent,
    AddquestionComponent,
    NetquestionComponent,
    NetmaterialsComponent,
    ItemlistComponent,
    SubcategorylistComponent,
    StudymaterialsComponent,
    ListmaterialComponent,
    QuestionlistComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // ReactiveFormsModule,
    // FormsModule,
    // NgImageSliderModule,
    // PdfViewerModule,
    // AngularMultiSelectModule,

  ]
})

export class AdminModule { }
