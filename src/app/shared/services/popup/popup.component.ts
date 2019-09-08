import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupInfoService, IDataInfo } from './popup-info.service';
import { Router } from '@angular/router';
import { POPUP, DIALOG_TYPE, CLICK_STATUS } from '../../enums/popup-enum';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  popupObtainedInfo: IDataInfo;
  POPUPENUM = POPUP;
  DIALOG_TYPE = DIALOG_TYPE;
  constructor(public activeModal: NgbActiveModal, private popupInfoService: PopupInfoService, private router: Router) {
    this.popupObtainedInfo = this.popupInfoService.data;
  }

  ngOnInit() {
  }

  submit() {
    this.activeModal.close(CLICK_STATUS.SUBMIT_BUTTON);
  }

  cancel() {
    this.activeModal.close(CLICK_STATUS.CANCEL_BUTTON);
  }

  navigateToSpecified(route) {
    this.activeModal.close(CLICK_STATUS.AUTO_CLOSE);
    this.router.navigate(route);
  }
}
