import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-done-trace',
  templateUrl: './done-trace.component.html',
  styleUrls: ['./done-trace.component.css']
})
export class DoneTraceComponent implements OnInit {
  @Input() listdata: any[] = [];
  listcolnames: any[] = [];

  constructor() {
  }

  ngOnInit() {
    this.listcolnames = [
      {Controlname: 'icon', Controltype: 'icon', icon: 'forward'},
      {Controlname: 'Taskname', Controltype: 'label'},
      {Controlname: 'Taskstarttime', Controltype: 'label'},
      {Controlname: 'Taskfinishtime', Controltype: 'label'},
      {Controlname: 'Taskstatus', Controltype: 'label'},
      {Controlname: 'Editor', Controltype: 'label'},
      {Controlname: 'Opinion', Controltype: 'label'}
    ];

  }

  edit(event) {
    console.log(event);
  }

}
