import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { LOCAL_STORAGE } from '../shared/enums/local-storage.enum';
import { CustomSearchService } from '../shared/services/customSearch/custom-search.service';


class Note {
  id: string;
  title: string;
  description: string;
  date: Date;
  constructor() {
    this.id = '';
    this.title = '';
    this.description = '';
    this.date = new Date();
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
  constructor(private storageService: StorageService, private changeDetector: ChangeDetectorRef, private searchService: CustomSearchService) {
  }

  ngOnInit() {
    if (localStorage.getItem('notesList')) {
      this.notesList = this.storageService.getLocalStorageItem(LOCAL_STORAGE.NOTES_LIST);
    }
    this.selectedNotes = this.notesList[0];
  }

  // ON CLICKING ON THE SIDENAV NOTES
  selectedNotesFromSideNav(selectedObj) {
    this.selectedNotes = selectedObj;
  }

  // WHEN USER CLICKS ON REMOVE NOTES
  removeCurrentNotes(ev) {
    const currentSelectedNotesIndex = this.notesList.findIndex(obj => obj.id === this.selectedNotes.id);
    if (currentSelectedNotesIndex !== -1) {
      this.notesList.splice(currentSelectedNotesIndex, 1);
      if (this.notesList.length <= 0) {
        this.notesList = [];
        this.selectedNotes = {};
      } else {
        this.selectedNotes = this.notesList[currentSelectedNotesIndex];
      }
      this.storageService.setLocalStorageItem(LOCAL_STORAGE.NOTES_LIST, this.notesList);
    } else {
      this.selectedNotes = {};
      this.notesList = [];
    }
  }

  // add notes
  addNotes(event) {
    if (event !== 'Cross click') {
      const obj = new Note();
      obj.title = event.title;
      obj.description = '';
      obj.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      this.notesList.unshift(obj);
      this.selectedNotes = obj;
      this.storageService.setLocalStorageItem(LOCAL_STORAGE.NOTES_LIST, this.notesList);
    }
  }

  updateNotes(updateEvent) {
    const index = this.notesList.findIndex(obj => obj.id === updateEvent.id);
    if (index !== -1) {
      updateEvent.date = new Date();
      this.notesList[index] = updateEvent;
      this.selectedNotes = this.notesList[index];
      this.storageService.setLocalStorageItem(LOCAL_STORAGE.NOTES_LIST, this.notesList);
      this.notesList = this.storageService.getLocalStorageItem(LOCAL_STORAGE.NOTES_LIST);
    }
  }

  search(event) {
    this.notesList = this.searchService.searchFilterArrayOfJson(this.storageService.getLocalStorageItem(LOCAL_STORAGE.NOTES_LIST), event, ['title', 'description'], 'id');
    if (this.notesList.length <= 0) {
      this.notesList = [];
      this.selectedNotes = {};
    } else {
      this.selectedNotes = this.notesList[0];
    }
  }
}
