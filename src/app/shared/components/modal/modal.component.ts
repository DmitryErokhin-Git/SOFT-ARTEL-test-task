import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {TicketExt} from '../../interfaces/interfaces';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {STATUS_LIST, TEXT_MODAL} from '../../constants/constants';
import {AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgIf, ReactiveFormsModule, AsyncPipe, NgForOf],
})
export class ModalComponent implements OnInit {
  @Input() data!: { type: string, ticket: TicketExt };
  formTicket!: FormGroup;
  titleModal = '';
  buttonText = '';
  protected readonly TEXT_MODAL = TEXT_MODAL;
  protected readonly STATUS_LIST = STATUS_LIST;


  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    switch (this.data.type) {
      case 'add': {
        this.formTicket = this.formBuilder.group({
          status: ['', Validators.required],
          createdDate: ['', Validators.required],
          description: ['', Validators.required],
        });
        this.titleModal = TEXT_MODAL.add.titleModal;
        this.buttonText = TEXT_MODAL.add.buttonText;
        break;
      }
      case 'edit': {
        this.formTicket = this.formBuilder.group({
          id: [this.data.ticket.id, Validators.required],
          status: [this.data.ticket.status, Validators.required],
          createdDate: [this.data.ticket.createdDate, Validators.required],
          description: [this.data.ticket.description, Validators.required],
        });
        this.titleModal = TEXT_MODAL.edit.titleModal;
        this.buttonText = TEXT_MODAL.edit.buttonText;
        break;
      }
      case 'delete': {
        this.titleModal = TEXT_MODAL.delete.titleModal;
        this.buttonText = TEXT_MODAL.delete.buttonText;
        break;
      }
    }

  }

  areObjectsEqual(objA: any, objB: any): boolean {
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
  }

}
