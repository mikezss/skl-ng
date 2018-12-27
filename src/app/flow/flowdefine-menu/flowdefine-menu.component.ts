import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-flowdefine-menu',
  templateUrl: './flowdefine-menu.component.html',
  styleUrls: ['./flowdefine-menu.component.css']
})
export class FlowdefineMenuComponent implements OnInit {
  @Input() flowdefinename: string;
  @Input() menudata: any[] = [];
  @Output() action: EventEmitter<any>;

  constructor(public translate: TranslateService) {
    this.action = new EventEmitter();
  }

  ngOnInit() {
    // this.flowdefinename="expense";


  }

  dotask(menu) {
    this.action.emit(menu);
  }

  addtask(tasktype) {
    let mandata = {
      'Tasktype': 'man', 'Taskid': '', 'Taskname': '', 'Supportskip': '', 'Sendmessage': '', 'Nothing': '', 'Countersign': '', 'Split': '',
      'Samepersontask': '', 'Nopersontask': '', 'actiondata': [], 'executerdata': []
    };
    let switchdata = {
      'Tasktype': 'switch', 'Taskid': '', 'Taskname': '', 'Supportskip': '', 'Sendmessage': '', 'actiondata': []
    };
    if (tasktype == 'man') {
      this.menudata.push(mandata);
    }
    if (tasktype == 'switch') {
      this.menudata.push(switchdata);
    }


  }

  outputheader(menu): string {
    // <span title (click)="dotask(menu)"><i *ngIf="menu.Tasktype=='man'" class="anticon anticon-user"></i>
    // <i *ngIf="menu.Tasktype=='switch'" class="anticon anticon-share-alt"></i>
    // {{menu.Taskid}} {{menu.Taskname}} <- {{menu.Lasttaskid}}</span>

    let header = '';
    header = menu.Taskid + ' ' + menu.Taskname + '<-' + menu.Lasttaskid;
    return header;
  }

  outputheaderstyle(menu) {
    return {
      'background': '#f7f7f7',
      'border-radius': '4px',
      'margin-bottom': '0px',
      'border': '0px'
    };
  }


}
