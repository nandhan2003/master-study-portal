
import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() headerStatus = new EventEmitter<boolean>();

  menuOpt: boolean = false;

  sclBar: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.menuOpt = !this.menuOpt;
  }

  showEp() {
    this.headerStatus.emit(true);
  }


  @HostListener('window:scroll', ['$event'])
    scrollHandler() {
      if (window.pageYOffset >= 120) {
        this.sclBar = true;
      } else {
        this.sclBar = false;
      }
    }

  }