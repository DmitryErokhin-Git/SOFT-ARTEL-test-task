import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'page-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() quantityMessages!: number;
  @Output() pageChange = new EventEmitter();
  @Output() setItems = new EventEmitter();

}
