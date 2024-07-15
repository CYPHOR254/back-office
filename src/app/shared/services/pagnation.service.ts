// pagination.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private currentPage = 1;
  private pageSize = 30;

  constructor() {}

  setPage(page: number): void {
    this.currentPage = page;
  }

  setPageSize(size: number): void {
    this.pageSize = size;
  }

  getPage(): number {
    return this.currentPage;
  }

  getPageSize(): number {
    return this.pageSize;
  }

  paginate(data: any[], currentPage: number, pageSize: number): Observable<any[]> {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = data.slice(startIndex, endIndex);
    return of(paginatedItems);
  }
}
