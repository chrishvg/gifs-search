import { CardListComponent } from './components/card-list/card-list.component';
import { CommonModule } from '@angular/common';
import { GiftCardComponent } from './components/gift-card/gift-card.component';
import { HomePageComponent } from './components/home/home-page.component';
import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CardListComponent,
    GiftCardComponent,
    HomePageComponent,
    SearchBoxComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class GifsModule { }
