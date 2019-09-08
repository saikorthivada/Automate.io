import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnChanges {
  @Input()
  selectedNotes: any;
  @Output()
  updateDescription: EventEmitter<any> = new EventEmitter();
  notes: any;
  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.selectedNotes);
    if (this.selectedNotes) {
      this.notes = JSON.parse(JSON.stringify(this.selectedNotes));
      this.changeDetector.detectChanges();
    } else {
      this.selectedNotes = {};
    }
  }
  updateDescriptionAction() {
    this.updateDescription.emit(this.notes);
  }
}
