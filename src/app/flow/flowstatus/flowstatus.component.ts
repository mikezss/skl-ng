import {Component, OnInit} from '@angular/core';
import {FlowService} from '../flow.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-flowstatus',
  templateUrl: './flowstatus.component.html',
  styleUrls: ['./flowstatus.component.css']
})
export class FlowstatusComponent implements OnInit {

  listdata: any[] = [];
  listcolnames: any[] = [];

  constructor(private fs: FlowService, private message: NzMessageService) {
  }


  ngOnInit() {
    this.listcolnames = [
      {'Controlname': 'Flowstatus', 'Controltype': 'textbox'},
      {'Controlname': 'Flowstatusname', 'Controltype': 'textbox'}
    ];
    this.fs.getflowstatus().subscribe(response => {
      this.listdata = response;
    });
  }

  save(event) {

    this.fs.saveflowstatus(this.listdata).subscribe(data => {
      this.message.info('submit==>' + data.status);
    });

  }

}
