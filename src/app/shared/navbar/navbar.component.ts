import { Component, OnInit, AfterViewInit, HostBinding, Input } from '@angular/core';
import { NavbarObject, NavItem, NavHeader } from './nav-items.interface';

declare const $;

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appNavbar]',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @HostBinding('class') hostClass =
    'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion';
  @HostBinding('id') hostId = 'accordionSidebar';

  @Input()
  navItems: NavbarObject[];

  constructor() {}

  ngOnInit() {}

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

  getNavItem(item: NavbarObject): NavItem {
    return item as NavItem;
  }

  getNavHeader(item: NavbarObject): NavHeader {
    return item as NavHeader;
  }
}
