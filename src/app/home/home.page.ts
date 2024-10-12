import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSlides, ModalController } from '@ionic/angular';
import { SharedService } from '../services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SearchPage } from '../search/search.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  swiperModules = [IonicSlides];
  products:any[] = [];
  banners:any[] = [];
  categories:any[] = [];

  getProductSub$!: Subscription;
  getBannerSub$!: Subscription;
  getCategoriesSub$!: Subscription;
  constructor(private router:Router,
              private shared:SharedService,
              private modalController: ModalController
  ) {}

  ionViewDidEnter(){
    this.getAllProducts();
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getAllProducts();
      event.target.complete();
    }, 2000);
  }
  getAllProducts(){
    this.shared.getAllProducts().subscribe({
      next:async(products:any) =>{
        console.log(products);
        this.products = products['data'];
    this.getAllBanner();
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }


  getAllBanner(){
    this.shared.getAllBanner()
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.banners = value['data'];
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

  openNotifications(){

  }

  openPetPage(){
    this.router.navigate(['tabs','tabnav','home','trending']);
  }

  async openSearchModal() {
    console.log('saerch');

    const modal = await this.modalController.create({
      component: SearchPage,
      mode: 'ios',
      animated: true,
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    console.log(data);
  }

  addToCart(ev:any){
    console.log(ev.productId);
    console.log(ev.type.size);
    this.router.navigate(['details',ev.productId]);
   
  }
}
