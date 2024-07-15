import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VersionService } from '../shared/services/version.service';

@Component({
  selector: 'app-main',
  template: `
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <main id="main" class="main">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>

    <!-- <footer id="footer" class="footer mt-auto py-3">
      <div class="copyright">
        &copy; Copyright <strong><span>School Data Capture </span></strong>
        <span>Version: {{ version }}</span> All Rights Reserved
      </div>
    </footer> -->
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
  `,
})
export class DashboardLayoutComponent implements OnInit {
  version!: string;

  constructor(private versionService: VersionService) {}

  ngOnInit(): void {
    this.versionService.getVersion().subscribe({
      next: (data) => this.version = data.version,
      error: (err) => console.error('Error fetching version:', err)
    });
  }
}
