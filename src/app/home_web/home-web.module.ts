import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryComponent } from'./category/category.component';
import { TopHeadComponent } from './top-head/top-head.component';
import { BottomHeadComponent } from './bottom-head/bottom-head.component';

@NgModule({
  declarations: [
    CategoryComponent,
    TopHeadComponent,
    BottomHeadComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CategoryComponent,
    TopHeadComponent,
    BottomHeadComponent
  ]
})
export class HomeWebModule { }
