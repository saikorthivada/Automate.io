import { Component, OnInit } from '@angular/core';


class Note {
  id: string;
  title: string;
  description: string;
  constructor() {
    this.id = '';
    this.title = '';
    this.description = '';
  }
}
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  notesList: Note[] = [];

  selectedNotes: any;
  constructor() {
  }

  ngOnInit() {
    if (localStorage.getItem('notesList')) {
      this.notesList = JSON.parse(localStorage.getItem('notesList'));

    }
    this.selectedNotes = this.notesList[0];
  }

  selectedNotesFromSideNav(selectedObj) {
    this.selectedNotes = selectedObj;
  }

  removeCurrentNotes() {
    const currentSelectedNotesIndex = this.notesList.findIndex(obj => obj.id === this.selectedNotes.id);
    if (currentSelectedNotesIndex !== -1) {
      this.selectedNotes = this.notesList[currentSelectedNotesIndex + 1];
      this.notesList.splice(currentSelectedNotesIndex, 1);
      localStorage.setItem('notesList', JSON.stringify(this.notesList));
    }
  }

  // add notes
  addNotes(event) {
    if (event !== 'Cross click') {
      const obj = new Note();
      obj.title = event.title;
      obj.description = '';
      obj.id = (new Date().toISOString()).toString();
      this.notesList.unshift(obj);
      this.selectedNotes = obj;
      localStorage.setItem('notesList', JSON.stringify(this.notesList));
    }
  }

  updateNotes(updateEvent) {
    const index = this.notesList.findIndex(obj => obj.id === updateEvent.id);
    if (index !== -1) {
      this.notesList[index] = updateEvent;
      localStorage.setItem('notesList', JSON.stringify(this.notesList));
    }
  }
}
