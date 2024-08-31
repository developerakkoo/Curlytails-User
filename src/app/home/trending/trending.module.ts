import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrendingPageRoutingModule } from './trending-routing.module';

import { TrendingPage } from './trending.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FilterPipeModule } from 'ngx-filter-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FilterPipeModule,
    TrendingPageRoutingModule
  ],
  declarations: [TrendingPage]
})
export class TrendingPageModule {}
