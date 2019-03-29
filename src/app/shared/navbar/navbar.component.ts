import { Component, OnInit, AfterViewInit } from '@angular/core';

declare const $;

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appNavbar]',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {
    console.log('hello');
  }

  ngAfterViewInit() {
    // Toggle the side navigation
    $('#sidebarToggle, #sidebarToggleTop').on('click', e => {
      $('body').toggleClass('sidebar-toggled');
      $('.sidebar').toggleClass('toggled');
      if ($('.sidebar').hasClass('toggled')) {
        $('.sidebar .collapse').collapse('hide');
      }
    });
  }
}
