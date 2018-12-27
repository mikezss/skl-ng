import {Component, OnInit} from '@angular/core';
import {MasterService} from '../master.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-orgvary',
  templateUrl: './orgvary.component.html',
  styleUrls: ['./orgvary.component.css']
})
export class OrgvaryComponent implements OnInit {
  listdata: any[] = [];
  listcolnames: any[] = [];

  constructor(private ms: MasterService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.listcolnames = [
      {'Controlname': 'Vid', 'Controltype': 'textbox'},
      {'Controlname': 'Vname', 'Controltype': 'textbox'},
      {'Controlname': 'Defaultvalue', 'Controltype': 'textbox'}
    ];
    this.ms.getorgvary().subscribe(response => {
      this.listdata = response;
    });
  }

  save(event) {
    if (event == 'save') {
      this.ms.saveorgvary(this.listdata).subscribe(data => {
        this.message.info('submit==>' + data.status);
      });
    }
  }
}
