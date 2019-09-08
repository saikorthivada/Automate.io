import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateNotesComponent } from '../../shared/components/create-notes/create-notes.component';
import { PopupService } from '../../shared/services/popup/popup.service';
import { DIALOG_TYPE } from '../../shared/enums/popup-enum';
import { IDataInfo } from '../../shared/services/popup/popup-info.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Output()
  removeCurrentNotes: EventEmitter<any> = new EventEmitter();
  @Output()
  addNotes: EventEmitter<any> = new EventEmitter();
  @Output()
  searchAction: EventEmitter<any> = new EventEmitter();
  searchValue = '';
  constructor(private modalService: NgbModal, private popupService: PopupService) { }

  ngOnInit() {
  }
  removeCurrentNotesAction() {
    const data: IDataInfo = {
      cancelButtonLabel: 'Cancel',
      dialog_type: DIALOG_TYPE.CONFIMATION_DIALOG,
      okButtonLabel: 'OK',
      message: 'Do you want to delete Current Note',
      title: 'Delete Confirmation'
    };
    const modelRef = this.popupService.openModal(data, 'static', false, 'sm', true);
    modelRef.then(res => {
      console.log(res);
      if (res === 'submit') {
        this.removeCurrentNotes.emit(true);
      }
    });

    // this.removeCurrentNotes.emit(true);
  }

  // adding new notes
  addNotesAction() {
    const modalRef = this.modalService.open(CreateNotesComponent, {
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
    modalRef.result.then(res => {
      this.addNotes.emit(res);
    });
  }

  // search emitter
  searchData() {
    this.searchAction.emit(this.searchValue);
  }
}
