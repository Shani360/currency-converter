import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterContainerComponent } from './components/converter-container/converter-container.component';
import { HistoryContainerComponent } from './components/history-container/history-container.component';

const routes: Routes = [
  { path: '', redirectTo: '/converter', pathMatch: 'full' },
  { path: 'converter', component:  ConverterContainerComponent},
  { path: 'history', component:  HistoryContainerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
