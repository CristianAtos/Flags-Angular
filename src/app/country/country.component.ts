import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

export interface CountryDetail {
  title: string;
  extract: string;
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  country: CountryDetail;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    const countryRoute = this.route.snapshot.params.country;
    this.httpService
      .getCountry(countryRoute.split('-').join('_'))
      .subscribe((country) => (this.country = country));
  }

}

