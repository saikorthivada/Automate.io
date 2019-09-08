import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateNotesComponent } from '../../shared/components/create-notes/create-notes.component';

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
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  removeCurrentNotesAction() {
    this.removeCurrentNotes.emit(true);
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
