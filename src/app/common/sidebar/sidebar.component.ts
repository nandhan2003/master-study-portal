import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../_service/user.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems = [];
  // DataExpert:any;
  constructor(
    private router: Router,
    private UserService: UserService,
  ) { }

  ngOnInit(): void {

    // this.DataExpert = JSON.parse(localStorage.getItem('Expert_Details'));

    this.menuItems = [  {
      name: "Users",
      icon: "person",
      route: "userlist",
      active: true
      },
      {
        name: "Category",
        icon: "person",
        route: "itemlist",
        active: true
      },
    
      {
        name: "Subcategory",
        icon: "person",
        route: "subcategorylist",
        active: true
      },
      {
        name: "Study Materials",
        icon: "person",
        route: "studymaterialslist",
        active: true
      },
      {
        name: "QuestionPapers",
        icon: "person",
        route: "questionlist",
        active: true
      },
      {
        name: "NET-Materials",
        icon: "person",
        route: "netquestion",
        active: true
      }
     
     
  
    ]
  }

}
