import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductComponent } from 'src/app/components/product/product.component';
import { ProductCartComponent } from 'src/app/components/product-cart/product-cart.component';
import { ProfileCardComponent } from 'src/app/components/profile-card/profile-card.component';



@NgModule({
  declarations: [ProductComponent,ProductCartComponent,ProfileCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[ProductComponent,ProductCartComponent,ProfileCardComponent]
})
export class SharedModule { }
