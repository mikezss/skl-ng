import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {MasterService} from '../master.service';
import {LoginService} from '../../login/login.service';
import {
  NavigationExtras,
  Route,
  Router,
  ParamMap,
  ActivatedRoute
} from '@angular/router';
import {NzTreeNode} from 'ng-zorro-antd';

@Component({
  selector: 'app-enumsearch',
  templateUrl: './enumsearch.component.html',
  styleUrls: ['./enumsearch.component.css']
})
export class EnumsearchComponent implements OnInit {
  queryitems: any[] = [];
  querydata: any = {};
  listdata: any[] = [];
  listcolnames: any[] = [];
  pageindex = 1;
  pagesize = 10;
  total = 1;
  loading = false;

  constructor(private ls: LoginService, private ms: MasterService, private cs: MasterService, private message: NzMessageService, private router: ActivatedRoute, private router2: Router) {
  }

  ngOnInit() {
    this.queryitems = [{'Controlname': 'Enumcode', 'Controltype': 'textbox'},
      {'Controlname': 'Enumname', 'Controltype': 'textbox'}];
    this.listcolnames = [{'Controlname': 'Enumcode', 'Controltype': 'label'},
      {'Controlname': 'Enumname', 'Controltype': 'label'},
      {'Controlname': 'Edit', 'Controltype': 'linkAction'},
      {'Controlname': 'Delete', 'Controltype': 'popconfirm', 'poptitle': 'are you confirm to delete?'}
    ];

    this.cs.getenumsearchcount(this.querydata).subscribe(response => {
      this.total = response.Total;
    });
    this.refreshtable({'Pageindex': 1, 'Pagesize': 10});

  }

  getquery(event) {
    console.log(event);
    if (event == 'search') {
      this.loading = true;
      this.querydata.Pageindex = this.pageindex;
      this.querydata.Pagesize = this.pagesize;
      this.cs.getenumsearchcount(this.querydata).subscribe(response => {
        this.total = response.Total;
      });

      this.cs.getenumsearchbypageindex(this.querydata).subscribe(data => {
        let respons: any[] = [];
        respons = data;
        for (let data1 of respons) {
          data1.Routerlink = '/enum';
          data1.QueryParams = {'Mode': 's', 'Enumcode': data1.Enumcode};
          data1.Editable = true;
        }
        this.listdata = respons;
        this.loading = false;
      });
    } else {
      this.reset();
    }

  }

  edit(event) {
    console.log(event);
    if (event.colname == 'Edit') {
      this.router2.navigate(['/enum'], {queryParams: {'Mode': 'a', 'Enumcode': event.data.Enumcode}});
    } else {
      this.cs.deleteenumbyid({'Enumcode': event.data.Enumcode}).subscribe(data => {
        this.message.info('delete data==>' + data.status);
        if (data.status === 'ok') {
          this.listdata = this.listdata.filter(option => option.Enumcode !== event.data.Enumcode);

        }
      });
    }
  }

  refreshtable(event) {

    console.log(event);
    this.pageindex = event.Pageindex;
    this.pagesize = event.Pagesize;
    this.loading = true;
    this.querydata.Pageindex = this.pageindex;
    this.querydata.Pagesize = this.pagesize;


    this.cs.getenumsearchbypageindex(this.querydata).subscribe(data => {
      let respons: any[] = [];
      respons = data;
      for (let data1 of respons) {
        data1.Routerlink = '/enum';
        data1.QueryParams = {'Mode': 's', 'Enumcode': data1.Enumcode};
        data1.Editable = true;
      }
      this.listdata = respons;
      this.loading = false;
    });
  }

  reset() {
    this.querydata = {};
    this.listdata = [];
    this.loading = false;
    this.pageindex = 1;
    this.pagesize = 10;
    this.cs.getenumsearchcount(this.querydata).subscribe(response => {
      this.total = response.Total;
    });
    this.refreshtable({'Pageindex': 1, 'Pagesize': 10});
  }

  formdatachange(event) {
    console.log(event);
  }

  listdatachange(event) {

  }

}
