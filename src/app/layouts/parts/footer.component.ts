import { Component, OnInit } from '@angular/core';
import { VersionService } from 'src/app/shared/services/version.service';

@Component({
  selector: 'app-footer',
  template: `
    <footer id="footer" class="footer mt-auto py-3">
      <div class="copyright">Copyright
        &copy; 2024 <strong><span> EduVOD Africa Ltd | Kenya. </span></strong>
        <span class="p-1">Version: {{ version }}</span> <strong> All Rights Reserved</strong>
      </div>
    </footer>
  `,
})
export class FooterComponent implements OnInit {
  version!: string;

  constructor(private versionService: VersionService) {}
  ngOnInit(): void {
    this.versionService.getVersion().subscribe({
      next: (data) => this.version = data.version,
      error: (err) => console.error('Error fetching version:', err)
    });
  }
}
