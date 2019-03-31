import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit, OnDestroy {
  filterInput = new FormControl('');
  inputSubcription: Subscription;
  @Output() filter = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.inputSubcription = this.filterInput.valueChanges
    .pipe(
      debounceTime(100),
      distinctUntilChanged(),
    ).subscribe(
      filter => {
        this.filter.emit(filter);
      }
    );
  }

  ngOnDestroy() {
    if (this.inputSubcription) {
      this.inputSubcription.unsubscribe();
    }
  }
}
