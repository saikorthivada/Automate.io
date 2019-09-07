import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateNotesComponent } from './create-notes/create-notes.component';
@NgModule({
  declarations: [CreateNotesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    CreateNotesComponent
  ],
  entryComponents: [
    CreateNotesComponent
  ]
})
export class SharedModule { }
