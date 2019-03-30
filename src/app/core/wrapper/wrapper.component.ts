import { Component, OnInit } from '@angular/core';
import { NavItem } from 'src/app/shared/navbar/nav-items.interface';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  navItems: NavItem[] = [
    {
      type: 'nav-item',
      icon: 'fa-globe',
      text: 'All Countries',
      route: ['']
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
