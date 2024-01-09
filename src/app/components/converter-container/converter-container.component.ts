import { Component } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Currency } from 'src/app/interfaces/currency';
import { CurrencyDataService } from 'src/app/services/currency-data.service';
import {FormsModule} from '@angular/forms';
import { Converted } from 'src/app/interfaces/converted';

@Component({
  selector: 'app-converter-container',
  templateUrl: './converter-container.component.html',
  styleUrls: ['./converter-container.component.scss'],
})
export class ConverterContainerComponent {
  private readonly convertInitVaue : Converted = {
    amount: 1, from: 'USD', to: 'ILS',
    result: 0, date: new Date(0),
  };
  public convertCurrencyGroup = new FormGroup({
    amount: new FormControl(this.convertInitVaue.amount, [Validators.max(9999999999999), Validators.min(1)]),
    from: new FormControl(this.convertInitVaue.from),
    to: new FormControl(this.convertInitVaue.to),
  })

  public currencies: Currency[] = [];
  public result : Converted | undefined;
  public isSubmittimg : boolean = false;

  constructor(private currencyDataService: CurrencyDataService) { }

  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies(): void {
    this.currencyDataService.getCurrencies()
    .subscribe((currencies:Currency[]) => this.currencies = currencies);
  }

  submitCurrency() {
    if(!this.isValidForm()) {
      return;
    }

    if(this.isSubmittimg) {
      return;
    }

    this.isSubmittimg = true;
    
    const converted : Converted = {...this.convertInitVaue, amount : this.convertCurrencyGroup.controls.amount.value || this.convertInitVaue.amount,
                                  to : this.convertCurrencyGroup.controls.from.value || this.convertInitVaue.from,
                                  from:  this.convertCurrencyGroup.controls.to.value || this.convertInitVaue.to};
    try {
      this.currencyDataService.convert(converted)
      .subscribe((convertResult : any) => {
        this.result = convertResult;
        this.resetSubmit();
      }, (error : any) => { this.resetSubmit();});
    }    
    
    catch(err : any) {
      this.resetSubmit();
    }

  }

  isValidForm() : boolean {
    let isValid = false;
    if(this.convertCurrencyGroup?.controls.amount.value && this.convertCurrencyGroup.valid) {
      isValid = true;
    }

    return isValid;
  }

  resetSubmit() : void {
    this.isSubmittimg = false;
    // setTimeout(() => {    this.isSubmittimg = false;
    // }
    // , 2000)
  }

  ngOnDestroy() {
    this.currencyDataService.saveConvertedData();
  }

}
