import {Component, OnInit} from '@angular/core';
import {MasterService} from '../master.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-orgtype',
  templateUrl: './orgtype.component.html',
  styleUrls: ['./orgtype.component.css']
})
export class OrgtypeComponent implements OnInit {
  listdata: any[] = [];
  listcolnames: any[] = [];

  constructor(private ms: MasterService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.listcolnames = [
      {'Controlname': 'Orgtype', 'Controltype': 'textbox'},
      {'Controlname': 'Orgtypename', 'Controltype': 'textbox'}
    ];
    this.ms.getorgtype().subscribe(response => {
      // console.log(response);
      this.listdata = response;
    });
  }

  saveorgtype(event) {
    // console.log(event);
    console.log(this.listdata);
    if (event == 'save') {
      this.ms.saveorgtype(this.listdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
    }
  }
}
