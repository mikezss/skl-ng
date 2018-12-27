import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-todo-trace',
  templateUrl: './todo-trace.component.html',
  styleUrls: ['./todo-trace.component.css']
})
export class TodoTraceComponent implements OnInit {
  @Input() listdata: any[] = [];
  listcolnames: any[] = [];

  constructor() {
  }

  ngOnInit() {
    this.listcolnames = [
      {Controlname: 'icon', Controltype: 'icon', icon: 'clock-circle-o'},
      {Controlname: 'Taskname', Controltype: 'label'},
      {Controlname: 'Taskstarttime', Controltype: 'label'},
      {Controlname: 'Editor', Controltype: 'label'}
    ];

  }

  edit(event) {
    console.log(event);
  }

}
