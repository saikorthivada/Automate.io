import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../services/storage.service';
import { LOCAL_STORAGE } from '../../enums/local-storage.enum';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {
  notesForm: FormGroup;
  data: any;
  isEditMode = false;
  duplicateErrorMessage = false;
  constructor(private fromBuilder: FormBuilder, public activeModal: NgbActiveModal, private storageService: StorageService) {
  }

  ngOnInit() {
    this.initForm();
    if (this.isEditMode) {
      this.setFormData();
    }
  }

  // edit mode info setting
  setFormData() {
    this.notesForm.patchValue(this.data);
  }
  //  create title form
  initForm() {
    this.notesForm = this.fromBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      id: [''],
      description: ['']
    });
  }

  // create submission
  createOrEditNewNotes() {
    this.duplicateErrorMessage = false;
    const list = this.storageService.getLocalStorageItem(LOCAL_STORAGE.NOTES_LIST);
    if (list.length > 0) {
      if (this.isEditMode) {
        const selectedIndex = list.findIndex(obj => obj.id === this.data.id);
        if (selectedIndex !== -1) {
          list.splice(selectedIndex, 1);
        }
      }
      const duplicateIndex = list.findIndex(obj => obj.title === this.notesForm.get('title').value);
      if (duplicateIndex !== -1) {
        this.duplicateErrorMessage = true;
        return;
      }
    }
    this.activeModal.close(this.notesForm.value);
  }
}
