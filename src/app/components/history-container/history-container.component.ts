import { Component, ViewChild } from '@angular/core';
import { CurrencyDataService } from 'src/app/services/currency-data.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Converted } from 'src/app/interfaces/converted';

@Component({
  selector: 'app-history-container',
  templateUrl: './history-container.component.html',
  styleUrls: ['./history-container.component.scss']
})
export class HistoryContainerComponent {
  public readonly displayedColumns: string[] = ['time', 'amount', 'from', 'to', 'result'];
  public dataSource = new MatTableDataSource<Converted>(this.currencyDataService.convertedList);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(public currencyDataService: CurrencyDataService) { }

  ngAfterViewInit() {
    if(this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
