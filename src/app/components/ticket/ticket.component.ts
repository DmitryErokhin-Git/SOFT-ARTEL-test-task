import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {catchError, combineLatest, EMPTY, finalize, of, Subject, switchMap, take, tap} from "rxjs";
import {Router} from "@angular/router";
import {ApiService} from "../../shared/services/api.service";
import {TicketExt, User} from "../../shared/interfaces/interfaces";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../shared/services/auth.service";
import {getStatusDescription, NOTIFICATION} from "../../shared/constants/constants";
import {AppService} from "../../shared/services/app.service";
import {ModalComponent} from "../../shared/components/modal/modal.component";
import {DataService} from "../../shared/services/data.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppState, routerStateSelector, ticketsSelector} from "../../shared/store";
import {Store} from "@ngrx/store";

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, OnDestroy {
  @Input() selectedTicket!: TicketExt;
  private unsubscribe$: Subject<void> = new Subject<void>();
  private formTicket: FormGroup = this.formBuilder.group({
    id: [null],
    status: [null],
    createdDate: [null],
    description: [null],
  });
  protected readonly getStatusDescription = getStatusDescription;


  constructor(private apiService: ApiService,
              private loader: NgxUiLoaderService,
              private router: Router,
              public toastr: ToastrService,
              private authService: AuthService,
              private appService: AppService,
              public dataService: DataService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.loadTicketData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadTicketData(): void {
    this.loader.start('master');

    combineLatest([
      this.store.select(routerStateSelector),
      this.store.select(ticketsSelector)
    ]).pipe(
      take(1),
      switchMap(([params, tickets]) => {
        const ticketId = params?.params['ticketId'];

        if (!ticketId || this.appService.containsNonDigitCharacter(ticketId)) {
          this.toastr.error(NOTIFICATION.TICKET_INVALID_ID);
          this.router.navigate(['/tickets']).then();
          return EMPTY;
        }

        const ticketsFind: TicketExt[] = tickets.filter((ticket: TicketExt): boolean => ticket.id === +ticketId);

        if (ticketsFind.length > 0) {
          return of(ticketsFind);
        } else {
          return this.apiService.getTicketById(+ticketId);
        }
      }),
      tap(async (tickets: TicketExt[]): Promise<void> => {
        const user: User = await this.authService.getUserFromStore();
        if (tickets.length > 0 && tickets[0].userId === user.id) {
          this.selectedTicket = tickets[0];

          this.formTicket = this.formBuilder.group({
            id: [{value: this.selectedTicket.id, disabled: true}, Validators.required],
            status: [{value: this.selectedTicket.status, disabled: true}, Validators.required],
            createdDate: [{value: this.selectedTicket.createdDate, disabled: true}, Validators.required],
            description: [{value: this.selectedTicket.description, disabled: true}, Validators.required],
          });
        } else {
          await this.router.navigate(['/tickets']);
          this.toastr.warning(NOTIFICATION.TICKET_NOT_FOUND);
        }
      }),
      catchError(async error => {
        console.error(error);
        await this.router.navigate(['/tickets']);
        this.toastr.error(NOTIFICATION.TICKET_FETCHING_ERROR);
        return EMPTY;
      }),
      finalize((): void => {
        if (this.loader.getLoader('master')) this.loader.stop('master');
      }),
    ).subscribe();
  }

  openModalWithData(type: string, ticket?: TicketExt): void {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.data = {type, ticket};

    modalRef.result
      .then(async (result): Promise<void> => {
        switch (result.type) {
          case 'edit': {
            this.dataService.editTicket(result.ticket);
            this.selectedTicket = result.ticket;
            break;
          }
          case 'delete': {
            this.dataService.deleteTicket(result.ticket);
            await this.router.navigate(['/tickets']);
            break;
          }
        }
      })
      .catch(() => this.toastr.warning(NOTIFICATION.DONT_SAVE));
  }

}
