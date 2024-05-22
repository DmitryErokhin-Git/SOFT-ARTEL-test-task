import {Component} from '@angular/core';
import {getStatusDescription, LIMIT_CHARACTERS} from '../../constants/constants';
import {CommonModule, DatePipe, NgStyle, NgSwitch, NgSwitchCase} from '@angular/common';
import {TruncatePipe} from '../../pipes/truncate.pipe';
import {HighlighterPipe} from '../../pipes/highlighter.pipe';

@Component({
  selector: 'id-cell-component',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, HighlighterPipe, TruncatePipe, DatePipe, NgStyle, CommonModule],
})
export class CellComponent {
  field: any;
  ticket: any;
  keyword: any;
  content: any;
  protected readonly LIMIT_CHARACTERS: number = LIMIT_CHARACTERS;

  protected readonly getStatusDescription = getStatusDescription;
}
