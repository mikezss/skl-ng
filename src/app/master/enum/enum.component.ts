import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UploadFile} from 'ng-zorro-antd';
import {NzMessageService} from 'ng-zorro-antd';
import {LoginService} from '../../login/login.service';
import {MasterService} from '../master.service';
import {
  NavigationExtras,
  Route,
  Router,
  ParamMap,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-enum',
  templateUrl: './enum.component.html',
  styleUrls: ['./enum.component.css']
})
export class EnumComponent implements OnInit {
  m = 'a';
  formcolnames: any[] = [];
  listcolnames: any[] = [];
  formdata: any = {};
  listdata: any[] = [];

  constructor(private cs: MasterService, private ls: LoginService, private ms: MasterService, private message: NzMessageService, private router: ActivatedRoute, private router2: Router) {
  }

  ngOnInit() {
    this.formcolnames = [{'Controlname': 'Enumcode', 'Controltype': 'textbox'},
      {'Controlname': 'Enumname', 'Controltype': 'textbox'}];
    this.listcolnames = [{'Controlname': 'Value', 'Controltype': 'textbox'},
      {'Controlname': 'Label', 'Controltype': 'textbox'}];

    this.router.queryParams.subscribe(params => {
        console.log(params);

        this.cs.getenumbyid({'enumcode': params.enumcode})
          .subscribe(data => {
            this.formdata = data;
          });
        this.cs.getenumitem({'enumcode': params.enumcode})
          .subscribe(data => {
            this.listdata = data;
          });
      }
    );

  }

  dosubmit(event) {
    if (event === 'query') {
      this.cs.getenumbyid({'enumcode': this.formdata.Enumcode})
        .subscribe(data => {
          if (data.status != 'false') {
            this.formdata = data;
          }

        });
      this.cs.getenumitem({'enumcode': this.formdata.Enumcode})
        .subscribe(data => {
          if (data != null) {
            this.listdata = data;
          }

        });
    } else {
      let navigationExtras: NavigationExtras = {
        queryParamsHandling: 'preserve',
        preserveFragment: true
      };
      this.cs.saveenum(this.formdata, this.listdata).subscribe(data => {
        console.log(data);
          this.message.info('submit==>' + data.status);
      });
    }
  }

  uploadcheck(event) {
    console.log(event);
    for (const colname of this.formcolnames) {
      if (colname.Controltype == 'upload') {
        if (event.size / 1024 > colname.filesize) {
          this.message.info('permitted file size is :' + colname.filesize);
          break;
        }

        if (colname.fileList.length < colname.limitfileqty) {
          colname.fileList.push(event);
          break;
        }
      }
    }

  }

  listdatachange(event) {
    console.log(event);
  }

  formdatachange(event) {
    console.log(event);

  }

}
