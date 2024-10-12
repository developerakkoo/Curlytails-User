import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicSlides, LoadingController } from '@ionic/angular';
import { SharedService } from '../services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  swiperModules = [IonicSlides];

  productId:any;
  images:any[] = [];
  quantities:any[] = [];
  product:any = {};
  selectedType:any;
  selectedProductPrice:any;
  selectedProductDiscountedPrice:any;

  selectedProductQuantity:any;
  isProductAddedInCart: boolean = true;
  constructor(private route:ActivatedRoute,
              private shared:SharedService,
              private router:Router,
              private loadingController: LoadingController) {
    this.productId = this.route.snapshot.paramMap.get("id");
    console.log(this.productId);
    
   }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getProductDetails();
    this.getCart();
  }

  async getProductDetails(){
    this.shared.getProductById(this.productId)
    .subscribe({
      next:(value:any) =>{
        console.log(value['data']);
        this.product = value['data'];
        this.images = value['data']['images'];
        this.quantities = value['data']['quantities'];
        this.selectedType = value['data']['quantities'][0];
        this.selectedProductPrice = value['data']['quantities'][0]['price'];
        this.selectedProductDiscountedPrice = value['data']['quantities'][0]['discountedPrice'];
      },
      error:(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }
  typeSelectEvent(ev:any){
    console.log(ev.detail.value);
    this.selectedType = ev.detail.value;
    this.selectedProductPrice = ev.detail.value.price;
    this.selectedProductDiscountedPrice = ev.detail.value.discountedPrice;
  }
  incrementQuantity() {
    // let obj = {
    //   size:this.size,
    //   id:this._id
    // }
    // this.addEvent.emit(obj);
    console.log(this.selectedType['size']);
    
    this.shared.addToCart(this.productId, 1,this.selectedType['size'])
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.getCart();

      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })

  }

  decrementQuantity() {
    this.shared.removeFromCart(this.productId,this.selectedType['size'])
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.getCart();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

  getCartItemQuantity(cart:any, productId:any) {
    const item = cart.cartItems.find((cartItem:any) => cartItem.productId._id === productId);
    return item ? item.quantity : null; // Returns quantity if found, otherwise null
}
  getCart(){
    this.shared.getCart()
    .subscribe({
      next:async(value:any) =>{
      console.log(value);
      // this.cart = value['data']['cartItems'];
      // this.subTotal = value['data']['SubTotal'];
      this.selectedProductQuantity = this.getCartItemQuantity(value['data'],this.productId);
        if(this.selectedProductQuantity <= 0){
          console.log("Quantity is less than equal to zero");
          this.isProductAddedInCart = false;
          
        }else if(this.selectedProductQuantity > 0){
          console.log("Quantity is greater than 0");
          this.isProductAddedInCart = true;
        }

      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

  viewCart(){
    this.router.navigate(['tabs','tabnav','explore']);
  }


  addToCart(ev:any){
 this.shared.addToCart(ev.productId, 1,ev.type.size)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }
}
