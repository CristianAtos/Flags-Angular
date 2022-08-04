import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Country } from './Country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  public countries: Country[] = [];
  currentPage = 0;
  pageSize = 10;
  maxItems: number;
  selectedColumn = 'all';
  keyArray = [];
  isAscending = true;
  originalCountries: Country[] = [];
  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit() {
    this.httpService.getCountriesList().subscribe((data) => {
      this.countries = data;
      this.originalCountries = data;
      this.maxItems = data.length;
      this.keyArray = Object.keys(this.countries[0])
        .filter((el) => el != 'commonName')
        .sort((a, b) => b.localeCompare(a)); //['name', 'capital', 'region'...]
    });
  }

  open(country: string) {
    const countryRoute = country.toLowerCase().split(' ').join('-');
    this.router.navigate([countryRoute]);
  }

  sort() {
    this.isAscending = !this.isAscending;
    if (this.isAscending) {
      this.countries.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.countries.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  nextPage() {
    if (this.currentPage === this.getMaxPage()) return;
    this.currentPage++;
  }

  previousPage() {
    if (this.currentPage === 0) return;
    this.currentPage--;
  }

  getMaxPage() {
    return Math.ceil(this.maxItems / this.pageSize) - 1;
  }

  search(e) {
    if (!e.target.value || e.target.value.length < 3) {
      this.countries = this.originalCountries;
      this.maxItems = this.countries.length;
      return;
    }
    if (this.selectedColumn == 'all') {
      this.countries = this.originalCountries.filter((country) =>
        Object.values(country)
          .join(' ')
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
    } else {
      this.countries = this.originalCountries.filter((country) =>
        country[this.selectedColumn]
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
    }
    this.maxItems = this.countries.length;
  }
}
