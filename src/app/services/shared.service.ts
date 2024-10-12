import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  accessToken: BehaviorSubject<string> = new BehaviorSubject("");
  userId: BehaviorSubject<string> = new BehaviorSubject("");
  constructor(private http:HttpClient,
              private storage: DataService
  ) { 
    this.init();
  }
  async init(){
    let token = await this.storage.get("accessToken");
    let userId = await this.storage.get("userId");

    this.accessToken.next(token);
    this.userId.next(userId);
  }
  login(body:any){
    return this.http.post(environment.URL + `user/login`,body)
  }

  addAddress(body:{}){
    return this.http.post(environment.URL + `user/address/add`,{
      userId: this.userId.value,
      ...body
    });
  }

  getUserAddress(){
    return this.http.get(environment.URL + `user/address/getAll/${this.userId.value}`);
  }
  getProfile(){
    return this.http.get(environment.URL + `user/get/${this.userId.value}`);
  }
  getCart(){
    return this.http.get(environment.URL + `cart/get/${this.userId.value}`);
  }

  addToCart(productId:any, quantity:any, size:any){
    return this.http.post(environment.URL + `cart/add`,{
      userId:this.userId.value,
      productId,
      quantity,
      size
    })

  }

  removeFromCart(productId:any, size:any){
    return this.http.post(environment.URL + `cart/remove`,{
      userId:this.userId.value,
      productId,
      size
    })

  }

  clearCart(){
    return this.http.post(environment.URL + `cart/clear/${this.userId.value}`,{});
  }



  addRefundRequest(description:string){
    return this.http.put(environment.URL + `order/cancel/${this.userId.value}`,{description: description});
  }
  initiatePayment(body:{}){
    return this.http.post(environment.URL + `order/initiate/payment`,body);
  }

  placeOrder(body:{}){
    return this.http.post(environment.URL + `order/place`,body)
  }

  updateOrder(orderId:any, status:any){
    return this.http.put(environment.URL + `order/update`, {orderId, status});
  }

  getOrders(){
    return this.http.get(environment.URL + `order/get-userId/${this.userId.value}?populate=1`);
  }


  getOrderById(orderId:any){
    return this.http.get(environment.URL + `order/get/${orderId}`);
  }

  getPriceDetails(body:{}){
    return this.http.post(environment.URL + `order/calculate/amount-to-pay`,body);
  }
  getAllProducts(){
    return this.http.get(environment.URL + `product/search/${this.userId.value}`);
  }

  getProductById(productId:any){
    return this.http.get(environment.URL + `product/get/${productId}`);
  }

  getAllBanner(){
    return this.http.get(environment.URL + `banner/getAll`);
  }

  getAllPetsCategory(){
    return this.http.get(environment.URL + `category/getAll`);
  }

  getAllFavorite(){
    return this.http.get(environment.URL + `favorite/getAll?userId=${this.userId.value}`);
  }

  allSearch(value:any){
    
  }

  like(productId:any){
    return this.http.post(environment.URL + `favorite/add`,{
     userId: this.userId.value,
      productId
    })
  }

  unLike(productId:any){
    return this.http.post(environment.URL + `favorite/remove`,{
     userId: this.userId.value,
      productId
    })
  }
}
