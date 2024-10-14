import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddressPage } from '../address/address.page';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import confetti from 'canvas-confetti';

declare var Razorpay: any;
@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  userId:any;
  cart:any[] = [];
  isLoading:boolean = false;
  subTotal:any;
  address:any = "No Address";

  currentDate =  new Date();

  threeDaysAfterDay:any;

  subtotal: number = 0;
  total:number = 0;
  deliveryCharges: number = 50;
  pricingDetails:any = {};
  gstCharges: number = 100;

  promoCode:string = "";


  constructor(private router:Router,
              private shared: SharedService,
              private data: DataService,
              private modalController: ModalController,
              private toastController: ToastController
  ) { }

  ngOnInit() {
    this.currentDate.setDate(this.currentDate.getDate() + 3);
    this.ShowDateAfterThreeDays();
  }

  ionViewDidEnter(){
    this.getCart()
    this.getUserSetAddress();
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your Offers is applied!.',
      duration: 2000,
      mode:'ios',
      animated:true,
      color:'primary'
    });
    toast.present();
  }


  ShowDateAfterThreeDays(){
    let day = this.currentDate.getDate();
    let month = this.currentDate.toLocaleString('default', {month:'long'});
    let year = this.currentDate.getFullYear();


    this.getOrdinalSuffix(day);
       // Format the date
let formattedDate = `${day}${this.getOrdinalSuffix(day)} ${month}, ${year}`;

console.log(formattedDate); // Output: "1st September, 2024"

this.threeDaysAfterDay = formattedDate;
  }
  getOrdinalSuffix(day:any) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }

 
}
  async getUserSetAddress(){
    console.log("Address Default Event!");
    
    this.address = await  this.data.get("address");
    this.userId = await this.data.get("userId");
    console.log(this.address);
    console.log(this.userId);
    
    
  }
  getCart(){
    this.shared.getCart()
    .subscribe({
      next:async(value:any) =>{
      console.log(value);
      this.cart = value['data']['cartItems'];
      this.subTotal = value['data']['SubTotal'];

      this.calculateAmountToPay();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

  clearCart(){
this.shared.clearCart()
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

  addToCart(ev:any){
    console.log(ev);
    this.shared.addToCart(ev.id, 1,ev.size)
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

  removeFromCart(ev:any){
    console.log(ev);
    this.shared.removeFromCart(ev.id,ev.size)
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

  calculateAmountToPay(){
    let obj = {
      userId:this.userId,
      code:this.promoCode
    }

    console.log(obj);
    this.shared.getPriceDetails(obj)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.pricingDetails = value['data'];
        this.total = value['data']['totalAmountToPay'];
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

  placeOrder(paymentId:any){
    // userId, addressId, phoneNumber, priceDetails, paymentId
    let obj = {
      addressId:this.address['_id'],
      paymentId,
      userId: this.userId,
      phoneNumber:"1234567890",
      priceDetails:this.pricingDetails

    }

    console.log(obj);

    this.shared.placeOrder(obj)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        // this.launchConfetti();
        this.getCart();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
    
  }

  checkout() {

  
    // this.openModalAddress();
    let obj = {
      amount: this.total
    }


    this.shared.initiatePayment(obj).subscribe({
      next: async (value: any) => {
        console.log(value);
        let amount = value['data']['amount'];
        let orderID = value['data']['orderId'];
        this.razorpayCheckput(orderID,amount);
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error.error);
        
      },
    });
  }

  razorpayCheckput(orderId:any, amount:any){
   var options = {
      "key": "rzp_test_q92KbX0ZwFyaN0", // Enter the Key ID generated from the Dashboard
      "amount": amount , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Curlytails", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": (response:any) => {
        console.log("Payment Success");
        
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
           this.placeOrder(response.razorpay_payment_id);
      },
      // "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
      //     "name": "Gaurav Kumar", //your customer's name
      //     "email": "gaurav.kumar@example.com", 
      //     "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
      // },
      // "notes": {
      //     "address": "Razorpay Corporate Office"
      // },
      "theme": {
          "color": "#FF8A00"
      }
  };

  var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response:any){
  console.log("Payment Error");
  
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
});
rzp1.open();
  }
  goToHome(){
    this.router.navigate(['tabs','tabnav','home'])
  }

  async goToAddress() {
    const modal = await this.modalController.create({
    component: AddressPage,
    animated:true,
    backdropDismiss:true,
    handle:true,
    componentProps: { value: 123 }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data['data']['address'])
    this.address = data['data']['address'];
    this.getUserSetAddress();
  }

  launchConfetti() {
    const duration = 2 * 1000; // 2 seconds
    const end = Date.now() + duration;

    const colors = ['#a864fd', '	#29cdff', '#78ff44', '#ff718d','#fdff6a'];

    this.presentToast();
    
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 45,
        spread: 35,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 35,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
 
}
