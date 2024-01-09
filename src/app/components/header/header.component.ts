import { Component , ViewEncapsulation } from '@angular/core';
import { TABS } from '../../consts/consts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HeaderComponent {
    public tabs: any[] = [];
    public activeLink: any;
    
  ngOnInit() : void {
    if(TABS.length) {
      this.tabs = TABS;
    }
  }
}
