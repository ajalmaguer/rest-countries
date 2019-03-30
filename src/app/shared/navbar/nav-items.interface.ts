export interface NavItem {
  type: 'nav-item';
  icon: string;
  text: string;
  route: string[];
}

export interface NavDivider {
  type: 'divider';
}

export interface NavHeader {
  type: 'heading';
  text: string;
}

export type NavbarObject = (NavItem | NavDivider | NavHeader);
