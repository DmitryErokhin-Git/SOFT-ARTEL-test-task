import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../shared/services/data.service';
import {TicketExt} from '../../shared/interfaces/interfaces';
import {combineLatest, firstValueFrom, map, of, skip, Subject, switchMap, take, takeUntil} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../../shared/components/modal/modal.component';
import {ToastrService} from 'ngx-toastr';
import {NOTIFICATION} from '../../shared/constants/constants';
import {AuthService} from "../../shared/services/auth.service";
import {AppState, routerStateSelector, ticketsSelector, userSelector} from "../../shared/store";
import {Store} from "@ngrx/store";
import {AppService} from "../../shared/services/app.service";

@Component({
  selector: 'tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit, OnDestroy {
  selectedRow: TicketExt | null = null;
  currentPage = 1;
  itemsPerPage = 10;
  formSearch: FormGroup = this.formBuilder.group({
    keyword: [null, Validators.required],
  });
  private unsubscribe$ = new Subject<void>();

  constructor(public dataService: DataService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              public toastr: ToastrService,
              protected authService: AuthService,
              private store: Store<AppState>,
              private appService: AppService) {
    this.dataService.loadTableData();
  }

  ngOnInit(): void {
    this.formSearch.valueChanges
      // .pipe(debounceTime(500))
      .subscribe(async filter => {
        await this.dataService.search(filter.keyword);
        await this.goTo(1);
      });

    combineLatest([
      this.store.select(routerStateSelector),
      this.store.select(ticketsSelector),
    ]).pipe(
      skip(1),
      take(1),
      takeUntil(this.unsubscribe$),
      switchMap(async ([params, tickets]) => {
        const page = params?.queryParams['page'];
        const totalPages: number = Math.ceil(tickets.length / this.itemsPerPage);

        if (!page || page <= 1 || this.appService.containsNonDigitCharacter(page) || !totalPages) {
          this.currentPage = 1;
          await this.goTo(1);
        } else if (totalPages < page) {
          this.currentPage = totalPages;
          await this.goTo(totalPages);
        } else {
          this.currentPage = page;
          await this.goTo(page);
        }
        return of(null);
      }),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // deleteTicket(ticket: TicketExt): void {
  //   this.detailsTicket(null);
  //   this.dataService.deleteTicket(ticket);
  // }

  detailsTicket(ticket: TicketExt | null): void {
    this.selectedRow = ticket;
  }

  clearSearch(): void {
    this.formSearch.setValue({keyword: ''});
  }

  async onPageChange(selectPage: number): Promise<void> {
    this.currentPage = selectPage;
    await this.goTo(this.currentPage);
  }

  async setItemsPerPage(limit: number, total: any): Promise<void> {
    this.itemsPerPage = limit;
    if (Math.ceil(total / this.itemsPerPage) < this.currentPage) {
      this.currentPage = Math.ceil(total / this.itemsPerPage);
      await this.goTo(this.currentPage);
    }
  }

  openModalWithData(type: string, ticket?: TicketExt): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.data = {type, ticket};

    modalRef.result
      .then(async (result): Promise<void> => {
        switch (result.type) {
          case 'add': {
            result.ticket.userId = await firstValueFrom(
              this.store.select(userSelector).pipe(
                map(user => user.id)
              )
            );
            this.dataService.addTicket(result.ticket);
            break;
          }
          // case 'edit': {
          //   this.dataService.editTicket(result.ticket);
          //   this.selectedRow = result.ticket;
          //   break;
          // }
          // case 'delete': {
          //   this.deleteTicket(result.ticket);
          //   break;
          // }
        }
      })
      .catch(() => this.toastr.warning(NOTIFICATION.DONT_SAVE),
      );
  }

  private async goTo(page: number): Promise<void> {
    await this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {page: page},
      queryParamsHandling: 'merge',
    });
  }

}
