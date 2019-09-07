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
  constructor(private fromBuilder: FormBuilder, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.initForm();
  }

  //  create title form
  initForm() {
    this.notesForm = this.fromBuilder.group({
      title: ['', Validators.compose([Validators.required])]
    });
  }

  // create submission
  createNewNotes() {
    this.activeModal.close(this.notesForm.value);
  }
}
