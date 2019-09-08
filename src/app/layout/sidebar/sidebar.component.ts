import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateNotesComponent } from '../../shared/components/create-notes/create-notes.component';

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
  @Input()
  selectedNote: any;
  isSideNavOpen = false;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width = event.target.innerWidth;
    this.resizeWindow(width);
  }
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.openNav();
  }

  resizeWindow(width) {
    if (width < 768) {
      this.closeNav();
    } else {
      this.openNav();
    }
  }

  changeNav() {
    if (this.isSideNavOpen) {
      this.closeNav();
    } else {
      this.openNav();
    }
  }
  openNav() {
    this.isSideNavOpen = true;
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }

  closeNav() {
    this.isSideNavOpen = false;
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }

  // when user clicks on each notes
  notesSelectionChange(index, notes) {
    this.selectedNote = notes;
    this.selectedNotes.emit(notes);
  }

  // edit note title
  editNoteTitle(note) {
    if (note && note.description === undefined) {
      note.description = '';
    }
    const modalRef = this.modalService.open(CreateNotesComponent, {
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
    modalRef.componentInstance.data = note;
    modalRef.componentInstance.isEditMode = true;
    modalRef.result.then(res => {
      this.updatedNotes.emit(res);
    });
  }
}
