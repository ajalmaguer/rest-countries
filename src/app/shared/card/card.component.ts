import { Component, OnInit, Input, ContentChild } from '@angular/core';
import { CardHeaderDirective } from './card-header.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() appClass = '';

  @ContentChild(CardHeaderDirective) header: CardHeaderDirective;

  constructor() {}

  ngOnInit() {}
}
