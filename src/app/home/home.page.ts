import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSlides, ModalController } from '@ionic/angular';
import { SharedService } from '../services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SearchPage } from '../search/search.page';
import { DataService } from '../services/data.service';

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

  userId:any;
  isModalOpen:boolean = true;
  getProductSub$!: Subscription;
  getBannerSub$!: Subscription;
  getCategoriesSub$!: Subscription;
  constructor(private router:Router,
              private shared:SharedService,
              private storage: DataService,
              private modalController: ModalController
  ) {}

  ionViewDidEnter(){
    this.getUserId();
    this.getAllProducts();
  }

  async getUserId(){
    this.userId = await this.storage.get("userId");
    console.log(this.userId);
    
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

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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
    if(this.userId == null){
      this.router.navigate(['']);
      return;
    }
    this.router.navigate(['details',ev.productId]);
   
  }
}
