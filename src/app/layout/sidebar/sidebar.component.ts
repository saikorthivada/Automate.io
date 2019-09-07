import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  selectedIndex = 0;
  constructor() { }

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
}
