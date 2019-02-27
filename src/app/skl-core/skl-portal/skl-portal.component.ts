import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ComponentPortal, Portal, TemplatePortal} from '@angular/cdk/portal';

@Component({
  selector: 'app-skl-portal',
  templateUrl: './skl-portal.component.html',
  styleUrls: ['./skl-portal.component.css']
})
export class SklPortalComponent implements OnInit {
  @Input() isAttached = false;
  @Input() ngutter = 40;
  @Input() ncount = 4;
  @Input() portletdata: any[] = [];
  constructor() { }

  ngOnInit() {
  }

}
