import {Component, OnInit} from '@angular/core';
import {MasterService} from '../master.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  listdata: any[] = [];
  listcolnames: any[] = [];

  constructor(private ms: MasterService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.listcolnames = [
      {'Controlname': 'Postid', 'Controltype': 'textbox'},
      {'Controlname': 'Postname', 'Controltype': 'textbox'}
    ];
    this.ms.getpost().subscribe(response => {
      // console.log(response);

      this.listdata = response;
    });
  }

  savepost(event) {
    // console.log(event);
    console.log(this.listdata);
    if (event == 'save') {
      this.ms.savepost(this.listdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
    }
  }
}
