import {Component, Input} from '@angular/core';
import {TicketExt} from '../../shared/interfaces/interfaces';
import {getStatusDescription} from "../../shared/constants/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
})
export class TicketDetailsComponent {

  constructor(private router: Router) {
  }

  @Input() selectedRow: TicketExt | null = null;
  protected readonly getStatusDescription = getStatusDescription;

  async goToTicket(): Promise<void> {
    await this.router.navigate(['ticket', this.selectedRow?.id]);
  }
}
