import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateNotesComponent } from '../../shared/create-notes/create-notes.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input()
  notesList: any = [];
  @Output()
  selectedNotes: EventEmitter<any> = new EventEmitter();
  @Output()
  updatedNotes: EventEmitter<any> = new EventEmitter();
  selectedIndex = 0;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.openNav();
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }

  // when user clicks on each notes
  notesSelectionChange(index, notes) {
    this.selectedIndex = index;
    this.selectedNotes.emit(notes);
  }

  // edit note title
  editNoteTitle(note) {
    console.log(note);
    const modalRef = this.modalService.open(CreateNotesComponent, {
      centered: true,
    });
    modalRef.componentInstance.data = note;
    modalRef.componentInstance.isEditMode = true;
    modalRef.result.then(res => {
      console.log(res);
      this.updatedNotes.emit(res);
    });
  }
}
