import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateNotesComponent } from './components/create-notes/create-notes.component';
import { PopupModule } from './services/popup/popup.module';
@NgModule({
  declarations: [CreateNotesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PopupModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    CreateNotesComponent,
    PopupModule
  ],
  entryComponents: [
    CreateNotesComponent
  ]
})
export class SharedModule { }
