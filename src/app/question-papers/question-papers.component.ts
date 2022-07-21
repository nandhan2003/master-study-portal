import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-papers',
  templateUrl: './question-papers.component.html',
  styleUrls: ['./question-papers.component.scss']
})
export class QuestionPapersComponent implements OnInit {
  // toggle1 = false;
  // toggle2 = false;

  
  constructor() { }

  ngOnInit(): void {
    
    this.collapsibl();
  }
  collapsibl(){
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }
  

}
// constructor() { }

// ngOnInit(): void {
//   this.ChangeTab('page1')
  
// }

// ChangeTab(change) {
//   var i;
//   const classArr: any = document.querySelectorAll('.buttonChange');
//   for (i = 0; i < classArr.length; i++) {
//     classArr[i].style.display = "none";
//   }

//   document.getElementById(change).style.display = "block";
//   if(change === "page1" ){
//     this.toggle1 = true;
//     this.toggle2 = false;
    
//   }else if(change === "page2"){
//     this.toggle1 = false;
//     this.toggle2 = true;
//   }
// }

// }