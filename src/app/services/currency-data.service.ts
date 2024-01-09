import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Currency } from '../interfaces/currency';
import { Converted } from 'src/app/interfaces/converted';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyDataService {

  private readonly host = 'https://api.frankfurter.app';
  public convertedList: Converted[] = [];

  constructor(private http: HttpClient) {
      this.getConvertedList();
  }

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.host}/currencies`).pipe(
      map(data => {
      const currencies : Currency[]= Object.keys(data).map((key:string) =>{
        return {currency: key};
      });
      return currencies;
  }),
    catchError((err) => {
      return throwError(err); 
    })); 
  }

  convert(toConvert : Converted): Observable<any> {
    return this.http.get<any>(`${this.host}/latest?amount=${toConvert.amount}&from=${toConvert.from}&to=${toConvert.to}`).pipe(
      map(data => {
      const resultAmount : any = Object.values(data?.rates).map((value : any) =>{
        return {value};
      });
      const convertResult = {...toConvert,result: resultAmount[0].value, date: new Date()};
      this.convertedList.push(convertResult);
      return convertResult;
  }),
    catchError((err) => {
      return throwError(err);
    })); 
  }

  saveConvertedData(): void {
    let storedConvertedArray = localStorage.getItem('convertedList');
    let storedArray = [];

    if(storedConvertedArray) {
      storedArray = JSON.parse(localStorage.getItem('convertedList') || '');
    }
    if(storedArray !== this.convertedList) {
      try {
        localStorage.setItem("convertedList", JSON.stringify(this.convertedList));
      }

      catch (err) {
        console.error('unable to save conversion - too many conversions or unable to access, try clearing your localstorage or allowing access in browser', err)
      }
    }
  }

  getConvertedList() : void{
    if(localStorage.getItem('convertedList')) {
      this.convertedList = JSON.parse(localStorage.getItem('convertedList') || '');
    }
  }

}
