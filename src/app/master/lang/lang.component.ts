import {Component, OnInit} from '@angular/core';
import {MasterService} from '../master.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.css']
})
export class LangComponent implements OnInit {
  queryitems: any[] = [];
  querydata: any = {};
  listdata: any[] = [];
  listcolnames: any[] = [];
  pageindex = 1;
  pagesize = 10;
  total = 1;
  loading = false;

  constructor(private ms: MasterService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.queryitems = [
      {'Controlname': 'Langid', 'Controltype': 'textbox'},
      {'Controlname': 'Langname', 'Controltype': 'textbox'}
    ];
    this.listcolnames = [
      {'Controlname': 'Langid', 'Controltype': 'textbox'},
      {'Controlname': 'Chinese', 'Controltype': 'textbox'},
      {'Controlname': 'Tchinese', 'Controltype': 'textbox'},
      {'Controlname': 'English', 'Controltype': 'textbox'},
      {'Controlname': 'Japanese', 'Controltype': 'textbox'}
    ];
    this.reset();
  }

  save(event) {
    // console.log(event);
    console.log(this.listdata);
    if (event == 'save') {
      this.ms.savelang(this.listdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
    }
    if (event == 'loadjson') {
      this.ms.loadlangjson(this.listdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
    }
    if (event == 'updatejson') {
      this.ms.updatelangjson(this.listdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
    }
  }

  getquery(event) {
    if (event == 'search') {
      this.loading = true;
      this.querydata.Pagesize = this.pagesize;
      this.ms.getlangbypageindex(this.querydata).subscribe(response => {
        this.listdata = response;
        this.loading = false;
      });
    } else {
      this.reset();
    }
  }
  refreshtable(event) {

    console.log(event);
    this.pageindex = event.Pageindex;
    this.pagesize = event.Pagesize;
    this.loading = true;
    this.querydata.Pageindex = this.pageindex;
    this.querydata.Pagesize = this.pagesize;
    console.log(this.querydata.Fiid);

    this.ms.getlangbypageindex(this.querydata).subscribe(data => {

      this.listdata = data;
      this.loading = false;
    });
  }
  reset() {
    this.querydata = {};
    this.loading = true;
    this.pageindex = 1;
    this.pagesize = 10;
    this.ms.getlangcount(this.querydata).subscribe(response => {
      this.total = response.Total;
    });
    this.refreshtable({'Pageindex': 1, 'Pagesize': 10});
  }

  formdatachange(event) {

  }
}
