import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-trace-header',
  templateUrl: './trace-header.component.html',
  styleUrls: ['./trace-header.component.css']
})
export class TraceHeaderComponent implements OnInit {
  @Input() taskdata: any[] = [];
  today = Date.now();

  constructor() {
  }

  ngOnInit() {
    console.log(this.today);

  }

  print() {
    console.log('print');
  }

}
