import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from './countries/Country';
import { CountryDetail } from './country/country.component';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private COUNTRIES_URL = 'https://restcountries.com/v3.1/all';
  private COUNTRY_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

  constructor(private httpClient: HttpClient) {}

  public getCountriesList(): Observable<Country[]> {
    return this.httpClient.get(this.COUNTRIES_URL).pipe(
      map((data: []) =>
        data
          .map(
            (country: any) =>
              <Country>{
                name: country.name.official,
                commonName: country.name.common,
                capital: country.capital
                  ? country.capital[0]
                  : 'No capital to display',
                languages: country.languages
                  ? Object.values(country.languages).join(', ')
                  : 'No language to display',
                flag: country.flags.png,
                region: country.region,
                population: country.population,
                subregion: country.subregion || 'No region to display',
              }
          )
          .sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  }

  public getCountry(country: string): Observable<CountryDetail> {
    const url = this.COUNTRY_URL + country;
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (data: any) =>
            <CountryDetail>{ title: data.title, extract: data.extract }
        )
      );
  }
}
