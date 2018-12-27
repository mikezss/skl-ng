import {Component, OnInit} from '@angular/core';
import {MasterService} from '../master.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.css']
})
export class DegreeComponent implements OnInit {
  listdata: any[] = [];
  listcolnames: any[] = [];

  constructor(private ms: MasterService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.listcolnames = [
      {'Controlname': 'Degree', 'Controltype': 'textbox'},
      {'Controlname': 'Degreename', 'Controltype': 'textbox'}
    ];
    this.ms.getdegree().subscribe(response => {
      // console.log(response);

      this.listdata = response;
    });
  }

  savedegree(event) {
    // console.log(event);
    console.log(this.listdata);
    if (event == 'save') {
      this.ms.savedegree(this.listdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
    }
  }
}
