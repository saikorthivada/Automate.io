import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {
  notesForm: FormGroup;
  data: any;
  isEditMode = false;
  constructor(private fromBuilder: FormBuilder, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.initForm();
    if (this.isEditMode) {
      this.setFormData();
    }
  }

  // edit mode info setting
  setFormData() {
    this.data.id = new Date().toISOString().toString();
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
    this.activeModal.close(this.notesForm.value);
  }
}
