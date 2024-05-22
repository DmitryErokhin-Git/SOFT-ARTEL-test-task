import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TableConfig, TicketExt} from '../../shared/interfaces/interfaces';
import {Observable} from 'rxjs';
import {AppState, configSelector, ticketsSelector} from "../../shared/store";
import {Store} from "@ngrx/store";

@Component({
  selector: 'tickets-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() loading$!: Observable<boolean>;
  @Input() formSearch!: FormGroup;
  @Input() selectedRow: TicketExt | null = null;
  @Input() currentPage!: number;
  @Input() itemsPerPage!: number;
  @Output() openModal: EventEmitter<any> = new EventEmitter();
  @Output() details: EventEmitter<any> = new EventEmitter();
  tableConfig$!: Observable<TableConfig>;
  tableData$!: Observable<TicketExt[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.tableConfig$ = this.store.select(configSelector);
    this.tableData$ = this.store.select(ticketsSelector);
  }

  areObjectsEqual(objA: any, objB: any): boolean {
    if (objA && objB) {
      const keysA: string[] = Object.keys(objA);
      const keysB: string[] = Object.keys(objB);

      if (keysA.length !== keysB.length) {
        return false;
      }
      for (const key of keysA) {
        if (objA[key] !== objB[key]) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

}
