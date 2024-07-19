import { Component, Input } from '@angular/core';


function showMenuItemFunction(profiles: any) {

  if (profiles.length === 0) {
    return true;
  }

  // let profileArray = localStorage.getItem('profile')!.split(',');
  // let assignedProfile = profileArray![0];
  
  let assignedProfile = localStorage.getItem('profile');

  let found = profiles?.find((allowedProfile: string) => {
    // console.log(allowedProfile === assignedProfile);
    return allowedProfile === assignedProfile;
  })

  if (found) {
    return true;
  } else
    return false;
}

@Component({
  selector: 'app-sidebaritem',
  template: `<li class="nav-item" *ngFor="let mit of menuItems">
    <!-- <div *ngIf="showMenuItemFunction(mit.profile)"> -->

          <div>

    <app-sidebaritem-inner *ngIf="hasSubMenu(mit)" [menuItem]="mit"></app-sidebaritem-inner>
    <a [ngClass]="!isChildLink?'nav-link collapsed':''" [routerLink]="mit.link" *ngIf="!hasSubMenu(mit)">
          <i class="{{mit.icon}}"></i>
          <span>{{mit.title}}</span>
        </a>
    </div>
</li>`,
})
export class SidebaritemComponent {
  @Input("menuItems") menuItems:any;
  @Input("isChildLink") isChildLink?=false;
  active = false;
  constructor() { }

  hasSubMenu(mit:any){
    if(mit.hasOwnProperty('childs')){
      if(mit.childs.length){
        return true;
      }
    }
    return false;
  }

  protected readonly showMenuItemFunction = showMenuItemFunction;
}

@Component({
  selector: 'app-sidebaritem-inner',
  template: `

    <!-- <div *ngIf="showMenuItem(menuItem.profile)"> -->
          <div>
      <a class="nav-link collapsed" (click)="isCollapsed = !isCollapsed" href="javascript:void(0) ">
        <i class="{{menuItem.icon}}"></i>
        <span>{{menuItem.title}}</span>
        <i class="bi bi-chevron-down ms-auto" [ngClass]="isCollapsed?'bi-chevron-down':'bi-chevron-up'"></i>
      </a>
      <ul class="nav-content " [collapse]="isCollapsed" [isAnimated]="true">
        <app-sidebaritem [menuItems]="menuItem.childs" [isChildLink]="true"></app-sidebaritem>
      </ul>
    </div>
  `,
})
export class SidebaritemInnerComponent {
  @Input("menuItem") menuItem:any;
  @Input("isChildLink") isChildLink?=false;
  isCollapsed = true;
  active = false;
  constructor() { }


  protected readonly showMenuItem = showMenuItemFunction;
}


