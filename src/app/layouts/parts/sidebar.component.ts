import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  template: ` <aside
    id="sidebar"
    class="sidebar mt-4"
    style="  background: #004889"
  >
    <div class="d-flex justify-content-between align-items-center w-auto ">
      <img
        class="image-rounded pt-2"
        src="assets/img/white-eduvod-logo.png"
        alt=""
        width="50%"
      />
      <div class="logo pt-2 text-center mx-auto">
        <!-- <span class="text-center" style="color: white">Data Caputure</span> -->
      </div>
    </div>
    <ul class="sidebar-nav" id="sidebar-nav">
      <app-sidebaritem [menuItems]="menuItems"></app-sidebaritem>
    </ul>
  </aside>`,
})
export class SidebarComponent implements OnInit {
  menuItems: any = [];

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.menuItems = [
      {
        title: 'Dashboard',
        link: '',
        icon: 'bi bi-grid',
        profile: ['ROLE_SUPER-ADMIN', , 'ROLE_PARTNER'],
      },

      {
        title: 'Schools',
        link: '/schools/list-schools',
        icon: 'bi bi-buildings',
        profile: ['ROLE_SUPER-ADMIN', 'ROLE_PARTNER'],
      },
      {
        title: 'Admins',
        link: '/system-admin/list-admins',
        icon: 'bi bi-person-fill-lock',
        profile: ['ROLE_SUPER-ADMIN'],
      },
      {
        title: 'Agents',
        link: '/agents/list-agents',
        icon: 'bi bi-person-lines-fill',
        profile: ['ROLE_SUPER-ADMIN'],
      },
      {
        title: 'Partners',
        link: '/partners/list-partners',
        icon: 'bi bi-people',
        profile: ['ROLE_SUPER-ADMIN'],
      },
      // {
      //   title: 'System Users',
      //   link: '/system-admin/all-system-users',
      //   icon: 'bi bi-person-fill-lock',
      //   profile: ['ROLE_SUPER-ADMIN'],
      // },
      {
        title: 'School Curriculum',
        link: '/school-curriculum',
        icon: 'bi bi-person-fill-lock',
        profile: ['ROLE_SUPER-ADMIN'],
      },

      // {
      //   title: 'Profile',
      //   link: '',
      //   icon: 'bi bi-person',
      //   profile: ['ROLE_SUPER-ADMIN'],
      //   childs: [
      //     {
      //       title: 'Profiles',
      //       link: '/rbac/list-profiles',
      //       profile: ['ROLE_SUPER-ADMIN'],
      //     },
      //     {
      //       title: 'Roles',
      //       link: '/rbac/list-roles',
      //       profile: ['ROLE_SUPER-ADMIN'],
      //     },
      //   ],
      // },

      // {
      //   title: 'Reports',
      //   link: 'reports',
      //   icon: 'bi bi-receipt',
      //   profile: ['ROLE_SUPER-ADMIN', 'ROLE_PARTNER'],
      //   childs: [
      //     {
      //       title: 'Schools Report',
      //       link: 'reports/schools',

      //       profile: ['ROLE_SUPER-ADMIN', 'ROLE_PARTNER'],
      //     },
      //     {
      //       title: 'Agents Report',
      //       link: 'reports',

      //       profile: ['ROLE_SUPER-ADMIN'],
      //     },
      //     {
      //       title: 'Partner Report',
      //       link: 'reports/partners',
      //       profile: ['ROLE_SUPER-ADMIN'],
      //     },
      //     {
      //       title: 'Admins Report',
      //       link: 'reports/admins',

      //       profile: ['ROLE_SUPER-ADMIN'],
      //     },

      //     {
      //       title: 'Audit-trial',
      //       link: 'reports/audit-trail',
      //       profile: ['ROLE_SUPER-ADMIN'],
      //     },
      //   ],
      // },

      // {
      //   title: 'Settings',
      //   icon: 'bi-gear-wide-connected',
      //   link: '',
      //   profile: ['ROLE_SUPER-ADMIN'],
      //   childs: [
      //     {
      //       title: 'Counties & Sub-Counties',
      //       link: '/settings/counties',

      //       profile: ['ROLE_SUPER-ADMIN'],
      //     },
      //     {
      //       title: 'Schools settings',
      //       link: '/settings/schools',

      //       profile: ['ROLE_SUPER-ADMIN'],
      //     },

      //     {
      //       title: 'Documents Settings',
      //       link: '/settings/documents',

      //       profile: ['ROLE_SUPER-ADMIN'],
      //     },
      //     {
      //       title: 'Manage Unauthorized Password',
      //       link: '/settings/passwords',

      //       profile: ['ROLE_SUPER-ADMIN'],
      //     },
      //   ],
      // },
      // End
    ];
  }

  toggleSidebar() {
    const kl = 'toggle-sidebar';
    if (this.document.body.classList.contains(kl)) {
      this.document.body.classList.remove(kl);
    } else {
      this.document.body.classList.add(kl);
    }
  }
}
