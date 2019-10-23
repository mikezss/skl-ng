import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import {ComponentPortal, Portal, TemplatePortal} from '@angular/cdk/portal';
import {ModualComponent} from '../../master/modual/modual.component';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  @ViewChild('templatePortalContent', { static: true }) templatePortalContent: TemplateRef<any>;
  selectedPortal: Portal<any>;
  selectedPortal2: Portal<any>;
  href: SafeResourceUrl;
  constructor(private _viewContainerRef: ViewContainerRef, private  domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.selectedPortal2 = new TemplatePortal(this.templatePortalContent, this._viewContainerRef);
    this.selectedPortal = new ComponentPortal(ModualComponent);
    this.href = this.domSanitizer.bypassSecurityTrustResourceUrl('http://192.168.252.180:4200');
  }

}
