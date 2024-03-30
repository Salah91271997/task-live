import { Component } from '@angular/core';
import { JsonData } from '../../interfaces/json-to-table';
import { JsonToTableService } from '../../services/json-to-table.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TableFilterPipe } from '../../pipes/table-filter.pipe';
export interface FilterCriteria {
  [key: string]: string | number | boolean; // Flexible filter value types
}
@Component({
  selector: 'app-json-table',
  templateUrl: './json-table.component.html',
  styleUrls: ['./json-table.component.scss'],
  providers: [TableFilterPipe],
})
export class JsonTableComponent {
  jsonData: JsonData[] = [];
  displayedColumns: string[] = [];
  filterForm: FormGroup = this.fb.group({});
  filterCriteria: { key: string; value: string }[] = [];
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 20]; // Page size options
  currentPage: number = 0; // Current page index
  pages: number[] = [];

  constructor(
    private jsonToTableService: JsonToTableService,
    private fb: FormBuilder,
    private tableFilterPipe: TableFilterPipe
  ) {}

  ngOnInit() {
    this.filterForm = this.fb.group({});
    this.jsonToTableService.jsonData$.subscribe((data) => {
      this.jsonData = data;
      this.updateTable();
      this.calculatePages(); // Calculate pages when data changes
    });
  }

  updateTable() {
    this.displayedColumns = Object.keys(this.jsonData[0] || {});

    this.createForm(); // Create form controls dynamically
  }

  createForm() {
    const formControls: { [key: string]: FormControl } = {};
    for (const col of this.displayedColumns) {
      formControls[col] = this.fb.control('');
    }
    this.filterForm = this.fb.group(formControls);
  }
  columnsDifference(columns1: string[], columns2: string[]): string[] {
    return columns1.filter((col) => !columns2.includes(col));
  }

  addFilter() {
    // check the current columns in the form and add the next column that is not in the form already
    const columnsInForm = Object.keys(this.filterForm.controls);
    const columnsInTable = this.displayedColumns;

    const availableColumns = this.columnsDifference(
      columnsInForm,
      columnsInTable
    );
    if (availableColumns.length === 0) {
      return;
    }
    this.displayedColumns.push(availableColumns[0]);
  }

  removeFilter(col: string) {
    if (this.displayedColumns.length === 1) {
      return;
    }
    if (
      this.filterForm.contains(col) &&
      Object.keys(this.filterForm.controls).length > 1
    ) {
      // this.filterForm.removeControl(col)
      const colIndex = this.displayedColumns.indexOf(col); // Find column index
      if (colIndex !== -1) {
        this.displayedColumns.splice(colIndex, 1); // Remove column from displayedColumns
      }
    }
  }

  applyFilters() {
    this.filterCriteria = [];
    for (const key in this.filterForm.value) {
      if (this.filterForm.value[key]) {
        this.filterCriteria.push({ key, value: this.filterForm.value[key] });
      }
    }
    this.currentPage = 0;
    this.calculatePages();
  }
  clearAllFilters() {
    this.filterForm.reset(); // Resets all form controls to their initial values (empty)
  }

  // Method to handle page change event
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
  }

  // Method to calculate page numbers
  calculatePages(): void {
    const filteredData = this.jsonData.filter(
      (item) =>
        this.tableFilterPipe.transform([item], this.filterCriteria).length > 0
    );
    const pageCount = Math.ceil(filteredData.length / this.pageSize);
    this.pages = Array.from({ length: pageCount }, (_, i) => i);
  }

  // Method to navigate to a specific page
  goToPage(page: number): void {
    this.currentPage = page;
  }

  // Method to get paginated data
  getPaginatedData(): any[] {
    const filteredData = this.jsonData.filter(
      (item) =>
        this.tableFilterPipe.transform([item], this.filterCriteria).length > 0
    );

    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filteredData.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
    }
  }
}
