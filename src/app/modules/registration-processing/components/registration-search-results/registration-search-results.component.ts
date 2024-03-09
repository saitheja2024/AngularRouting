import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RegistrationService } from 'src/app/modules/chinmaya-shared/services/registration-processing/registration.service';

@Component({
  selector: 'app-registration-search-results',
  templateUrl: './registration-search-results.component.html',
  styleUrls: ['./registration-search-results.component.scss']
})
export class RegistrationSearchResultsComponent {
  searchCriteria: any;
  searchResults: any;

  ELEMENT_DATA:any = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  constructor(private registrationService:RegistrationService){}

  ngOnInit(){

    this.searchCriteria = this.registrationService.getSearchCriteria();

    this.performSearch();
  }

  async performSearch(){

    this.searchResults = this.registrationService.fetchRegistrationDetailsBasedOnSearch(this.searchCriteria)

  }


}
