import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from './popup.component';
import { PopupInfoService, IDataInfo } from './popup-info.service';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  modalRef: NgbModalRef;
  constructor(private modalService: NgbModal, private popupinfoService: PopupInfoService) { }

  openModal(
    inputData?: IDataInfo,
    backdropInput?: any,
    keyboardInput = true,
    sizeInput: any = 'lg',
    centeredInput: boolean = false) {
    this.popupinfoService.data = inputData;

    this.popupinfoService.modalRef = this.modalService.open(PopupComponent, {
      backdrop: backdropInput,
      keyboard: keyboardInput,
      size: sizeInput,
      centered: centeredInput
    });
    return this.popupinfoService.modalRef.result;
  }
}
