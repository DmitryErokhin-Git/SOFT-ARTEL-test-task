import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from "../../shared/interfaces/interfaces";

@Component({
  selector: 'page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() formSearch!: FormGroup;
  @Input() user: User | null = null;
  @Output() clearSearch = new EventEmitter();
  @Output() addEvent = new EventEmitter();
  @Output() exitEvent = new EventEmitter();
}
